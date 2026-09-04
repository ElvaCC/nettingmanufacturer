/**
 * 一键诊断 GitHub Token 是否有效（admin 保存报错时先用它自查）
 *
 * 用法：
 *   node scripts/check-gh-token.js
 *   node scripts/check-gh-token.js ghp_你的新token
 */
const TOKEN = process.argv[2] || process.env.GITHUB_TOKEN;
const REPO = 'ElvaCC/nettingmanufacturer';

if (!TOKEN) {
  console.log('❌ 没有找到 token。请运行: node scripts/check-gh-token.js ghp_你的token');
  process.exit(1);
}

const masked = TOKEN.slice(0, 7) + '...' + TOKEN.slice(-4);
console.log(`▶ 检查 token: ${masked}`);

const check = async (url, extra = {}) => {
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      Accept: 'application/vnd.github.v3+json',
      'User-Agent': 'jiacheng-diag',
      ...extra,
    },
  });
  return res;
};

(async () => {
  try {
    // 1. 基础认证检查（token 是否有效 + 是谁）
    const who = await check('https://api.github.com/user');
    if (who.status === 401) {
      console.log('❌ 结果: HTTP 401 Bad credentials — token 已失效或被撤销');
      console.log('   → 解决: 去 https://github.com/settings/tokens?type=beta 生成新 token，');
      console.log('     有效期务必选最长(1 year)，Contents 权限选 Read and write。');
      console.log('   → 然后: 更新 Vercel 环境变量 GITHUB_TOKEN 并 Redeploy。');
      process.exit(1);
    }
    if (who.status === 403) {
      console.log('❌ 结果: HTTP 403 — token 可能被限流或权限不足');
      const body = await who.json();
      console.log('   ', body.message || '');
      process.exit(1);
    }
    const user = await who.json();
    console.log(`✅ Token 有效, 属于: ${user.login} (${user.name || ''})`);

    // 2. 检查 repo 访问 + Contents 写权限
    const repo = await check(`https://api.github.com/repos/${REPO}`);
    if (repo.status === 200) {
      const rd = await repo.json();
      console.log(`✅ 可访问仓库: ${rd.full_name} (${rd.private ? '私有' : '公开'})`);
      const perms = rd.permissions || {};
      console.log(
        `   push权限: ${perms.push ? '✅ 有' : '❌ 无'} | admin: ${perms.admin ? '✅' : '❌'}`
      );
      if (!perms.push) {
        console.log('   ⚠️ 注意: 该 token 没有仓库写权限，admin 保存仍会失败！');
        console.log('   → 解决: fine-grained token 需勾选 Contents: Read and write');
      }
    } else {
      console.log(`⚠️ 无法访问仓库 ${REPO} (HTTP ${repo.status}) — token 可能没有勾选该仓库`);
    }

    // 3. 测试实际读取 content.json 的 SHA（保存前置步骤）
    const shaRes = await check(
      `https://api.github.com/repos/${REPO}/contents/src/data/content.json?ref=main`
    );
    if (shaRes.ok) {
      const d = await shaRes.json();
      console.log(`✅ content.json 可读, SHA: ${d.sha.slice(0, 8)}...`);
      console.log('\n🎉 一切正常，admin 保存可以工作。');
    } else if (shaRes.status === 404) {
      console.log('⚠️ content.json 在 main 分支未找到 (HTTP 404)');
    } else {
      console.log(`⚠️ 读取 content.json 失败 (HTTP ${shaRes.status})`);
    }
  } catch (err) {
    console.log('❌ 网络错误:', err.message);
    console.log('   → 如果在本机运行，可能需要代理: export HTTPS_PROXY=http://127.0.0.1:7890');
  }
})();
