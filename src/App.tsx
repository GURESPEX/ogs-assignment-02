import Section from "@components/Section";
import { useState } from "react";

import vocabs_json from "@data/word.json";
import { Vocab } from "types/vocab";

export default function App() {
  const [vocabs, setVocabs] = useState<Vocab[]>(vocabs_json);
  const [thaiVocabs, setThaiVocabs] = useState<Vocab[]>([]);
  const [engVocabs, setEngVocabs] = useState<Vocab[]>([]);

  console.log(vocabs);

  function addVocab(items: Vocab[], index: number) {
    console.log(index);

    const item = items[index];
    if (item.lang === "TH") {
      thaiVocabs.push(item);
      vocabs.splice(index, 1);
      setThaiVocabs([...thaiVocabs]);
    } else if (item.lang === "EN") {
      engVocabs.push(item);
      vocabs.splice(index, 1);
      setEngVocabs([...engVocabs]);
    }
  }

  function addThaiVocab(items: Vocab[], index: number) {
    const item = items[index];
    vocabs.push(item);
    thaiVocabs.splice(index, 1);
    setVocabs([...vocabs]);
  }

  function addEngVocab(items: Vocab[], index: number) {
    const item = items[index];
    vocabs.push(item);
    engVocabs.splice(index, 1);
    setVocabs([...vocabs]);
  }

  return (
    <div className="flex flex-row justify-center bg-slate-100 h-screen overflow-hidden">
      <div className="container flex flex-col bg-slate-100">
        {/* <nav className="flex flex-row p-4 bg-blue-600 rounded-b">
          <div className="text-white font-bold text-xl">To Do List</div>
        </nav> */}
        <main className="flex flex-col gap-4 p-4 h-full">
          <div className="flex flex-row gap-4 h-full">
            <Section title={"คำศัพท์"} items={vocabs} add={addVocab} />
            <Section
              title={"ภาษาไทย"}
              items={thaiVocabs}
              add={addThaiVocab}
              removeCount={5}
            />
            <Section
              title={"ภาษาอังกฤษ"}
              items={engVocabs}
              add={addEngVocab}
              removeCount={5}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
