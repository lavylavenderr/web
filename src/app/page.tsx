"use client";

import { cn } from "@/lib/utils";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SiDiscord, SiSpotify } from "react-icons/si";
import { FiArrowRight } from "react-icons/fi";
import Link from "next/link";
import { discordId, spotifyProfileLink } from "@/lib/constants";
import { useLanyard } from "react-use-lanyard";

export default function Home() {
  const lanyard = useLanyard({ userId: discordId, socket: true });

  return (
    <div className="space-y-6">
      <div className="mx-auto grid max-w-3xl grid-cols-6 gap-6 px-6 pt-16">
        <div className=" col-span-6 flex h-[15rem] md:h-52 flex-col justify-between overflow-hidden rounded-2xl p-4 md:px-8 md:py-5 bg-purple-200 dark:border-purple-500 dark:bg-purple-500/20 dark:shadow-none dark:backdrop-blur-2xl md:col-span-6">
          <div className="space-y-1 p-2">
            <h1 className="text-lg font-semibold tracking-wide text-purple-900 dark:text-purple-300 dark:text-glow-purple-500/50">
              Hi there! My name is
            </h1>
            <h1 className="text-4xl font-bold tracking-tighter text-purple-900 dark:text-purple-300 dark:text-glow-purple-500/50 pb-3">
              Lavender
            </h1>
            <h1 className="text-sm md:text-md font-semibold tracking-wide text-purple-900 dark:text-purple-300 dark:text-glow-purple-500/50">
              I'm a Canadian furry exploring the interwebs with an interest in
              silly little proejcts from time to time! I'm also a full-stack
              engineer specializing in TypeScript and Rust. (P.S. Check out my{" "}
              <Link
                href="https://whimsyfoxphotography.com"
                className="underline"
                target="_blank"
              >
                photography portfolio!
              </Link>
              )
            </h1>
          </div>
        </div>
        <div
          className={cn(
            "col-span-6 h-56 dark:shadow-none dark:backdrop-blur-2xl md:col-span-2 rounded-2xl",
            {
              online: "text-glow-white bg-green-600",
              idle: "bg-orange-400 text-glow-orange-50",
              dnd: "bg-red-500 text-glow-red-100 dark:bg-red-600",
              offline: "bg-blurple text-white/90",
            }[lanyard.status?.discord_status ?? "offline"]
          )}
        >
          <div className="h-full space-y-2 mt-10">
            <SiDiscord className="flex mx-auto w-24 h-24" />
            <h1 className="text-white text-lg font-semibold text-center">
              @lavylavender
            </h1>
          </div>
        </div>
        <Link
          href={
            lanyard.status?.listening_to_spotify
              ? `https://open.spotify.com/track/${lanyard.status?.spotify?.track_id}`
              : spotifyProfileLink
          }
          target="_blank"
          className="col-span-6 h-56 dark:shadow-none dark:backdrop-blur-2xl md:col-span-4 rounded-2xl hover:scale-105 transition-all cursor-pointer"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-20"
          >
            <img
              src={lanyard.status?.spotify?.album_art_url ?? "/bus.jpg"}
              alt="Album art for now playing song"
              className="absolute inset-0 h-full w-full object-cover object-center invert dark:brightness-[0.7] dark:invert-0 rounded-2xl"
            />

            <span
              aria-hidden
              className="absolute inset-0 bg-gradient from-neutral-900/70 to-neutral-900/20 dark:bg-neutral-900/50"
            />
          </span>

          <SiSpotify className="aboslute text-3xl mt-5 ml-5" />

          <span className="absolute bottom-5 left-5 text-glow-white">
            <h1 className="font-medium">Listening to:</h1>
            <h2 className="font-semibold text-2xl">
              {lanyard.status?.listening_to_spotify
                ? `${lanyard.status?.spotify?.song} by ${lanyard.status?.spotify?.artist}`
                : `Nothing :3`}
            </h2>
          </span>
        </Link>
      </div>
    </div>
  );
}
