"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import Intro from "./Intro";
import { AnimatePresence } from "framer-motion";
import Loading from "./Loading";
import Home from "./Home";

export default function Index() {
  const globalState = useSelector((state: RootState) => state.globalSlice);

  return (
    <main>
      <AnimatePresence mode="sync">
        {globalState.level === "loading"
          ? <Loading />
          : globalState.level === "intro" ? <Intro /> : <Home />}
      </AnimatePresence>
    </main>
  );
}
