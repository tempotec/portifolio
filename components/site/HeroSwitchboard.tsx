"use client";

import { useMemo, useState } from "react";

type HeroSwitchboardItem = {
  key: string;
  label: string;
  title: string;
  description: string;
  bullets: string[];
};

type HeroSwitchboardProps = {
  items: HeroSwitchboardItem[];
};

export function HeroSwitchboard({ items }: HeroSwitchboardProps) {
  const [activeKey, setActiveKey] = useState(items[0]?.key ?? "");

  const activeItem = useMemo(() => items.find((item) => item.key === activeKey) ?? items[0], [activeKey, items]);

  if (!activeItem) {
    return null;
  }

  return (
    <div className="rounded-[28px] border border-slate-200 bg-white/90 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur">
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => setActiveKey(item.key)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              item.key === activeItem.key
                ? "bg-slate-900 text-white"
                : "border border-slate-200 bg-slate-50 text-slate-600 hover:border-sky-300 hover:text-slate-900"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="mt-5 rounded-[22px] bg-gradient-to-br from-sky-50 via-white to-amber-50 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-700">{activeItem.label}</p>
        <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-slate-900">{activeItem.title}</h3>
        <p className="mt-3 text-sm leading-7 text-slate-600">{activeItem.description}</p>

        <ul className="mt-5 space-y-2">
          {activeItem.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-700">
              <span className="mt-1 h-2 w-2 rounded-full bg-sky-500" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
