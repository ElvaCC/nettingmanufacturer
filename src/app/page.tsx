import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Netting Manufacturer | HDPE Netting Solutions for Global Markets",
  description: "Leading manufacturer of industrial HDPE netting solutions including construction mesh, dust cover nets, shade nets, and more. Factory direct with global shipping.",
  keywords: "HDPE netting, construction mesh, dust cover nets, shade nets, hail protection, olive nets, bird nets, manufacturer, factory",
  authors: [{ name: "Netting Manufacturer" }],
  openGraph: {
    title: "Netting Manufacturer | Premium HDPE Netting Solutions",
    description: "Industrial-grade HDPE netting for construction, agriculture, and commercial applications. Trusted by partners worldwide.",
    url: "https://www.nettingmanufacturer.com",
    siteName: "Netting Manufacturer",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Netting Manufacturer | HDPE Netting Solutions",
    description: "Premium industrial HDPE netting solutions for global markets.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootPage() {
  return null;
}
