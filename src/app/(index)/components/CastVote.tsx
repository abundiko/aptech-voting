import AppSelect from "@/components/ui/AppSelect";
import { updateUser } from "@/state/global/slice";
import { RootState } from "@/state/store";
import { APP_SECRET } from "@/utils/constants";
import { getCookie } from "@/utils/cookies";
import { decodeID } from "@/utils/encode-decode";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";

export default function CastVote() {
  const [loading, setLoading] = useState(false);
  const [canContinue, setCanContinue] = useState([false, false, false]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const voteSlice = useSelector((state: RootState) => state.votesSlice);
  const dispatch = useDispatch();
  const faculties = voteSlice.allVotes.map(_ => _.name);

  async function handleSubmit(event: any) {
    event.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    try {
      const formData = new FormData(event.target);
      formData.append("sid",decodeID(getCookie("uid") ?? "", process.env.APP_SECRET ?? APP_SECRET));
      const req = await fetch("/api/votes", {
        method: "PUT",
        body: formData
      });
      const json = await req.json();

      if (json.success) {
        setLoading(false);
        dispatch(updateUser("voted"));
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
    <form
      onSubmit={handleSubmit}
      className="app-container flex flex-col gap-5 items-center justify-center py-3"
    >
      {errorMessage &&
        <p className="p-2 w-fit bg-red-200 text-red-900 rounded-md">
          {errorMessage}
        </p>}
      <div className="w-full md:w-fit max-sm:flex-col flex gap-3 lg:gap-5 items-center">
        <div className="flex flex-col gap-2">
          <h1 className="text-xs opacity-80 mb-1">Best in Academics:</h1>
          <div className="w-40 rounded-md bg-red-100 py-1 px-2">
            <AppSelect
              name="education"
              items={faculties}
              title="faculties:"
              placeholder="select faculty"
              onChange={value => {
                setCanContinue(old => {
                  if (value.trim() !== "") old[0] = true;
                  return old;
                });
              }}
            />
          </div>
        </div>
        <div className="w-[2px] bg-slate-200  rounded h-12 max-sm:h-[2px] max-sm:w-7/12" />
        <div className="flex flex-col gap-2">
          <h1 className="text-xs opacity-80 mb-1">Best in Punctuality:</h1>
          <div className="w-40 rounded-md bg-red-100 py-1 px-2">
            <AppSelect
              name="punctuality"
              items={faculties}
              title="faculties:"
              placeholder="select faculty"
              onChange={value => {
                setCanContinue(old => {
                  if (value.trim() !== "") old[1] = true;
                  return old;
                });
              }}
            />
          </div>
        </div>
        <div className="w-[2px] bg-slate-200  rounded h-12 max-sm:h-[2px] max-sm:w-7/12" />
        <div className="flex flex-col gap-2">
          <h1 className="text-xs opacity-80 mb-1">Best in Dressing:</h1>
          <div className="w-40 rounded-md bg-red-100 py-1 px-2">
            <AppSelect
              name="dressing"
              items={faculties}
              title="faculties:"
              placeholder="select faculty"
              onChange={value => {
                setCanContinue(old => {
                  if (value.trim() !== "") old[2] = true;
                  return old;
                });
              }}
            />
          </div>
        </div>
      </div>
      <button
        role={loading ? "button" : undefined}
        disabled={loading || canContinue.includes(false)}
        className="text-center w-fit rounded-3xl disabled:opacity-70 disabled:pointer-events-none bg-primary text-light hover:bg-red-100 hover:text-dark-text border-primary border px-10 font-semibold py-3 inline-flex items-center justify-center"
      >
        {loading
          ? <FaSpinner className="animate-spin" />
          : <span>Submit Vote</span>}
      </button>
    </form>
  );
}
