import "../globals.css";

// /admin sits outside the [locale] tree, so it needs its own root layout.
// The locale layout can no longer act as a shared root: <html lang/dir> must be
// derived from the route segment, and reading it from headers() would force the
// entire site into dynamic rendering.
export const metadata = {
  title: "Content Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr">
      <body className="min-h-screen bg-background">{children}</body>
    </html>
  );
}
