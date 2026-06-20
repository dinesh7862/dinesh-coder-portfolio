"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSending(false);
    setSent(true);
    setFormState({ name: "", email: "", message: "" });
  };

  const contactItems = [
    {
      icon: "📧",
      label: "Email",
      value: "dineshkumar65418@gmail.com",
      color: "var(--neon-blue)",
      href: "mailto:dineshkumar65418@gmail.com",
    },
    {
      icon: "📱",
      label: "Mobile",
      value: "+91 7009110577",
      color: "var(--neon-purple)",
      href: "tel:+917009110577",
    },
    {
      icon: "📍",
      label: "Location",
      value: "Mandi, Himachal Pradesh, India",
      color: "var(--neon-cyan)",
      href: "https://maps.google.com/?q=Mandi,Himachal+Pradesh",
    },
  ];

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-32 overflow-hidden"
      style={{ background: "var(--bg-dark)" }}
    >
      {/* Aurora */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(circle, rgba(0,212,255,0.07) 0%, transparent 70%)",
          top: "-100px",
          right: "-100px",
          borderRadius: "50%",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(circle, rgba(168,85,247,0.07) 0%, transparent 70%)",
          bottom: "-100px",
          left: "-100px",
          borderRadius: "50%",
          filter: "blur(80px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="section-label">
            <span>{"<"}</span> Contact <span>{"/ >"}</span>
          </span>
          <h2
            className="text-5xl md:text-6xl font-black mt-4 gradient-text"
            style={{ fontFamily: "Space Grotesk" }}
          >
            Let&apos;s Build Together
          </h2>
          <p
            className="mt-4 text-lg max-w-xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            Ready to create something extraordinary? Let&apos;s connect and build the future together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex flex-col gap-6"
          >
            <div
              className="glass-strong rounded-3xl p-8"
              style={{ border: "1px solid rgba(0,212,255,0.1)" }}
            >
              <h3
                className="text-2xl font-bold mb-6"
                style={{ fontFamily: "Space Grotesk", color: "var(--text-primary)" }}
              >
                Get In Touch
              </h3>
              <div className="flex flex-col gap-5">
                {contactItems.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  >
                    <a
                      href={item.href}
                      target={item.href?.startsWith("http") ? "_blank" : undefined}
                      rel={item.href?.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-4 group"
                      style={{ textDecoration: "none" }}
                    >
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                        style={{
                          background: `${item.color}15`,
                          border: `1px solid ${item.color}30`,
                          boxShadow: `0 0 0 0 ${item.color}`,
                          transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 16px ${item.color}40`;
                          (e.currentTarget as HTMLDivElement).style.background = `${item.color}25`;
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                          (e.currentTarget as HTMLDivElement).style.background = `${item.color}15`;
                        }}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <div
                          className="text-xs mb-0.5"
                          style={{
                            color: "var(--text-secondary)",
                            fontFamily: "JetBrains Mono",
                            letterSpacing: "0.1em",
                          }}
                        >
                          {item.label}
                        </div>
                        <div
                          className="font-medium transition-all duration-200"
                          style={{ color: item.color }}
                        >
                          {item.value}
                        </div>
                      </div>
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Status card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="glass rounded-2xl p-6"
              style={{ border: "1px solid rgba(16,185,129,0.2)" }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    background: "var(--neon-emerald)",
                    boxShadow: "0 0 10px var(--neon-emerald)",
                    animation: "pulseGlow 2s ease-in-out infinite",
                  }}
                />
                <span
                  className="text-sm font-semibold"
                  style={{ color: "var(--neon-emerald)" }}
                >
                  Currently Available
                </span>
              </div>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                Open to freelance projects, collaborations, and exciting opportunities.
                Response time: <span style={{ color: "var(--neon-blue)" }}>within 24 hours</span>
              </p>
            </motion.div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div
              className="glass-strong rounded-3xl p-8"
              style={{ border: "1px solid rgba(168,85,247,0.1)" }}
            >
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="text-6xl mb-4">✦</div>
                  <h3
                    className="text-2xl font-bold gradient-text mb-2"
                    style={{ fontFamily: "Space Grotesk" }}
                  >
                    Message Sent!
                  </h3>
                  <p style={{ color: "var(--text-secondary)" }}>
                    I&apos;ll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="btn-primary mt-6"
                    style={{ fontSize: "0.85rem" }}
                  >
                    <span>Send Another</span>
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <h3
                    className="text-2xl font-bold mb-2"
                    style={{ fontFamily: "Space Grotesk", color: "var(--text-primary)" }}
                  >
                    Send Message
                  </h3>
                  <div>
                    <label
                      className="block text-xs mb-2"
                      style={{
                        color: "var(--text-secondary)",
                        fontFamily: "JetBrains Mono",
                        letterSpacing: "0.1em",
                      }}
                    >
                      YOUR NAME
                    </label>
                    <input
                      type="text"
                      required
                      className="form-input"
                      placeholder="John Doe"
                      value={formState.name}
                      onChange={(e) =>
                        setFormState((p) => ({ ...p, name: e.target.value }))
                      }
                    />
                  </div>
                  <div>
                    <label
                      className="block text-xs mb-2"
                      style={{
                        color: "var(--text-secondary)",
                        fontFamily: "JetBrains Mono",
                        letterSpacing: "0.1em",
                      }}
                    >
                      EMAIL ADDRESS
                    </label>
                    <input
                      type="email"
                      required
                      className="form-input"
                      placeholder="john@example.com"
                      value={formState.email}
                      onChange={(e) =>
                        setFormState((p) => ({ ...p, email: e.target.value }))
                      }
                    />
                  </div>
                  <div>
                    <label
                      className="block text-xs mb-2"
                      style={{
                        color: "var(--text-secondary)",
                        fontFamily: "JetBrains Mono",
                        letterSpacing: "0.1em",
                      }}
                    >
                      YOUR MESSAGE
                    </label>
                    <textarea
                      required
                      rows={5}
                      className="form-input resize-none"
                      placeholder="Tell me about your project..."
                      value={formState.message}
                      onChange={(e) =>
                        setFormState((p) => ({ ...p, message: e.target.value }))
                      }
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={sending}
                    style={{ opacity: sending ? 0.7 : 1 }}
                  >
                    <span>{sending ? "Sending..." : "Send Message ✦"}</span>
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
