"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { EMAIL, PHONES, tel } from "../../lib/contact";

const inputBase =
  "mt-1 w-full border bg-white/60 p-3 text-main placeholder:text-gray-400 transition-colors focus:bg-white focus:outline-none focus:ring-2 focus:ring-main/20";

function Field({ id, label, optional, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="block pl-3 text-sm font-light text-main">
        {label}{" "}
        {optional && <span className="text-gray-400">(valfrjálst)</span>}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-error`}
            role="alert"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-1 pl-3 text-xs text-red-700"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onTouched" });

  const [sentTo, setSentTo] = useState(null); // first name after success
  const [failed, setFailed] = useState(false);

  const onSubmit = async (data) => {
    setFailed(false);
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, page: window.location.pathname }),
      });
      if (!res.ok) throw new Error();
      setSentTo(data.name.trim().split(/\s+/)[0]);
      reset();
    } catch {
      setFailed(true);
    }
  };

  const ring = (name) =>
    errors[name]
      ? "border-red-400 focus:border-red-500"
      : "border-gray-300 focus:border-main";

  const aria = (name) => ({
    id: name,
    "aria-invalid": errors[name] ? "true" : "false",
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  });

  return (
    <div className="relative my-20 w-full overflow-hidden">
      <div className="container mx-auto grid gap-10 px-4 md:grid-cols-2 md:items-center">
        {/* Text Content */}
        <motion.div
          className="space-y-6 text-main"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 0.9, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-3xl font-light md:text-4xl lg:text-5xl">
            Sendu okkur skilaboð
          </h2>
          <p className="text-base font-light leading-relaxed md:text-lg">
            Sendu okkur skilaboð eða hringdu ef þú hefur einhverjar spurningar.
            Þú getur líka kíkt í kaffibolla til okkar - við tökum alltaf vel á
            móti gestum. Hafðu samband og við finnum bestu lausnina fyrir þig.
          </p>
        </motion.div>

        {/* Form / confirmation */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative"
        >
          <AnimatePresence mode="wait">
            {sentTo ? (
              <motion.div
                key="sent"
                role="status"
                aria-live="polite"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex min-h-[420px] flex-col items-center justify-center rounded-[2rem] border border-main/10 bg-white/50 px-8 py-14 text-center text-main"
              >
                <svg viewBox="0 0 52 52" className="mb-8 h-16 w-16" aria-hidden="true">
                  <motion.circle
                    cx="26" cy="26" r="24" fill="none" stroke="currentColor" strokeWidth="1.5"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                  />
                  <motion.path
                    d="M15 27 l7 7 l15 -16" fill="none" stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                    transition={{ duration: 0.4, delay: 0.6, ease: "easeOut" }}
                  />
                </svg>
                <h3 className="text-3xl font-light md:text-4xl">Takk, {sentTo}.</h3>
                <p className="mt-4 max-w-sm font-light leading-relaxed text-main/80">
                  Skilaboðin eru komin til okkar. Við svörum yfirleitt innan
                  eins virks dags og staðfesting hefur verið send á netfangið
                  þitt.
                </p>
                <button
                  type="button"
                  onClick={() => setSentTo(null)}
                  className="mt-10 text-sm font-light underline decoration-main/30 underline-offset-4 transition hover:decoration-main"
                >
                  Senda önnur skilaboð
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Honeypot: hidden from people, bots fill it in */}
                <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                  <label htmlFor="website">Vefsíða</label>
                  <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <Field id="name" label="Nafn" error={errors.name?.message}>
                    <input
                      {...aria("name")}
                      {...register("name", { required: "Hvað heitir þú?" })}
                      type="text"
                      autoComplete="name"
                      className={`${inputBase} rounded-full ${ring("name")}`}
                    />
                  </Field>
                  <Field id="company" label="Fyrirtæki" optional>
                    <input
                      {...aria("company")}
                      {...register("company")}
                      type="text"
                      autoComplete="organization"
                      className={`${inputBase} rounded-full ${ring("company")}`}
                    />
                  </Field>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <Field id="email" label="Netfang" error={errors.email?.message}>
                    <input
                      {...aria("email")}
                      {...register("email", {
                        required: "Við þurfum netfang til að svara þér.",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
                          message: "Þetta netfang lítur ekki rétt út.",
                        },
                      })}
                      type="email"
                      autoComplete="email"
                      className={`${inputBase} rounded-full ${ring("email")}`}
                    />
                  </Field>
                  <Field id="phone" label="Sími" error={errors.phone?.message}>
                    <input
                      {...aria("phone")}
                      {...register("phone", {
                        required: "Settu inn símanúmer.",
                        pattern: {
                          value: /^[+\d][\d\s-]{6,}$/,
                          message: "Þetta símanúmer lítur ekki rétt út.",
                        },
                      })}
                      type="tel"
                      autoComplete="tel"
                      className={`${inputBase} rounded-full ${ring("phone")}`}
                    />
                  </Field>
                </div>

                <Field id="message" label="Skilaboð" error={errors.message?.message}>
                  <textarea
                    {...aria("message")}
                    {...register("message", {
                      required: "Hvernig getum við aðstoðað?",
                      minLength: { value: 5, message: "Skrifaðu aðeins meira." },
                    })}
                    rows="5"
                    className={`${inputBase} resize-y rounded-3xl p-4 ${ring("message")}`}
                  />
                </Field>

                <AnimatePresence>
                  {failed && (
                    <motion.div
                      role="alert"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden rounded-3xl border border-red-200 bg-red-50/70 px-5 py-4 text-sm font-light text-red-800"
                    >
                      Því miður náðum við ekki að senda skilaboðin. Reyndu aftur
                      eða hafðu beint samband í síma{" "}
                      <a href={tel(PHONES[0].number)} className="underline">{PHONES[0].number}</a>{" "}
                      eða á <a href={`mailto:${EMAIL}`} className="underline">{EMAIL}</a>.
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button
                  type="submit"
                  className="flex w-full items-center justify-center gap-3 rounded-full bg-main px-6 py-3 text-second transition-colors hover:bg-gray-700 disabled:cursor-wait disabled:opacity-80"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting && (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-second/30 border-t-second" aria-hidden="true" />
                  )}
                  {isSubmitting ? "Sendi…" : "Senda"}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
