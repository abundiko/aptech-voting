"use client";
import { getCookie } from "@/utils/cookies";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import PersonCard, { Faculty, PersonCardProps } from "../components/PersonCard";
import { FaPlus } from "react-icons/fa6";
import Link from "next/link";

export default function Page() {
  const loaded = useRef(false);
  const [data, setData] = useState<Array<Faculty> | null>(null);
  useEffect(() => {
    if (!loaded.current) {
      loaded.current = true;
      fetchData();
    }
  }, []);

  async function fetchData() {
    try {
      const req = await fetch("/api/admin/faculty", {
        method: "POST",
        body: JSON.stringify({})
      });
      const json = await req.json();
      if (json.success) {
        setData(json.data);
      } else throw new Error();
    } catch (error) {
      fetchData();
    }
  }

  async function deleteFaculty(name: string) {
    try {
      const req = await fetch("/api/admin/faculty", {
        method: "DELETE",
        body: JSON.stringify({ name })
      });
      const json = await req.json();
      if (json.success) {
        if (data) setData(data.filter(faculty => faculty.name !== name));
      } else throw new Error();
    } catch (error) {}
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
        className="drop-shadow-lg bg-light rounded-lg relative p-4 border-2 border-primary w-[min(90vw,700px)] h-[min(90vh,500px)] ]"
      >
        <div className="flex items-center justify-between py-2">
          <h1 className="text-2xl font-bold w-full">Faculties</h1>
          <Link
            href="/admin/faculties/add"
            onClick={fetchData}
            className="rounded-3xl font-semibold inline-flex items-center justify-center gap-2 border-primary border bg-red-100 text-primary hover:bg-primary hover:text-light-text px-2 py-1 shadow hover:scale-90"
          >
            <FaPlus />
            <span>add</span>
          </Link>
        </div>
        {data == null
          ? <div>
              <div className="p-6 rounded-md bg-slate-200 mb-3 shimmer" />
              <div className="p-6 rounded-md bg-slate-200 mb-3 shimmer" />
              <div className="p-6 rounded-md bg-slate-200 mb-3 shimmer" />
            </div>
          : data.map((item, i) =>
              <PersonCard
                key={i}
                {...item}
                onDelete={() => {
                  deleteFaculty(item.name);
                }}
              />
            )}
      </motion.div>
    </motion.div>
  );
}
