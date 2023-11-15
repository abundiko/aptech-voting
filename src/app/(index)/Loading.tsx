"use client";
import Typewriter from "typewriter-effect";
import { useDispatch } from "react-redux";
import { updateState, updateUser } from "@/state/global/slice";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Faculty,
  FacultyWithVotes
} from "../(admin)/admin/components/PersonCard";
import { APP_SECRET, Votee } from "@/utils/constants";
import { updateAll } from "@/state/votes/slice";
import getStandFromVotes from "@/utils/getStandFromVotes";
import { getCookie } from "@/utils/cookies";
import { decodeID } from "@/utils/encode-decode";

export default function Loading() {
  const dispatch = useDispatch();
  const [done, setDone] = useState(false);
  const [spin, setSpin] = useState(false);
  const [scale, setScale] = useState(false);
  const hasPassed = useRef(false);
  const loaded = useRef(false);
  const hasPassedFirst = useRef(false);
  const hasGottenVote = useRef(false);
  const [fetched, setFetched] = useState(false);
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
      if(getCookie('uid') && !hasGottenVote.current){
        hasGottenVote.current = true;
      const statusReq = await fetch("/api/login", {
        method: "PUT",
        body: JSON.stringify({
          sid:  decodeID(getCookie("uid") ?? "", process.env.APP_SECRET ?? APP_SECRET)
        })
      });
      const statusJson = await statusReq.json();
      if (statusJson.success) {

        if (statusJson.voted) {
          dispatch(updateUser("voted"));
        }else dispatch(updateUser("loggedin"));
      }
}else if(!getCookie('uid') && !hasGottenVote.current){
  hasGottenVote.current = true;
  dispatch(updateUser("new"));
}
// console.log(json);

      if (json.success) {
        const allVotees: Votee[] = [];
        for (const faculty of json.data as FacultyWithVotes[]) {
          const { name, dressing, education, punctuality } = faculty;
          const id = name.replaceAll(" ", "_");
          allVotees.push({
            name,
            id,
            votes: {
              dressing,
              education,
              punctuality
            }
          });
        }
        dispatch(updateAll(getStandFromVotes(allVotees)));
        
        if (!hasPassedFirst.current) {
          hasPassedFirst.current = true;
          setFetched(true);
        }if (hasPassed.current) {
          setScale(true);
          setTimeout(() => {
            dispatch(updateState("home"));
          }, 3000);
        }
        setTimeout(() => {
          fetchData();
        }, 5000);
      } else throw new Error();
    } catch (error) {
      fetchData();
    }
  }

  return (
    <motion.section
      exit={{ opacity: 0, translateY: -50 }}
      initial={{ opacity: 0, translateY: 50 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "spring", damping: 7, stiffness: 200 }}
      className="bg-primary-dark text-light-text overflow-hidden h-screen w-screen flex items-center justify-center"
    >
      <h1 className="font-semibold flex">
        <span className={spin ? "hidden" : ""}>
          <Typewriter
            onInit={typewriter => {
              typewriter
                .typeString("VotingSystem")
                .pauseFor(1500)
                .callFunction(() => {
                  setDone(true);
                })
                .pauseFor(1500)
                .deleteChars(12)
                .callFunction(() => {
                  setSpin(true);
                })
                .pauseFor(2000)
                .callFunction(() => {
                  hasPassed.current = true;
                  if (fetched) setScale(true);
                })
                .pauseFor(3000)
                .callFunction(() => {
                  if (fetched) dispatch(updateState("home"));
                })
                .stop()
                .start();
            }}
          />
        </span>
        {done &&
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={`inline-flex text-yellow-500 ${spin
              ? " relative h-20 aspect-square rounded-full text-center items-center justify-center"
              : ""} ${scale ? "animate-[loading_2s_ease-out_forwards]" : ""}`}
          >
            <span
              className={
                spin
                  ? "animate-spin inline-block relative origin-center aspect-square text-lg text-center p-1"
                  : ""
              }
            >
              ( )
            </span>
          </motion.span>}
      </h1>
    </motion.section>
  );
}
