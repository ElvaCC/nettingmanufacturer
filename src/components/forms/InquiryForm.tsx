"use client";

import { useState } from "react";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export default function InquiryForm({
  locale,
  productName,
}: {
  locale: string;
  productName?: string;
}) {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    product: productName || "",
    message: "",
    website: "", // honeypot, must remain empty
  });
  const [emailConfirmed, setEmailConfirmed] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.product.trim()) newErrors.product = "Please enter the product you are interested in";
    if (!formData.message.trim()) newErrors.message = "Please describe your requirements";
    if (!emailConfirmed) newErrors.emailConfirm = "Please confirm your email address before submitting";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");
    if (!validate()) return;

    setStatus("loading");

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          phone: formData.phone,
          product: formData.product,
          message: formData.message,
          website: formData.website,
        }),
      });

      const data = await res.json().catch(() => null);
      if (res.ok && data && data.success) {
        setSubmittedEmail(formData.email);
        setStatus("success");
        setFormData({
          name: "",
          company: "",
          email: "",
          phone: "",
          product: productName || "",
          message: "",
          website: "",
        });
        setEmailConfirmed(false);
      } else {
        setStatus("error");
        setServerError(
          data && data.error
            ? data.error
            : "Something went wrong. Please try again or contact us by email."
        );
      }
    } catch {
      setStatus("error");
      setServerError("Network error. Please try again or contact us by email.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-12" role="alert" aria-live="polite">
        <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-green-600" aria-hidden="true" />
        </div>
        <h3 className="text-xl font-bold text-text-primary mb-2">Thank You!</h3>
        <p className="text-text-secondary mb-4">
          Your inquiry has been submitted successfully. Our team will contact you within 24 hours.
        </p>
        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg text-left">
          <p className="text-sm text-amber-800 leading-relaxed">
            <strong>Please double-check your email address:</strong>{" "}
            <span className="break-all">{submittedEmail}</span>
            <br />
            We will reply to this address. If it is incorrect, we will not be able to reach you — please refresh this page and submit again with the right email.
          </p>
        </div>
        <button
          onClick={() => setStatus("idle")}
          className="text-primary font-medium hover:underline"
        >
          Submit another inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate aria-label="Product inquiry form">
      {/* Honeypot field (hidden from humans, catches bots) */}
      <input
        type="text"
        name="website"
        value={formData.website}
        onChange={handleChange}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, width: 0 }}
      />

      {/* Contact Information */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-1">
            Full Name <span className="text-red-500" aria-label="required">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border ${errors.name ? "border-red-500" : "border-gray-200"} focus:ring-2 focus:ring-primary focus:border-primary transition-colors`}
            placeholder="John Smith"
            aria-required="true"
            aria-invalid={!!errors.name}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="company" className="block text-sm font-medium text-text-primary mb-1">
            Company Name
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
            placeholder="ABC Construction Ltd."
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-1">
            Email Address <span className="text-red-500" aria-label="required">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border ${errors.email ? "border-red-500" : "border-gray-200"} focus:ring-2 focus:ring-primary focus:border-primary transition-colors`}
            placeholder="john@example.com"
            aria-required="true"
            aria-invalid={!!errors.email}
          />
          <p className="text-xs text-text-secondary mt-1">
            We will reply to this address — please double-check it.
          </p>
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-text-primary mb-1">
            Phone Number <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
            placeholder="+1 234 567 8900"
          />
        </div>
      </div>

      {/* Product Interest — free text */}
      <div>
        <label htmlFor="product" className="block text-sm font-medium text-text-primary mb-1">
          Product Interest <span className="text-red-500" aria-label="required">*</span>
        </label>
        <input
          type="text"
          id="product"
          name="product"
          value={formData.product}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-lg border ${errors.product ? "border-red-500" : "border-gray-200"} focus:ring-2 focus:ring-primary focus:border-primary transition-colors`}
          placeholder="e.g. Debris Netting, Shade Net, Olive Net..."
          aria-required="true"
          aria-invalid={!!errors.product}
        />
        {errors.product && <p className="text-red-500 text-xs mt-1">{errors.product}</p>}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-text-primary mb-1">
          Your Requirements <span className="text-red-500" aria-label="required">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className={`w-full px-4 py-3 rounded-lg border ${errors.message ? "border-red-500" : "border-gray-200"} focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-none`}
          placeholder="Please describe your requirements: product specifications, delivery timeline, destination port, special needs..."
          aria-required="true"
          aria-invalid={!!errors.message}
        />
        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
      </div>

      {/* Email confirmation */}
      <div>
        <label
          htmlFor="emailConfirm"
          className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${errors.emailConfirm ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50"}`}
        >
          <input
            type="checkbox"
            id="emailConfirm"
            name="emailConfirm"
            checked={emailConfirmed}
            onChange={(e) => {
              setEmailConfirmed(e.target.checked);
              if (errors.emailConfirm) setErrors((prev) => ({ ...prev, emailConfirm: "" }));
            }}
            className="mt-0.5 w-4 h-4 shrink-0 accent-[#0B4C8E]"
            aria-invalid={!!errors.emailConfirm}
          />
          <span className="text-sm text-text-primary leading-relaxed">
            I confirm my email address is correct, so you can reach me.
          </span>
        </label>
        {errors.emailConfirm && <p className="text-red-500 text-xs mt-1">{errors.emailConfirm}</p>}
      </div>

      {status === "error" && (
        <div className="flex items-start gap-2 p-4 bg-red-50 text-red-700 rounded-lg" role="alert">
          <AlertCircle size={20} className="shrink-0 mt-0.5" aria-hidden="true" />
          <p>{serverError}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full py-4 bg-accent text-white font-semibold rounded-xl hover:bg-accent-hover transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "loading" ? (
          <>
            <Loader2 size={20} className="animate-spin" aria-hidden="true" />
            <span>Submitting...</span>
          </>
        ) : (
          <>
            <Send size={20} aria-hidden="true" />
            <span>Submit Inquiry</span>
          </>
        )}
      </button>

      <p className="text-xs text-text-secondary text-center">
        By submitting this form, you agree to our privacy policy. We will never spam you.
      </p>
    </form>
  );
}
