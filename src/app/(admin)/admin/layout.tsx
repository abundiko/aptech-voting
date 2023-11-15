import { connectDB } from "@/server/conectDB";
import Link from "next/link";
import { FaUserClock, FaUserShield } from "react-icons/fa6";

connectDB();

export default async function page({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen">
      <div className="py-4 app-container">
        <h1 className="text-lg font-bold text-primary">
          Aptech(<span className="text-yellow-500">Admin</span>)
        </h1>
      </div>
      <section className="py-10 app-container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          <Link
            href="/admin/faculties"
            className="rounded-md block border-primary p-5 bg-slate-100 border hover:text-primary"
          >
            <FaUserShield className="text-4xl" />
            <h1 className="text-base font-semibold">Faculties</h1>
          </Link>
          <Link
            href="/admin/pending"
            className="rounded-md block border-primary p-5 bg-slate-100 border hover:text-primary"
          >
            <FaUserClock className="text-4xl" />
            <h1 className="text-base font-semibold">Pending Students</h1>
          </Link>
        </div>
      </section>
      {children}
    </main>
  );
}
