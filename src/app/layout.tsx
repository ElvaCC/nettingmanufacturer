import "./globals.css";

export function generateStaticParams() {
  return [{ locale: "en" }];
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
