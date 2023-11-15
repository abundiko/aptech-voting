import { updateUser } from "@/state/global/slice";
import { APP_SECRET } from "@/utils/constants";
import { setCookie } from "@/utils/cookies";
import { encodeID } from "@/utils/encode-decode";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {FaSpinner} from 'react-icons/fa6'
import { useDispatch } from "react-redux";

export default function VoterLogin() {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string|null>(null);
  const dispatch = useDispatch();

  async function handleSubmit(event:any) {
    event.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    try {
      const formData = new FormData(event.target);
      const req = await fetch('/api/login',{
        method:"POST",
        body: formData
      });
      const json = await req.json();
      
      if(json.success){
        setLoading(false);
        setShowModal(false);
        setCookie("uid", encodeID(json.uid as string, process.env.APP_SECRET ?? APP_SECRET), 30);
        if(json.voted)dispatch(updateUser("voted"));
        else dispatch(updateUser("loggedin"));
      }else if(json.error){
        setLoading(false)
        setErrorMessage(json.error);
      }
    } catch (error) {
      setLoading(false)
        setErrorMessage("an error occurred");
    }
  }
return (
  <>
  <div className="flex justify-center py-5">
    <button
    onClick={()=>setShowModal(true)}
     className="rounded-3xl font-semibold border-primary border bg-red-100 text-primary hover:bg-primary hover:text-light-text px-10 py-3 shadow hover:scale-90">
      Login to Vote
    </button>
  </div>
  <AnimatePresence mode="wait">
      {showModal &&
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="z-30 fixed top-0 left-0 w-full h-full backdrop-blur-md flex items-center justify-center"
        >
          <div
            className="w-full h-full bg-black opacity-20 absolute top-0 left-0"
            onClick={() => setShowModal(false)}
          />
          <motion.div
            initial={{ opacity: 0,scale:0.8 }}
            animate={{ opacity: 1,scale:1 }}
            exit={{ opacity: 0,scale:0.8 }}
            className="drop-shadow-lg bg-light rounded-lg relative p-4 border-2 border-primary w-[min(90vw,300px)]"
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <h1 className="font-bold text-xl ">Login</h1>
              {
                errorMessage &&
                <p className="p-2 bg-red-200 text-red-900 rounded-md">{errorMessage}</p>
              }
              <div><label htmlFor="id" className="opacity-80 text-xs">Student ID:</label>
              <input placeholder="enter your student id" type="text" name="sid" id="id" className="w-full rounded-md outline-primary border px-5 py-3" />
              </div>
              <button
              role={loading ? "button" : undefined}
              disabled={loading}
               className="text-center rounded-md disabled:opacity-70 disabled:pointer-events-none bg-primary text-light hover:bg-red-100 hover:text-dark-text border-primary border px-5 py-3 inline-flex items-center justify-center">
                {
                  loading ? <FaSpinner className="animate-spin" />
                  : <span>Login</span>
                }
              </button>
            </form>
          </motion.div>
        </motion.div>}
        </AnimatePresence>
  </>
);
}