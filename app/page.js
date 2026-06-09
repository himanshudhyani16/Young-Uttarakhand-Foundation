"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import SignaturePad from "./components/SignaturePad";

export default function RegistrationPage() {
  const [formData, setFormData] = useState({
    membershipType: "family",
    fullName: "",
    fullAddress: "",
    phoneNumber: "",
    email: "",
    maritalStatus: "",
    spouseName: "",
    spousePhone: "",
    spouseEmail: "",
    children: [""],
  });

  const [submitted, setSubmitted] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleChildChange = useCallback((index, value) => {
    setFormData((prev) => {
      const newChildren = [...prev.children];
      newChildren[index] = value;
      return { ...prev, children: newChildren };
    });
  }, []);

  const addChild = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      children: [...prev.children, ""],
    }));
  }, []);

  const removeChild = useCallback((index) => {
    setFormData((prev) => ({
      ...prev,
      children: prev.children.filter((_, i) => i !== index),
    }));
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      console.log("Form submitted:", formData);
      setSubmitted(true);
    },
    [formData]
  );

  const isFamily = formData.membershipType === "family";

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-[#FEF3E2] to-cream bg-[length:400%_400%] animate-gradient relative">
      {/* Decorative radial backgrounds */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(212,168,67,0.06)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(196,30,58,0.04)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_80%,rgba(255,107,0,0.04)_0%,transparent_50%)]" />
      </div>

      <div className="max-w-[860px] mx-auto px-6 py-8 relative z-10">
        {/* ===== Hero Section ===== */}
        <section className="relative rounded-3xl overflow-hidden mb-8 shadow-[0_20px_60px_rgba(26,26,46,0.15),0_8px_20px_rgba(26,26,46,0.1)] animate-fade-in-up group">
          <div className="relative w-full h-[420px] max-sm:h-[240px] max-md:h-[300px] overflow-hidden">
            <Image
              src="/hero-bg.png"
              alt="Kedarnath Temple in the Himalayas with traditional deity procession"
              fill
              priority
              className="object-cover object-[center_30%] transition-transform duration-[8s] ease-out group-hover:scale-[1.03]"
              sizes="(max-width: 860px) 100vw, 860px"
            />
            {/* Gradient overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-t from-charcoal/85 via-charcoal/40 to-transparent z-[1]" />
          </div>

          <div className="absolute bottom-0 left-0 right-0 z-[2] px-8 pb-6 pt-12 text-center max-sm:px-4 max-sm:pb-4">
            {/* Banner Ribbon */}
            <div className="inline-block relative px-10 py-2.5 mb-4 animate-slide-down max-sm:px-5">
              <div className="absolute inset-0 bg-gradient-to-br from-crimson to-crimson-dark rounded-md -skew-x-3 shadow-[0_4px_15px_rgba(196,30,58,0.4)]" />
              <span className="relative font-[family-name:var(--font-heading)] text-[1.1rem] max-sm:text-[0.75rem] max-md:text-[0.85rem] font-bold text-[#FFD700] tracking-[3px] max-sm:tracking-[1.5px] uppercase drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)]">
                Rangela Garhwal &nbsp;&bull;&nbsp; Chabila Kumaon
              </span>
            </div>

            <h1 className="font-[family-name:var(--font-heading)] text-[2.4rem] max-sm:text-[1.3rem] max-md:text-[1.6rem] font-extrabold text-white tracking-[2px] drop-shadow-[0_3px_15px_rgba(0,0,0,0.5)] mb-2 animate-fade-in-up-delay-2">
              Young Uttarakhand Foundation
            </h1>
            <p className="font-[family-name:var(--font-accent)] italic text-[1.15rem] max-sm:text-[0.95rem] text-white/90 tracking-wide drop-shadow-[0_1px_5px_rgba(0,0,0,0.3)] animate-fade-in-up-delay-3">
              &ldquo;Rooted in culture, united in progress.&rdquo;
            </p>
          </div>
        </section>

        {/* ===== Form Card ===== */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/[0.72] backdrop-blur-[20px] rounded-3xl border border-white/60 shadow-[0_12px_40px_rgba(26,26,46,0.08),0_4px_12px_rgba(26,26,46,0.08),inset_0_1px_0_rgba(255,255,255,0.8)] overflow-hidden animate-fade-in-up"
          style={{ animationDelay: "0.3s" }}
        >
          {/* ---- Title Bar ---- */}
          <div className="flex items-center justify-between flex-wrap gap-4 px-8 py-5 bg-gradient-to-br from-cream/90 to-[#FFF0DB]/90 border-b border-border-custom max-md:flex-col max-md:items-start max-sm:px-4">
            <div className="inline-flex items-center gap-2 px-7 py-2.5 bg-gradient-to-br from-crimson to-crimson-dark rounded-full shadow-[0_4px_15px_rgba(196,30,58,0.3)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(196,30,58,0.4)] transition-all duration-250">
              <span className="text-lg">📋</span>
              <span className="font-[family-name:var(--font-heading)] text-[0.85rem] font-bold text-white tracking-[2px] uppercase">
                Registration Form
              </span>
            </div>

            <div className="flex items-center gap-4 max-md:flex-col max-md:items-start max-md:gap-2">
              <span className="font-[family-name:var(--font-heading)] text-xs font-semibold text-text-secondary tracking-wider uppercase">
                Annual Fee
              </span>
              <div className="flex gap-2">
                {[
                  { icon: "👨‍👩‍👧‍👦", type: "Family", amount: "$40" },
                  { icon: "👤", type: "Individual", amount: "$20" },
                ].map((fee) => (
                  <div
                    key={fee.type}
                    className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-br from-gold/10 to-gold/5 border border-gold/30 rounded-[10px] hover:from-gold/20 hover:to-gold/10 hover:border-gold hover:-translate-y-px transition-all duration-250"
                  >
                    <span className="text-base">{fee.icon}</span>
                    <div>
                      <div className="text-[0.75rem] font-medium text-text-muted uppercase tracking-wide">
                        {fee.type}
                      </div>
                      <div className="font-[family-name:var(--font-heading)] text-base font-bold text-dark-green">
                        {fee.amount}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ---- Membership Toggle ---- */}
          <div className="flex items-center gap-4 px-8 py-4 flex-wrap max-sm:px-4">
            <span className="text-xs font-semibold text-text-secondary tracking-wider uppercase">
              Membership Type
            </span>
            <div className="flex bg-black/[0.04] rounded-full p-1 border border-border-custom max-md:w-full">
              {[
                { value: "family", icon: "👨‍👩‍👧‍👦", label: "Family – $40" },
                { value: "individual", icon: "👤", label: "Individual – $20" },
              ].map((opt) => (
                <label key={opt.value} className="relative max-md:flex-1">
                  <input
                    type="radio"
                    name="membershipType"
                    value={opt.value}
                    checked={formData.membershipType === opt.value}
                    onChange={handleChange}
                    className="absolute opacity-0 w-0 h-0 peer"
                  />
                  <div className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-full cursor-pointer text-sm font-semibold text-text-muted transition-all duration-250 hover:text-text-secondary peer-checked:bg-white peer-checked:text-saffron-dark peer-checked:shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
                    <span className="text-lg">{opt.icon}</span>
                    {opt.label}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* ---- Section Header: Personal Info ---- */}
          <SectionHeader icon="👤" title="Personal Information" />

          {/* ---- Form Fields ---- */}
          <div className="px-8 pb-8 max-sm:px-4 max-sm:pb-4">
            <div className="grid gap-5">
              {/* Full Name */}
              <InputField
                id="fullName"
                name="fullName"
                label="Full Name"
                icon="👤"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />

              {/* Full Address */}
              <div className="flex flex-col gap-1.5 group/input">
                <label
                  htmlFor="fullAddress"
                  className="text-xs font-semibold text-text-secondary tracking-wider uppercase transition-colors duration-150 group-focus-within/input:text-saffron-dark"
                >
                  Full Address
                </label>
                <div className="relative flex items-start">
                  <span className="absolute left-3.5 top-3.5 text-base text-text-muted transition-colors duration-250 group-focus-within/input:text-saffron pointer-events-none z-[1]">
                    📍
                  </span>
                  <textarea
                    id="fullAddress"
                    name="fullAddress"
                    value={formData.fullAddress}
                    onChange={handleChange}
                    placeholder="Enter your complete address"
                    rows="2"
                    required
                    className="w-full py-3.5 px-4 pl-11 font-[family-name:var(--font-body)] text-[0.95rem] text-text-primary bg-white/85 border-[1.5px] border-border-custom rounded-[10px] outline-none transition-all duration-250 resize-y min-h-[80px] placeholder:text-text-muted hover:border-gold-light focus:border-gold focus:bg-white focus:shadow-[0_0_0_4px_rgba(212,168,67,0.12),0_2px_8px_rgba(26,26,46,0.08)]"
                  />
                </div>
              </div>

              {/* Phone & Email Row */}
              <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
                <InputField
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  label="Phone Number"
                  icon="📞"
                  placeholder="(403) 000-0000"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
                <InputField
                  id="email"
                  name="email"
                  type="email"
                  label="Email"
                  icon="✉️"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Marital Status */}
              <div className="flex items-center gap-4 flex-wrap">
                <span className="text-xs font-semibold text-text-secondary tracking-wider uppercase mr-2">
                  Marital Status
                </span>
                {["Married", "Single"].map((status) => (
                  <label key={status} className="relative">
                    <input
                      type="radio"
                      name="maritalStatus"
                      value={status.toLowerCase()}
                      checked={formData.maritalStatus === status.toLowerCase()}
                      onChange={handleChange}
                      className="absolute opacity-0 w-0 h-0 peer"
                    />
                    <div className="flex items-center gap-2 px-5 py-2.5 bg-white/85 border-[1.5px] border-border-custom rounded-full cursor-pointer transition-all duration-250 text-[0.9rem] font-medium text-text-secondary select-none hover:border-gold-light hover:bg-white/95 hover:-translate-y-px peer-checked:border-saffron peer-checked:bg-gradient-to-br peer-checked:from-saffron/[0.08] peer-checked:to-gold/[0.08] peer-checked:text-saffron-dark peer-checked:shadow-[0_2px_10px_rgba(255,107,0,0.15)]">
                      {/* Radio dot */}
                      <span className="w-[18px] h-[18px] rounded-full border-2 border-border-custom flex items-center justify-center transition-all duration-250 peer-checked:border-saffron relative">
                        <span
                          className={`w-2 h-2 rounded-full bg-saffron transition-transform duration-500 ${
                            formData.maritalStatus === status.toLowerCase()
                              ? "scale-100"
                              : "scale-0"
                          }`}
                          style={{
                            transitionTimingFunction:
                              "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                          }}
                        />
                      </span>
                      {status}
                    </div>
                  </label>
                ))}
              </div>

              {/* Signature */}
              <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-text-secondary tracking-wider uppercase">
                    Signature
                  </label>
                  <SignaturePad onSignatureChange={setHasSignature} />
                </div>
              </div>
            </div>

            {/* ===== Spouse & Children (Family only) ===== */}
            {isFamily && (
              <>
                {/* Spouse Header */}
                <SectionHeader
                  icon="💑"
                  title="Spouse Information"
                  className="pt-6 pb-2 px-0"
                />

                <div className="mt-4 p-5 bg-cream/60 border border-dashed border-gold/30 rounded-2xl">
                  <div className="grid gap-5">
                    <InputField
                      id="spouseName"
                      name="spouseName"
                      label="Spouse Name"
                      icon="👤"
                      placeholder="Spouse's full name"
                      value={formData.spouseName}
                      onChange={handleChange}
                    />
                    <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
                      <InputField
                        id="spousePhone"
                        name="spousePhone"
                        type="tel"
                        label="Phone Number"
                        icon="📞"
                        placeholder="(403) 000-0000"
                        value={formData.spousePhone}
                        onChange={handleChange}
                      />
                      <InputField
                        id="spouseEmail"
                        name="spouseEmail"
                        type="email"
                        label="Email"
                        icon="✉️"
                        placeholder="spouse@example.com"
                        value={formData.spouseEmail}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                {/* Children Header */}
                <SectionHeader
                  icon="👧"
                  title="Children"
                  className="pt-6 pb-2 px-0"
                />

                <div className="mt-4 p-5 bg-cream/60 border border-dashed border-gold/30 rounded-2xl">
                  <div className="grid gap-4">
                    {formData.children.map((child, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-[1fr_auto] gap-2 items-end"
                      >
                        <InputField
                          id={`child-${index}`}
                          label={`Child ${index + 1}`}
                          icon="👶"
                          placeholder={`Child ${index + 1} name`}
                          value={child}
                          onChange={(e) =>
                            handleChildChange(index, e.target.value)
                          }
                        />
                        {formData.children.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeChild(index)}
                            aria-label={`Remove child ${index + 1}`}
                            className="flex items-center justify-center w-9 h-9 bg-transparent border-[1.5px] border-border-custom rounded-[10px] cursor-pointer text-lg text-text-muted transition-all duration-250 hover:border-crimson hover:text-crimson hover:bg-crimson/5"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addChild}
                      className="inline-flex items-center gap-1.5 px-4 py-2 mt-1 bg-transparent border-[1.5px] border-dashed border-border-custom rounded-[10px] text-sm font-medium text-text-muted cursor-pointer transition-all duration-250 hover:border-saffron hover:text-saffron hover:bg-saffron/[0.04] self-start"
                    >
                      <span>＋</span> Add another child
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* ---- Submit Button ---- */}
          <div className="px-8 pb-8 max-sm:px-4 max-sm:pb-4">
            <button
              type="submit"
              className="relative w-full py-[18px] px-8 font-[family-name:var(--font-heading)] text-base font-bold tracking-[2px] uppercase text-white bg-gradient-to-br from-saffron to-crimson bg-[length:200%_200%] border-none rounded-2xl cursor-pointer overflow-hidden transition-all duration-250 shadow-[0_4px_15px_rgba(196,30,58,0.3)] hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(196,30,58,0.4)] hover:bg-[position:100%_0] active:translate-y-0"
            >
              <span className="flex items-center justify-center gap-2 relative z-[1]">
                Submit Registration
                <span className="text-xl transition-transform duration-250 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </button>
          </div>

          {/* ---- Footer / Payment ---- */}
          <div className="bg-gradient-to-br from-dark-green to-forest-green rounded-b-3xl px-8 py-7 text-white max-sm:px-4">
            <div className="flex items-center gap-2 mb-5">
              <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-white/15 border border-white/20 rounded-full backdrop-blur-sm">
                <span>💳</span>
                <span className="font-[family-name:var(--font-heading)] text-[0.75rem] font-bold tracking-[2px] uppercase text-white/95">
                  Payment Information
                </span>
              </div>
            </div>

            <p className="text-[0.9rem] text-white/80 mb-5 leading-relaxed">
              Membership fees and donations can be paid by e-transfer to:
            </p>

            <div className="grid grid-cols-2 gap-3 mb-3 max-md:grid-cols-1">
              <a
                href="tel:403-400-5539"
                className="flex items-center gap-3 px-4 py-3 bg-white/[0.08] border border-white/10 rounded-[10px] transition-all duration-250 no-underline text-white hover:bg-white/15 hover:-translate-y-px"
              >
                <span className="text-xl">📞</span>
                <div>
                  <div className="text-[0.7rem] text-white/50 uppercase tracking-wider">
                    Phone
                  </div>
                  <div className="text-sm font-medium text-white/90">
                    403-400-5539
                  </div>
                </div>
              </a>
              <a
                href="mailto:uttarakhandsociety@gmail.com"
                className="flex items-center gap-3 px-4 py-3 bg-white/[0.08] border border-white/10 rounded-[10px] transition-all duration-250 no-underline text-white hover:bg-white/15 hover:-translate-y-px"
              >
                <span className="text-xl">✉️</span>
                <div>
                  <div className="text-[0.7rem] text-white/50 uppercase tracking-wider">
                    Email
                  </div>
                  <div className="text-sm font-medium text-white/90">
                    uttarakhandsociety@gmail.com
                  </div>
                </div>
              </a>
            </div>

            <div className="flex items-center gap-3 px-4 py-3 bg-white/[0.06] border border-white/[0.08] rounded-[10px]">
              <span className="text-xl">📍</span>
              <span className="text-sm text-white/80">
                Records Office: 6102-2255, 32 ST N.E. Calgary, AB T1Y 0C2
              </span>
              <span className="ml-auto px-3 py-1 bg-gold/20 border border-gold/30 rounded-md font-[family-name:var(--font-heading)] text-sm font-bold text-gold-light">
                #0117
              </span>
            </div>
          </div>
        </form>
      </div>

      {/* ===== Success Modal ===== */}
      {submitted && (
        <div
          className="fixed inset-0 bg-charcoal/50 backdrop-blur-[8px] z-[1000] flex items-center justify-center animate-fade-in"
          onClick={() => setSubmitted(false)}
        >
          <div
            className="bg-white rounded-3xl px-10 py-14 text-center max-w-[420px] w-[90%] shadow-[0_24px_80px_rgba(26,26,46,0.3)] animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-20 h-20 mx-auto mb-5 bg-gradient-to-br from-emerald-brand to-dark-green rounded-full flex items-center justify-center text-4xl text-white animate-checkmark">
              ✓
            </div>
            <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-dark-green mb-2">
              Registration Submitted!
            </h2>
            <p className="text-[0.95rem] text-text-secondary leading-relaxed mb-7">
              Thank you for registering with Young Uttarakhand Foundation.
              We&apos;ll be in touch shortly. Jai Uttarakhand! 🙏
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="px-8 py-3 bg-gradient-to-br from-saffron to-crimson text-white border-none rounded-full font-[family-name:var(--font-heading)] text-sm font-semibold tracking-wider uppercase cursor-pointer transition-all duration-250 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(196,30,58,0.3)]"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ========================================
   Reusable Sub-components
   ======================================== */

function SectionHeader({ icon, title, className = "" }) {
  return (
    <div
      className={`flex items-center gap-4 px-8 pt-5 pb-3 max-sm:px-4 ${className}`}
    >
      <div className="w-9 h-9 flex items-center justify-center bg-gradient-to-br from-saffron to-saffron-dark rounded-[10px] text-base shadow-[0_3px_10px_rgba(255,107,0,0.25)]">
        {icon}
      </div>
      <span className="font-[family-name:var(--font-heading)] text-[0.9rem] font-bold text-crimson tracking-[2px] uppercase">
        {title}
      </span>
      <div className="flex-1 h-0.5 bg-gradient-to-r from-border-custom to-transparent rounded-full" />
    </div>
  );
}

function InputField({
  id,
  name,
  type = "text",
  label,
  icon,
  placeholder,
  value,
  onChange,
  required = false,
}) {
  return (
    <div className="flex flex-col gap-1.5 group/input">
      <label
        htmlFor={id}
        className="text-xs font-semibold text-text-secondary tracking-wider uppercase transition-colors duration-150 group-focus-within/input:text-saffron-dark"
      >
        {label}
      </label>
      <div className="relative flex items-center">
        <span className="absolute left-3.5 text-base text-text-muted transition-colors duration-250 group-focus-within/input:text-saffron pointer-events-none z-[1]">
          {icon}
        </span>
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="w-full py-3.5 px-4 pl-11 font-[family-name:var(--font-body)] text-[0.95rem] text-text-primary bg-white/85 border-[1.5px] border-border-custom rounded-[10px] outline-none transition-all duration-250 placeholder:text-text-muted hover:border-gold-light hover:bg-white/95 focus:border-gold focus:bg-white focus:shadow-[0_0_0_4px_rgba(212,168,67,0.12),0_2px_8px_rgba(26,26,46,0.08)]"
        />
        {/* Animated focus line */}
        <div className="absolute bottom-0 left-[5%] w-[90%] h-0.5 bg-gradient-to-r from-gold to-saffron rounded-full scale-x-0 transition-transform duration-250 peer-focus:scale-x-100 group-focus-within/input:scale-x-100" />
      </div>
    </div>
  );
}
