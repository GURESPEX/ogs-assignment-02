import Word from "./Word";

interface Vocab {
  lang: string;
  word: string;
}

type Props = {
  title: string;
  items: Vocab[];
  add: (items: Vocab[], index: number) => void;
  removeCount?: number;
};

export default function Section({ title, items, add, removeCount }: Props) {
  return (
    <div className="flex flex-col flex-1 gap-4 overflow-hidden">
      <div className="flex flex-row h-[64px] justify-center gap-4 p-4 bg-white rounded drop-shadow-sm font-bold">
        {title}
      </div>
      <div className="flex flex-col gap-2 p-4 bg-slate-200 rounded h-full shadow-inner overflow-auto">
        {items.map((item: Vocab, index) => (
          <Word
            key={index}
            item={item}
            index={index}
            items={items}
            add={add}
            removeCount={removeCount}
          />
        ))}
      </div>
    </div>
  );
}
