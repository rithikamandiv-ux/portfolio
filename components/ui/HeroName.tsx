"use client";

import TechText from "./TechText";

export default function HeroName() {
  return (
    <>
      <h1 className="sr-only">Rithika Mandiv</h1>
      <div className="mt-6" aria-hidden="true">
        <div className="-ml-6 h-[80px] md:h-[110px] lg:h-[140px]">
          <TechText
            text="Rithika"
            color="#f2e9e4"
            accentColor="#f2e9e4"
            fontWeight={700}
            letterSpacing={-0.04}
            fontSize={180}
            align="left"
            className="font-[family-name:var(--font-inter)]"
          />
        </div>
        <div className="-ml-6 h-[80px] md:h-[110px] lg:h-[140px]">
          <TechText
            text="Mandiv"
            color="#C9ADA7"
            accentColor="#C9ADA7"
            fontWeight={700}
            letterSpacing={-0.04}
            fontSize={180}
            align="left"
            className="font-[family-name:var(--font-inter)]"
          />
        </div>
      </div>
    </>
  );
}
