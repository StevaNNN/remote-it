"use client";

import Text from "@/app/components/Text";
import { LocaleDictionary } from "@/app/lib/i18n/types";
import { FC, useEffect, useRef, useState } from "react";

export interface CounterSectionProps {
  t: LocaleDictionary;
}

type CounterCardConfig = {
  percentage: number;
  text: string;
  incrementDelay: number;
  startDelay: number;
};

const buildCounterData = (t: LocaleDictionary): CounterCardConfig[] => {
  const raw = [
    { percentage: 18, text: t.counterSection.text1 },
    { percentage: 11, text: t.counterSection.text2 },
    { percentage: 300, text: t.counterSection.text3 },
    { percentage: 8, text: t.counterSection.text4 },
  ];

  const startGapMs = 180;
  const endAtMs = 3200;

  return raw.map((item, i) => {
    const startDelay = i * startGapMs;
    const availableMs = Math.max(1, endAtMs - startDelay);

    return {
      ...item,
      startDelay,
      incrementDelay: Math.max(1, Math.round(availableMs / item.percentage)),
    };
  });
};

const useCountUp = (
  target: number,
  incrementDelay = 50,
  startDelay = 0,
  active = false,
) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) {
      setValue(0);
      return;
    }

    setValue(0);

    let intervalId: ReturnType<typeof setInterval> | undefined;

    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        setValue((prev) => {
          if (prev >= target) {
            if (intervalId) clearInterval(intervalId);
            return target;
          }
          return prev + 1;
        });
      }, incrementDelay);
    }, startDelay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [target, incrementDelay, startDelay, active]);

  return value;
};

const CounterCard: FC<CounterCardConfig & { active: boolean }> = ({
  percentage,
  text,
  incrementDelay,
  startDelay,
  active,
}) => {
  const animatedValue = useCountUp(
    percentage,
    incrementDelay,
    startDelay,
    active,
  );

  return (
    <div className="card flex-1 v-box align-items-center justify-content-center">
      <Text fontVariant="lineca" fontSize="5xl">
        {animatedValue}%
      </Text>
      <Text fontVariant="lineca" fontSize="lg">
        {text}
      </Text>
    </div>
  );
};

export const CounterSection: FC<CounterSectionProps> = ({ t }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setActive(entry.isIntersecting);
      },
      { threshold: 0.25 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section counter-section h-box align-items-center"
      id="counter"
    >
      <div className="section-inner h-box">
        {buildCounterData(t).map((c, i) => (
          <CounterCard key={i} {...c} active={active} />
        ))}
      </div>
    </section>
  );
};
