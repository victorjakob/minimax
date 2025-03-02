"use client";

import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [status, setStatus] = useState({
    type: null,
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus({
          type: "success",
          message: "Skilaboð send! Við verðum í sambandi fljótlega.",
        });
        reset();
      } else {
        setStatus({
          type: "error",
          message: result.error || "Villa kom upp við að senda skilaboð.",
        });
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: "Villa kom upp við að senda skilaboð.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative my-20 w-full overflow-hidden">
      <div className="container mx-auto grid gap-10 px-4 md:grid-cols-2 md:items-center">
        {/* Text Content */}
        <motion.div
          className="space-y-6 text-main"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 0.9, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
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

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="pl-3 text-sm font-light text-main"
                >
                  Nafn
                </label>
                <input
                  {...register("name", { required: true })}
                  type="text"
                  className="mt-1 w-full rounded-full border border-gray-300 p-3 focus:border-main focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="company"
                  className="block pl-3 text-sm font-light text-main"
                >
                  Fyrirtæki <span className="text-gray-400">(valfrjálst)</span>
                </label>
                <input
                  {...register("company")}
                  type="text"
                  className="mt-1 w-full rounded-full border border-gray-300 p-3 focus:border-main focus:outline-none"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label
                  htmlFor="email"
                  className="block pl-3 text-sm font-light text-main"
                >
                  Netfang
                </label>
                <input
                  {...register("email", {
                    required: true,
                    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  })}
                  type="email"
                  className="mt-1 w-full rounded-full border border-gray-300 p-3 focus:border-main focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block pl-3 text-sm font-light text-main"
                >
                  Sími
                </label>
                <input
                  {...register("phone", { required: true })}
                  type="tel"
                  className="mt-1 w-full rounded-full border border-gray-300 p-3 focus:border-main focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block pl-3 text-sm font-light text-main"
              >
                Skilaboð
              </label>
              <textarea
                {...register("message", { required: true })}
                rows="4"
                className="mt-1 w-full rounded-3xl border border-gray-300 p-4 focus:border-main focus:outline-none"
              ></textarea>
            </div>

            {status.message && (
              <div
                className={`rounded-lg p-4 ${
                  status.type === "success"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {status.message}
              </div>
            )}

            <motion.button
              type="submit"
              className="w-full rounded-full bg-main px-6 py-3 text-second transition-colors hover:bg-gray-700 disabled:opacity-70"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sendi..." : "Senda"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
