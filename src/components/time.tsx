import clsx from "clsx";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  CaliforniaTimeFormatter,
  daysUntilBirthday,
  dob,
} from "@/lib/constants";

function Night({ time }: { time: Date }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return;
    }

    // Thx Ana
    // https://github.com/AnaArsonist/anahoward.me/blob/b41ec1a5112526c03f4e09bc4226506ce529523f/src/components/time-components/NightComponent.tsx#L35
    for (let i = 0; i < 50; i++) {
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.arc(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        Math.random() * 2,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }
  }, [canvasRef]);

  return (
    <div
      className={clsx(
        "relative flex h-24 md:h-auto items-center justify-center overflow-hidden rounded-2xl text-center",
        "bg-sky-900 text-white"
      )}
    >
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full overflow-hidden rounded-2xl"
      />

      <div className="z-10 text-center">
        <h2
          className={clsx(
            "text-2xl font-semibold text-glow-sky-900 dark:text-glow-sky-500"
          )}
          suppressHydrationWarning
        >
          {CaliforniaTimeFormatter.format(time)}
        </h2>

        <p
          className={clsx(
            "text-xs font-light",
            "text-glow-sky-900 dark:text-glow-sky-500"
          )}
        >
          in vancouver
        </p>
      </div>
    </div>
  );
}

function Day({ time }: { time: Date }) {
  return (
    <div className="relative h-24 md:h-auto flex overflow-hidden rounded-2xl bg-gradient-to-br from-[#0A8DFF] to-[#98CFFF] first-letter:w-full text-center">
      <div className="flex w-full items-center justify-center">
        <div className="opacity-85 flex items-baseline space-x-1 md:space-x-2">
          <div className="flex flex-col">
            <h2 className="text-2xl font-semibold text-white">
              {CaliforniaTimeFormatter.format(time)}
            </h2>

            <p
              className={clsx(
                "text-center text-xs font-light",
                "text-white text-glow-sky-900 dark:text-glow-sky-500"
              )}
            >
              in vancouver
            </p>
          </div>
        </div>
      </div>

      <motion.div
        aria-hidden
        animate={{
          scale: [1, 1.1, 1.2, 1],
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="pointer-events-none absolute bottom-0 right-0 rounded-tl-full bg-white/10 pl-2 pt-2 md:pl-4 md:pt-4"
      >
        <motion.div>
          <div className="bottom-0 right-0 rounded-tl-full bg-white/20 pl-2 pt-2 md:pl-4 md:pt-4">
            <div className="bottom-0 right-0 rounded-tl-full bg-white/20 pl-2 pt-2 md:pl-4 md:pt-4">
              <motion.div
                initial={false}
                animate={{ scale: [1, 0.8, 1.1, 1, 1, 1, 2] }}
                transition={{
                  duration: 4,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="relative h-5 w-5 rounded-tl-full bg-yellow-200"
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export function Time() {
  const [time, setTime] = useState(() => new Date());
  const dayCount = daysUntilBirthday();
  const isBirthday = (() =>
    new Date().toISOString().slice(5, 10) === dob.toISOString().slice(5, 10))();
  const isNight = time.getHours() >= 17 || time.getHours() < 6;

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="col-span-6 grid shrink-0 grid-cols-2 md:grid-cols-1 gap-6 md:col-span-1 [&_>_div]:shrink-0">
      {isNight ? <Night time={time} /> : <Day time={time} />}

      <div className="flex items-center h-24 md:h-auto justify-center rounded-2xl bg-indigo-100 text-indigo-500 dark:bg-[#23224c] dark:text-indigo-400 p-3 md:p-0">
        {!isBirthday ? (
          <div className="text-center">
            <p className="text-xs">
              <span className="text-xl font-bold">{dayCount == 0 ? "1" : dayCount}</span> day(s)
              <br />
              until birthday
            </p>
          </div>
        ) : (
          <div className="text-center p-2">
            <p className="text-xs">
              <span className="text-2xl">🎉</span>
              <br />
              it's their birthday!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
