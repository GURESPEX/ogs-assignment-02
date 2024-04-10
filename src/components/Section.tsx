import Word from "./Word";

interface Vocab {
  lang: string;
  word: string;
}

type Props = {
  title: string;
  items: Vocab[];
  add: (items: Vocab[], index: number) => void;
  timeout?: number;
};

export default function Section({ title, items, add, timeout }: Props) {
  return (
    <div className="flex flex-col flex-1 gap-4 overflow-hidden">
      <div className="flex flex-row h-[64px] justify-center gap-4 p-4 bg-white rounded drop-shadow-sm font-bold">
        {title}
      </div>
      <div className="flex flex-col gap-2 p-4 bg-slate-200 rounded h-full shadow-inner overflow-auto">
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
      </div>
    </div>
  );
}
