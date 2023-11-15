"use client";
import Typewriter from "typewriter-effect";
import { useDispatch } from "react-redux";
import { updateState } from "@/state/global/slice";
import { motion } from "framer-motion";

export default function Intro() {
  const dispatch = useDispatch();

  return (
    <motion.section
      exit={{ opacity: 0, translateY: -50 }}
      transition={{ type: "spring", damping: 7, stiffness: 200 }}
      className="bg-primary-dark text-light-text h-screen w-screen flex items-center justify-center"
    >
      <h1 className="font-semibold">
        <Typewriter
          onInit={typewriter => {
            typewriter
              .typeString(
                "<span class='text-yellow-100'>import</span> VotingSystem <span class='text-sky-400'>from</span> <span class='text-pink-500'>\"abundiko\"</span>"
              )
              .pauseFor(1500)
              .callFunction(() => {
                dispatch(updateState("loading"));
              })
              .start();
          }}
        />
      </h1>
    </motion.section>
  );
}
