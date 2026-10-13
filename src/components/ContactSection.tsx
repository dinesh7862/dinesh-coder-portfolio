"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE, MaskText, Reveal } from "./Reveal";
import Magnetic from "./Magnetic";

const DETAILS = [
  {
    label: "Email",
    value: "dineshkumar65418@gmail.com",
    href: "mailto:dineshkumar65418@gmail.com",
  },
  { label: "Phone", value: "+91 70091 10577", href: "tel:+917009110577" },
  {
    label: "Location",
    value: "Mandi, Himachal Pradesh, IN",
    href: "https://maps.google.com/?q=Mandi,Himachal+Pradesh",
  },
];

const LABEL_STYLE: React.CSSProperties = {
  fontSize: "0.64rem",
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "var(--muted-2)",
};

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSending(false);
    setSent(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section
      id="contact"
      className="section"
      style={{ borderTop: "1px solid var(--line)" }}
    >
      <div className="container-x">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.05fr] lg:gap-24">
          {/* Left */}
          <div>
            <Reveal>
              <span className="eyebrow">Contact</span>
            </Reveal>

            <h2 className="display h2 mt-6">
              <MaskText text="Let's make" delay={0.05} />
              <br />
              <MaskText text="something *good*." delay={0.18} />
            </h2>

            <Reveal delay={0.18}>
              <p className="lead mt-8">
                Tell me what you&apos;re building. I reply to every serious
                enquiry within a day, usually with a few questions and a rough
                plan.
              </p>
            </Reveal>

            <div className="mt-12" style={{ borderTop: "1px solid var(--line)" }}>
              {DETAILS.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="row-item group flex items-center justify-between gap-6 py-6"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.7, delay: i * 0.07, ease: EASE }}
                >
                  <span
                    className="mono shrink-0"
                    style={{ ...LABEL_STYLE, width: "5.5rem" }}
                  >
                    {item.label}
                  </span>
                  <span
                    className="flex-1 text-sm transition-transform duration-500 group-hover:translate-x-1"
                    style={{ color: "var(--text)" }}
                  >
                    {item.value}
                  </span>
                  <span
                    className="transition-all duration-500 group-hover:translate-x-1 group-hover:text-[var(--accent)]"
                    style={{ color: "var(--muted-2)", fontSize: "0.8rem" }}
                  >
                    ↗
                  </span>
                </motion.a>
              ))}
            </div>

            <Reveal delay={0.15}>
              <div className="mt-10 flex items-center gap-3">
                <span className="dot-live" />
                <span
                  className="mono"
                  style={{ fontSize: "0.7rem", color: "var(--muted)" }}
                >
                  Currently taking on 2 new projects this quarter
                </span>
              </div>
            </Reveal>
          </div>

          {/* Right — form */}
          <Reveal delay={0.1}>
            <div className="card p-8 sm:p-10">
              <AnimatePresence mode="wait">
                {sent ? (
                  <SuccessState key="done" onReset={() => setSent(false)} />
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={submit}
                    className="flex flex-col gap-7"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="field-wrap">
                      <label htmlFor="name" className="mono block" style={LABEL_STYLE}>
                        Your name
                      </label>
                      <input
                        id="name"
                        required
                        className="field"
                        placeholder="Jane Doe"
                        value={form.name}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, name: e.target.value }))
                        }
                      />
                    </div>

                    <div className="field-wrap">
                      <label htmlFor="email" className="mono block" style={LABEL_STYLE}>
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        className="field"
                        placeholder="jane@company.com"
                        value={form.email}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, email: e.target.value }))
                        }
                      />
                    </div>

                    <div className="field-wrap">
                      <label htmlFor="message" className="mono block" style={LABEL_STYLE}>
                        Project
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={4}
                        className="field"
                        placeholder="A few lines about what you need…"
                        value={form.message}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, message: e.target.value }))
                        }
                      />
                    </div>

                    <Magnetic strength={0.12} className="w-full">
                      <button
                        type="submit"
                        disabled={sending}
                        className="btn btn--solid w-full justify-center"
                        style={{ opacity: sending ? 0.65 : 1 }}
                      >
                        <span>{sending ? "Sending…" : "Send message"}</span>
                        {!sending && <span className="arrow">→</span>}
                      </button>
                    </Magnetic>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      className="flex flex-col items-start gap-5 py-4"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      <svg width="46" height="46" viewBox="0 0 46 46" fill="none" aria-hidden="true">
        <motion.circle
          cx="23"
          cy="23"
          r="21"
          stroke="var(--accent)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.9, ease: EASE }}
        />
        <motion.path
          d="M15 23.5l5.5 5.5L31 17"
          stroke="var(--accent)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.5, ease: EASE }}
        />
      </svg>
      <h3 className="display h3">Message received.</h3>
      <p className="text-sm" style={{ color: "var(--muted)" }}>
        Thanks for reaching out — I&apos;ll get back to you within 24 hours.
      </p>
      <button type="button" className="btn btn--ghost mt-2" onClick={onReset}>
        <span>Send another</span>
      </button>
    </motion.div>
  );
}
