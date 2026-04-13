import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export function generateStaticParams() {
  return [{ locale: "en" }];
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
