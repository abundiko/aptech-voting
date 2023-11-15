import { VoteCategories } from "@/utils/constants";
import { FaTrash, FaUser } from "react-icons/fa6";

export type Faculty = {
  name: string;
  title: string;
  img?: string;
};

export type FacultyWithVotes = Faculty & VoteCategories;

export type PersonCardProps = Faculty & {
  onDelete?: () => void;
  onApprove?: () => void;
};

export default function PersonCard({
  name,
  title,
  img,
  onDelete,
  onApprove
}: PersonCardProps) {
  return (
    <div className="p-2 rounded-md bg-slate-200 mb-2 flex items-center gap-4">
      {img
        ? <img
            src={img}
            alt=""
            className="h-10 w-10 object-cover rounded-full bg-dark-text"
          />
        : <div className="flex rounded-full h-10 w-10 items-center justify-center text-xl text-light-text bg-dark-text">
            <FaUser />
          </div>}
      <div className="flex-grow">
        <h1 className="font-bold text-lg">
          {name}
        </h1>
        <p className="text-sm opacity-80">
          {title}
        </p>
      </div>
      <div className="flex w-fit">
        {!!onDelete &&
          <button
            onClick={onDelete}
            className="p-2 bg-red-800 text-red-100 rounded"
          >
            <FaTrash />
          </button>}
      </div>
    </div>
  );
}
