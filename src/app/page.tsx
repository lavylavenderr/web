"use client";

import Link from "next/link";
import { Time } from "@/components/time";
import { cn } from "@/lib/utils";
import {
  SiCentos,
  SiCloudflare,
  SiCss3,
  SiDiscord,
  SiDocker,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiLaravel,
  SiLinux,
  SiMarkdown,
  SiPhp,
  SiReact,
  SiRust,
  SiSpotify,
  SiUbuntu,
  SiUnsplash,
  SiVuedotjs,
} from "react-icons/si";
import { discordId, spotifyProfileLink } from "@/lib/constants";
import { useLanyard } from "react-use-lanyard";
import { FiArrowUpRight } from "react-icons/fi";
import { FaGlobe } from "react-icons/fa";

export default function Home() {
  const lanyard = useLanyard({ userId: discordId, socket: true });

  return (
    <div className="space-y-6">
      <div className="mx-auto grid max-w-3xl grid-cols-6 gap-6 px-6 pt-16 select-none">
        <div className="col-span-6 flex h-56 md:h-48 flex-col justify-between overflow-hidden rounded-2xl p-4 md:px-8 md:py-5 bg-purple-200 dark:border-purple-500 dark:bg-purple-500/20 dark:shadow-none dark:backdrop-blur-2xl md:col-span-6">
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
              engineer specializing in TypeScript and Rust.
            </h1>
          </div>
        </div>
        <Link
          href={`https://discord.com/users/${discordId}`}
          className={cn(
            "col-span-6 h-52 dark:shadow-none hover:rotate-2 dark:backdrop-blur-2xl md:col-span-2 rounded-2xl hover:scale-95 transition-all",
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
        </Link>
        <Time />
        <Link
          href={
            lanyard.status?.listening_to_spotify
              ? `https://open.spotify.com/track/${lanyard.status?.spotify?.track_id}`
              : spotifyProfileLink
          }
          target="_blank"
          className="col-span-6 h-52 hover:rotate-2 dark:shadow-none dark:backdrop-blur-2xl md:col-span-3 rounded-2xl hover:scale-95 transition-all cursor-pointer"
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
            <h2 className="font-semibold text-lg">
              {lanyard.status?.listening_to_spotify
                ? `${lanyard.status?.spotify?.song} by ${lanyard.status?.spotify?.artist}`
                : `Nothing :3`}
            </h2>
          </span>
        </Link>
        <Link
          href="https://whimsyfoxphotography.com"
          target="_blank"
          className="col-span-6 h-52 hover:rotate-2 dark:shadow-none dark:backdrop-blur-2xl md:col-span-4 rounded-2xl hover:scale-95 transition-all cursor-pointer"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-20"
          >
            <img
              src={"/photo1.jpg"}
              alt="Photo for photography card"
              className="absolute inset-0 h-full w-full object-cover object-center invert dark:brightness-[0.7] dark:invert-0 rounded-2xl"
            />

            <span
              aria-hidden
              className="absolute inset-0 bg-gradient from-neutral-900/70 to-neutral-900/20 dark:bg-neutral-900/50"
            />
          </span>
          <FaGlobe className="aboslute text-white text-3xl mt-5 ml-5" />

          <span className="absolute bottom-5 left-5 text-glow-white">
            <div className="flex">
              <h1 className="font-semibold text-lg">
                Check out my photography portfolio!
              </h1>{" "}
              <FiArrowUpRight className="mt-[6px]" size={18} />
            </div>
          </span>
        </Link>
        {/* https://github.com/alii/website/blob/837e81d714400cca69ba693067a50cf6f1680eb4/src/pages/index.tsx#L297 */}
        <div className="col-span-6 flex itms-center justify-center rounded-2xl bg-purple-500/20 p-6 text-glow-white md:col-span-2 backdrop-blur-2xl">
          <div className="grid w-full grid-cols-4 gap-4 [&>svg]:w-full [&>svg]:text-center">
            <SiJavascript size={24} />
            <SiHtml5 size={24} />
            <SiCss3 size={24} />
            <SiReact size={24} />
            <SiLaravel size={24} />
            <SiPhp size={24} />
            <SiGithub size={24} />
            <SiMarkdown size={24} />
            <SiGit size={24} />
            <SiUbuntu size={24} />
            <SiCloudflare size={24} />
            <SiVuedotjs size={24} />
            <SiDocker size={24} />
            <SiCentos size={24} />
            <SiLinux size={24} />
            <SiRust size={24} />
          </div>
        </div>
        <Link
          href="https://github.com/lavylavenderr"
          target="_blank"
          rel="noopener noreferrer"
          className="flex hover:scale-95 hover:rotate-2 transition-all h-full items-center justify-center rounded-2xl text-4xl bg-purple-400/20 backdrop-blur-2xl text-white col-span-2"
        >
          <span className="sr-only">GitHub</span>
          <span className="transform-gpu text-2xl transition duration-500 group-hover:scale-[1.3]">
            <SiGithub size={62} />
          </span>
        </Link>
        <div className="h-auto col-span-6 space-y-2 rounded-2xl bg-purple-900/20 p-6 backdrop-blur-2xl md:col-span-4">
          <h2 className="font-semibold text-glow-white">About Me 🦊</h2>

          <p>
            I'm a relatively simple person, I got into coding around the age of
            14! My first ever Discord.JS bot, yikes that was a disaster. A few
            fun facts about me is and I also love to read (I'm currently reading
            Warrior Cats!), shoot photos and I write stories from time to time!
            Besides that, you can usually catch me hanging around my usual
            friend group.
          </p>
        </div>

        <div className="col-span-6 border-gray-500 bg-gray-500/20 backdrop-blur-2xl rounded-2xl space-y-1 p-6">
          <h1 className="font-semibold text-glow-white">
            all my projects - present and past
          </h1>
          <div className="space-y-2 pt-2">
            <Link
              href="https://relatio.cc"
              className="-mx-6 block px-6 py-2 hover:bg-gray-600/10 transition-all text-white"
            >
              <h2>Relatio</h2>
              <p className="line-clamp-2">
                {" "}
                A scalable solution for Roblox HR Management.
              </p>
            </Link>
            <Link
              href="https://fsphotos.cc"
              className="-mx-6 block px-6 py-2 hover:bg-gray-600/10 transition-all text-white"
            >
              <h2>FSPhotos</h2>
              <p className="line-clamp-2">
                {" "}
                A platform to view and share flight simulation photos with
                fellow enthusiasts.
              </p>
            </Link>
            <Link
              href="https://unnamed.engineering"
              className="-mx-6 block px-6 py-2 hover:bg-gray-600/10 transition-all text-white"
            >
              <h2>Unnamed Engineering</h2>
              <p className="line-clamp-2">
                {" "}
                We're a global product studio composed of four teenage
                programmers.
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
