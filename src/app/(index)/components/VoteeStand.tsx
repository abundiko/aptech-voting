import { VoteCategories, VoteCategoryType, Votee } from "@/utils/constants";
import {  AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa6";

export type VoteeStandProps = Votee & {
  currentCategory: VoteCategoryType;
  barHeight: VoteCategories;
};

export default function VoteeStand({
  currentCategory,
  barHeight,
  name,
  votes,
  id
}: VoteeStandProps) {
  const [showModal, setShowModal] = useState(false);
  const [newVotes, setNewVotes] = useState<number|null>(null);
  const [oldValue, setOldValue] = useState<typeof votes>({
    education:0,
    dressing:0,
    punctuality:0
  });

  useEffect(()=>{
    if (votes === oldValue) return;
    setOldValue(votes);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  useEffect(()=>{
        if (votes.dressing === oldValue.dressing && votes.education === oldValue.education && votes.punctuality === oldValue.punctuality) return;
        
    const addedVotes = votes[currentCategory] - oldValue![currentCategory];
    setNewVotes(addedVotes);
    setOldValue(votes);
    setTimeout(() => {
      setNewVotes(null);
    }, 2000);
  },[votes])

  return (
    <>
      <motion.div
        initial={{ opacity: 0, height: "0%" }}
        exit={{ opacity: 0, height: "0%" }}
        animate={{ opacity: 1, height: "100%" }}
        key={id}
        className="w-28 md:w-40 h-full flex flex-col justify-end items-center"
      >
        <motion.div
          onClick={() => setShowModal(true)}
          className="rounded-md hover:scale-105 border-2 hover:drop-shadow-lg overflow-hidden relative bg-light cursor-pointer shadow-md flex flex-col items-center justify-center border-primary p-3 h-[45%] w-full"
        >
          <AnimatePresence mode="wait">
          {
        newVotes &&
        <motion.div
        initial={{
          opacity: 0,
          scale: 0,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: 1,
          scale: 1,
          translateX: "-50%",
          translateY: "-50%",
        }}
        exit={{
          opacity: 0,
          scale: 3,
          translateX: "-50%",
          translateY: "-50%",
        }}
         className="absolute top-1/2 left-1/2 -translate-x-1/2 bg-red-100 p-5 rounded-full -translate-y-1/2 text-3xl font-bold">+{newVotes}</motion.div>
         }
         </AnimatePresence>
          <div className="flex rounded-full h-10 w-10 items-center justify-center text-xl text-light-text bg-dark-text">
            <FaUser />
          </div>
          <motion.h1
            className="my-1 leading-[15px] font-bold text-center text-base"
          >
            {name}
          </motion.h1>
          <p className="opacity-80 text-sm text-center">
            {votes[currentCategory]} {votes[currentCategory] == 1 ? "Vote" : "Votes"}
          </p>
        </motion.div>
        <div
          style={{ height: barHeight[currentCategory] + "%" }}
          className="w-4/12 bg-primary"
        />
      </motion.div>
      <AnimatePresence mode="wait">
      {showModal &&
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="z-30 fixed top-0 left-0 w-full h-full backdrop-blur-sm flex items-center justify-center"
        >
          <div
            className="w-full h-full bg-black opacity-20 absolute top-0 left-0"
            onClick={() => setShowModal(false)}
          />
          <motion.div
            initial={{ opacity: 0,scale:0.8 }}
            animate={{ opacity: 1,scale:1 }}
            exit={{ opacity: 0,scale:0.8 }}
            className="drop-shadow-lg bg-light rounded-lg relative p-4 border-2 border-primary w-[min(90vw,400px)]"
          >
            <div className="flex gap-4 items-center">
              <div className="w-7/12 p-2">
                <motion.div
                  className="rounded-full block bg-slate-200 aspect-square w-32 flex-shrink-0"
                />
                <motion.h1
                  className="my-1 leading-[20px] font-bold text-lg"
                >
                  {name}
                </motion.h1>
              </div>
              <div className="w-5/12 h-fit flex flex-col justify-center items-start rounded-md overflow-hidden">
                <div className="bg-yellow-100 text-dark w-full p-2">
                  <h1 className="text-sm opacity-80">Education</h1>
                  <p className="text-md font-semibold">
                    {votes.education}
                  </p>
                </div>
                <div className="bg-red-100 text-dark w-full p-2">
                  <h1 className="text-sm opacity-80">Punctuality</h1>
                  <p className="text-md font-semibold">
                    {votes.punctuality}
                  </p>
                </div>
                <div className="bg-green-100 text-dark w-full p-2">
                  <h1 className="text-sm opacity-80">Dressing</h1>
                  <p className="text-md font-semibold">
                    {votes.dressing}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>}
        </AnimatePresence>
    </>
  );
}
