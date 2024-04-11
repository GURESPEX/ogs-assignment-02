import Section from "@components/Section";
import { useState } from "react";
import { motion } from "framer-motion";
import vocabs_json from "@data/word.json";
import { Vocab } from "types/vocab";

export default function App() {
  const [vocabs, setVocabs] = useState<Vocab[]>(vocabs_json);
  const [thaiVocabs, setThaiVocabs] = useState<Vocab[]>([]);
  const [engVocabs, setEngVocabs] = useState<Vocab[]>([]);

  function addVocab(items: Vocab[], index: number) {
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
    <div className="flex flex-row justify-center items-center bg-stone-600 h-screen overflow-hidden">
      <div className="container flex flex-col h-4/5">
        <main
          style={{ filter: "drop-shadow(4px 4px 0 rgba(0, 0, 0, .25))" }}
          className="flex flex-col gap-4 p-4 h-full"
        >
          <motion.div
            initial={{ scale: 0, rotate: Math.random() * 720 - 360 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="flex flex-col gap-4 h-full"
          >
            <div className="flex flex-row gap-4 h-full">
              <Section
                gridEnable={true}
                title={"คำศัพท์"}
                items={vocabs}
                add={addVocab}
              />
            </div>
            <div className="flex flex-row gap-4 h-full">
              <Section
                title={"ภาษาไทย"}
                items={thaiVocabs}
                add={addThaiVocab}
                timeout={5}
              />
              <Section
                title={"ภาษาอังกฤษ"}
                items={engVocabs}
                add={addEngVocab}
                timeout={5}
              />
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
