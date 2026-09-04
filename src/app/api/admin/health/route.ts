import { NextResponse } from 'next/server';
import { getGithubToken } from '@/lib/github-store';

/**
 * GET  /api/admin/health — 检查 GitHub 凭据配置状态（不验证有效性）
 * POST /api/admin/health — 实际调用 GitHub API 验证凭据是否可用
 */
export async function GET() {
  const mode =
    process.env.GH_APP_ID && process.env.GH_APP_PRIVATE_KEY && process.env.GH_INSTALLATION_ID
      ? 'github-app'
      : process.env.GITHUB_TOKEN
      ? 'token'
      : 'none';
  return NextResponse.json({ mode });
}

export async function POST() {
  try {
    const token = await getGithubToken();
    if (!token) {
      return NextResponse.json({
        ok: false,
        message: '未配置 GitHub 凭据：请到 Vercel → Settings → Environment Variables 设置 GITHUB_TOKEN 或 GitHub App 三件套，然后 Redeploy',
      });
    }

    // 1. Token 是否有效
    const who = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'User-Agent': 'jiacheng-health',
      },
      cache: 'no-store',
    });
    if (who.status === 401) {
      return NextResponse.json({
        ok: false,
        message: 'GitHub Token 已失效（401）。请到 https://github.com/settings/tokens?type=beta 生成新 token（有效期选 1 year），更新 Vercel 环境变量 GITHUB_TOKEN 并 Redeploy',
      });
    }
    if (who.status === 403) {
      return NextResponse.json({ ok: false, message: 'GitHub Token 被限流或权限不足（403），稍后重试或检查 token 权限' });
    }
    const user = await who.json();

    // 2. 仓库写权限
    const repo = await fetch('https://api.github.com/repos/ElvaCC/nettingmanufacturer', {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'User-Agent': 'jiacheng-health',
      },
      cache: 'no-store',
    });
    if (repo.ok) {
      const rd = await repo.json();
      if (!rd.permissions?.push) {
        return NextResponse.json({
          ok: false,
          message: `Token 有效（${user.login}）但缺少仓库写权限，请确认 token 勾选了 Contents: Read and write`,
        });
      }
      return NextResponse.json({
        ok: true,
        message: `GitHub 凭据正常（${user.login}），保存功能可用`,
      });
    }
    return NextResponse.json({
      ok: false,
      message: `Token 有效但无法访问仓库 (HTTP ${repo.status})，请确认 token 勾选了 nettingmanufacturer 仓库`,
    });
  } catch (err) {
    return NextResponse.json({ ok: false, message: '检查失败: ' + String(err) });
  }
}
