import { Metadata } from "next";
import Image from "next/image";
import InquiryForm from "@/components/forms/InquiryForm";
import { Mail, Phone, MessageCircle, MapPin, Clock } from "lucide-react";
import { unstable_setRequestLocale } from "next-intl/server";

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "info@nettingmanufacturer.com",
    href: "mailto:info@nettingmanufacturer.com",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+86 XXX XXXX XXXX",
    href: "tel:+86XXXXXXXXXX",
  },
  {
    icon: MessageCircle,
    title: "WeChat",
    value: "netting_mfr",
    href: "https://wa.me/86XXXXXXXXXX",
  },
  {
    icon: MapPin,
    title: "Address",
    value: "Shijiazhuang, Hebei, China",
    href: "#",
  },
  {
    icon: Clock,
    title: "Working Hours",
    value: "Mon-Fri: 9:00-18:00 (GMT+8)",
    href: "#",
  },
];

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Enable static rendering
  unstable_setRequestLocale(locale);

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary to-primary-light text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-white/80">
              Ready to discuss your project? Our team is here to help.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left - Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-text-primary mb-8">
                Get In Touch
              </h2>
              <div className="space-y-6 mb-12">
                {contactInfo.map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-text-primary mb-1">{item.title}</h3>
                      <p className="text-text-secondary">{item.value}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* WeChat QR Code Placeholder */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold text-text-primary mb-4">Scan to Add WeChat</h3>
                <div className="bg-gray-100 rounded-lg w-48 h-48 flex items-center justify-center mx-auto">
                  <div className="text-center text-text-secondary">
                    <MessageCircle className="w-12 h-12 mx-auto mb-2" />
                    <p className="text-sm">WeChat QR Code</p>
                    <p className="text-xs mt-1">ID: netting_mfr</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Form */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-text-primary mb-2">
                Send Us a Message
              </h2>
              <p className="text-text-secondary mb-8">
                Fill out the form below and our team will respond within 24 hours.
              </p>
              <InquiryForm locale={locale} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
