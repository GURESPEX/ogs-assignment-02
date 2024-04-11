import { motion, AnimatePresence } from "framer-motion";
import Word from "./Word";
import { Vocab } from "types/vocab";
import { RxCross2 } from "react-icons/rx";

type Props = {
  gridEnable?: boolean;
  title: string;
  items: Vocab[];
  add: (items: Vocab[], index: number) => void;
  timeout?: number;
};

export default function Section({
  gridEnable,
  title,
  items,
  add,
  timeout,
}: Props) {
  return (
    <motion.div
      initial={{ scale: 0, rotate: Math.random() * 180 - 90 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", duration: 0.5 }}
      style={{ filter: "drop-shadow(2px 2px 0 #000)" }}
      className="flex flex-col flex-1"
    >
      <div
        style={{ lineHeight: 0 }}
        className={`flex flex-row justify-between items-center gap-4 h-[64px] font-bold text-xl bg-yellow-500 p-4 border-2 border-b-4 border-black rounded-t-lg`}
      >
        <div className="flex flex-row gap-4 items-center">
          <motion.div
            style={{ lineHeight: 0 }}
            whileHover={{ scale: 1.5, rotate: 15 }}
            className="flex flex-row justify-center items-center w-[32px] aspect-square bg-black rounded-lg text-white text-sm"
          >
            {items.length}
          </motion.div>
          <div>{title}</div>
        </div>
        <div className="flex justify-center items-center w-[32px] aspect-square">
          <RxCross2 className="text-2xl font-bold" />
        </div>
      </div>
      <div
        className={`${
          gridEnable ? "grid grid-cols-4" : "flex flex-col"
        } content-start w-full gap-2 p-4 bg-orange-100 h-full border-2 border-black border-t-0 rounded-b-lg`}
      >
        <AnimatePresence>
          {items.map((item: Vocab, index) => (
            <Word
              key={item.word}
              item={item}
              index={index}
              items={items}
              add={add}
              timeout={timeout}
            />
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
