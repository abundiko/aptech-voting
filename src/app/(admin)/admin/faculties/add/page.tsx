"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa6";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: any) {
    event.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    try {
      const formData = new FormData(event.target);
      const req = await fetch("/api/admin/faculty", {
        method: "PUT",
        body: formData
      });
      const json = await req.json();

      if (json.success) {
        setLoading(false);
        history.back();
      } else if (json.error) {
        setLoading(false);
        setErrorMessage(json.error);
      }
    } catch (error) {
      setLoading(false);
      setErrorMessage("an error occurred");
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="z-30 fixed top-0 left-0 w-full h-full backdrop-blur-md flex items-center justify-center"
    >
      <div
        className="w-full h-full bg-black opacity-20 absolute top-0 left-0"
        onClick={() => history.back()}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="drop-shadow-lg bg-light rounded-lg relative p-4 border-2 border-primary w-[min(90vw,300px)]"
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <h1 className="font-bold text-xl ">Add Faculty</h1>
          {errorMessage &&
            <p className="p-2 bg-red-200 text-red-900 rounded-md">
              {errorMessage}
            </p>}
          <div>
            <label htmlFor="name" className="opacity-80 text-xs">
              Faculty Name:
            </label>
            <input
              placeholder="enter faculty name"
              type="text"
              name="name"
              id="id"
              className="w-full rounded-md outline-primary border px-5 py-3"
            />
          </div>
          <div>
            <label htmlFor="title" className="opacity-80 text-xs">
              Faculty Title:
            </label>
            <input
              placeholder="enter faculty title"
              type="text"
              name="title"
              id="id"
              className="w-full rounded-md outline-primary border px-5 py-3"
            />
          </div>
          <button
            role={loading ? "button" : undefined}
            disabled={loading}
            className="text-center rounded-md disabled:opacity-70 disabled:pointer-events-none bg-primary text-light hover:bg-red-100 hover:text-dark-text border-primary border px-5 py-3 inline-flex items-center justify-center"
          >
            {loading
              ? <FaSpinner className="animate-spin" />
              : <span>Add</span>}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}
