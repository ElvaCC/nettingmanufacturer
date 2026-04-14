"use client";

import { useState } from "react";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

const productOptions = [
  "Dust Cover Nets",
  "Shade Nets",
  "Hail Protection Nets",
  "Olive Collection Nets",
  "Bird Protection Nets",
  "Construction Safety Mesh",
  "Other",
];

const quantityUnits = ["sqm", "pcs", "kg", "tons"];

export default function InquiryForm({ locale }: { locale: string }) {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    country: "",
    product: "",
    quantity: "",
    unit: "sqm",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.product) newErrors.product = "Please select a product";
    if (!formData.quantity) newErrors.quantity = "Quantity is required";
    if (!formData.message.trim()) newErrors.message = "Please describe your requirements";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    
    // Simulate form submission (replace with actual API call)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus("success");
      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        country: "",
        product: "",
        quantity: "",
        unit: "sqm",
        message: "",
      });
    } catch {
      setStatus("error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
        <p className="text-text-secondary mb-6">
          Your inquiry has been submitted successfully. Our team will contact you within 24 hours.
        </p>
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
      {/* HowTo Schema for form completion */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "How to Request a Quote for HDPE Netting Products",
            "description": "Complete the form below to request a custom quote for HDPE netting products from our factory.",
            "step": [
              {
                "@type": "HowToStep",
                "name": "Fill in your contact information",
                "text": "Enter your name, company name, email, and phone number."
              },
              {
                "@type": "HowToStep",
                "name": "Select product and quantity",
                "text": "Choose the HDPE netting product type and specify your required quantity."
              },
              {
                "@type": "HowToStep",
                "name": "Describe your requirements",
                "text": "Provide details about specifications, delivery timeline, and any special requirements."
              },
              {
                "@type": "HowToStep",
                "name": "Submit your inquiry",
                "text": "Click the submit button to send your inquiry to our sales team."
              }
            ]
          })
        }}
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
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-text-primary mb-1">
            Phone Number
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

      <div>
        <label htmlFor="country" className="block text-sm font-medium text-text-primary mb-1">
          Country / Region
        </label>
        <input
          type="text"
          id="country"
          name="country"
          value={formData.country}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
          placeholder="United States"
        />
      </div>

      {/* Product Selection */}
      <div>
        <label htmlFor="product" className="block text-sm font-medium text-text-primary mb-1">
          Product Interest <span className="text-red-500" aria-label="required">*</span>
        </label>
        <select
          id="product"
          name="product"
          value={formData.product}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-lg border ${errors.product ? "border-red-500" : "border-gray-200"} focus:ring-2 focus:ring-primary focus:border-primary transition-colors bg-white`}
          aria-required="true"
          aria-invalid={!!errors.product}
        >
          <option value="">Select a product type</option>
          {productOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        {errors.product && <p className="text-red-500 text-xs mt-1">{errors.product}</p>}
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-text-primary mb-1">
            Quantity <span className="text-red-500" aria-label="required">*</span>
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            min="1"
            className={`w-full px-4 py-3 rounded-lg border ${errors.quantity ? "border-red-500" : "border-gray-200"} focus:ring-2 focus:ring-primary focus:border-primary transition-colors`}
            placeholder="500"
            aria-required="true"
            aria-invalid={!!errors.quantity}
          />
          {errors.quantity && <p className="text-red-500 text-xs mt-1">{errors.quantity}</p>}
        </div>
        
        <div>
          <label htmlFor="unit" className="block text-sm font-medium text-text-primary mb-1">
            Unit
          </label>
          <select
            id="unit"
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-colors bg-white"
          >
            {quantityUnits.map((unit) => (
              <option key={unit} value={unit}>{unit.toUpperCase()}</option>
            ))}
          </select>
        </div>
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

      {status === "error" && (
        <div className="flex items-center gap-2 p-4 bg-red-50 text-red-700 rounded-lg" role="alert">
          <AlertCircle size={20} aria-hidden="true" />
          <p>Something went wrong. Please try again.</p>
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
