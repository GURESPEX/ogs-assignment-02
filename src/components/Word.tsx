import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { IoIosLock, IoIosUnlock } from "react-icons/io";
import { Vocab } from "types/vocab";

type Props = {
  item: Vocab;
  index: number;
  items: Vocab[];
  add: (items: Vocab[], index: number) => void;
  timeout?: number | undefined;
};

export default function Word({ item, index, items, add, timeout }: Props) {
  const [count, setCount] = useState<number | undefined>(timeout);
  const [locked, setLocked] = useState<boolean>(false);
  const intervalId = useRef<NodeJS.Timeout>();

  useEffect(() => {
    intervalId.current = setInterval(() => {
      if (!locked) {
        if (count != undefined) {
          setCount((prev) => (prev as number) - 1);
        }
      }
    }, 1000);
    return () => {
      clearInterval(intervalId.current);
    };
  }, [locked]);

  useEffect(() => {
    if (!locked) {
      if (count != undefined) {
        if (count <= 0) {
          add(items, index);
          clearInterval(intervalId.current);
        }
      }
    }
  }, [count]);

  return (
    <motion.div
      initial={{ scale: 0, rotate: Math.random() * 180 - 90 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", duration: 0.5 }}
      exit={{ scale: 0 }}
      layout
      className="relative flex flex-row gap-4"
    >
      <div
        style={{ filter: "drop-shadow(2px 2px 0 #000)" }}
        className={`flex flex-row flex-1 h-[64px] justify-between items-center gap-4 p-4 bg-white border-2 border-black rounded-lg font-semibold ${
          locked
            ? "hover:cursor-not-allowed"
            : "hover:cursor-pointer active:bg-slate-100"
        }`}
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
        {timeout !== undefined && count !== undefined && (
          <div
            style={{
              backgroundImage: `conic-gradient(#000 0deg,#000 ${
                (count / timeout) * 360
              }deg, white ${(count / timeout) * 360}deg, white 360deg)`,
            }}
            className={`relative flex flex-row gap-4 w-[48px] h-[48px] justify-center items-center p-4 font-semibold active:bg-slate-200 hover:cursor-pointer rounded-full ${
              locked ? "bg-slate-100" : ""
            }`}
            onClick={(e) => {
              e.stopPropagation();
              setLocked(!locked);
              setCount(timeout);
            }}
          >
            <motion.div className="absolute flex justify-center items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[42px] h-[42px] bg-white rounded-full">
              {locked ? (
                <IoIosLock className="flex scale-125" />
              ) : (
                <IoIosUnlock className="flex scale-125" />
              )}
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
