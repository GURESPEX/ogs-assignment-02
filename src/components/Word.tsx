import { useState, useEffect } from "react";
import { IoIosLock, IoIosUnlock } from "react-icons/io";

interface Vocab {
  lang: string;
  word: string;
}

type Props = {
  item: Vocab;
  index: number;
  items: Vocab[];
  add: (items: Vocab[], index: number) => void;
  removeCount?: number | undefined;
};

export default function Word({ item, index, items, add, removeCount }: Props) {
  const [count, setCount] = useState<number | undefined>(removeCount);
  const [locked, setLocked] = useState<boolean>(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!locked) {
        if (count != undefined) {
          if (count > 0) {
            setCount(count - 1);
          } else {
            add(items, index);
            clearInterval(intervalId);
          }
        }
      }
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  });

  return (
    <div
      className={`flex flex-row items-center gap-4 ${locked && "opacity-50"}`}
    >
      <div
        className={`flex flex-row flex-1 h-[64px] justify-between items-center gap-4 p-4 bg-white rounded drop-shadow-sm font-semibold transition ${
          locked
            ? "hover:cursor-not-allowed"
            : "hover:cursor-pointer active:bg-slate-100"
        } `}
        key={index}
        onClick={(e) => {
          if (locked) {
            e.preventDefault();
          } else {
            add(items, index);
          }
        }}
      >
        <div>{item.word}</div>
        {removeCount !== undefined && count !== undefined && (
          <div
            style={{
              backgroundImage: `conic-gradient(#e5e7eb 0deg,#e5e7eb ${
                (count / removeCount) * 360
              }deg, white ${(count / removeCount) * 360}deg, white 360deg)`,
            }}
            className={`relative flex flex-row gap-4 w-[48px] h-[48px] justify-center items-center p-4 font-semibold active:bg-slate-200 text-slate-400 active:text-slate-500 hover:cursor-pointer transition rounded-full ${
              locked ? "bg-slate-100" : ""
            }`}
            onClick={(e) => {
              e.stopPropagation();
              setLocked(!locked);
              setCount(removeCount);
            }}
          >
            <div className="absolute flex justify-center items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[42px] h-[42px] bg-white rounded-full">
              {locked ? (
                <IoIosLock className="flex scale-125" />
              ) : (
                <IoIosUnlock className="flex scale-125" />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
