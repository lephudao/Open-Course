"use client";
import Image from "next/image";
import React from "react";
import { useTheme } from "next-themes";
import Paragraph from "../ui/Paragraph";
import LargeHeading from "../ui/LargeHeading";
import { Button } from "../ui/Button";
import GalaxyBg from "../ui/ThreeD/GalaxyBg";
import AnimatedHoverCard from "../ui/animation/AnimatedHoverCard";

const IntroPage = () => {
  const { theme } = useTheme();
  return (
    <main className="relative  overflow-x-hidden mb-24  w-full mx-auto">
      <GalaxyBg>
        <div className="flex flex-col items-center justify-center w-full">
          <LargeHeading className="underline decoration-rose-500 bg-transparent">
            What is It?
          </LargeHeading>

          <figure className="max-w-screen-md mx-auto text-center">
            <svg
              className="w-10 h-10 mx-auto mb-3 text-gray-400 dark:text-gray-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 14"
            >
              <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
            </svg>
            <blockquote className="text-gray-950 dark:text-slate-100 bg-transparent">
              <Paragraph className="font-bold">
                A platform where users can{" "}
                <span className="bg-rose-500 px-1">create courses</span> on a
                Topic by collecting{" "}
                <span className="bg-rose-500 px-1">free contents</span> from the
                internet and arranging them in a{" "}
                <span className="bg-rose-500 px-1">sequential manner</span> to
                share with others{" "}
                <span className="bg-rose-500 px-1">for free.</span>
              </Paragraph>
            </blockquote>
            <span className="inline-block h-1 w-10 rounded bg-rose-500 "></span>
            <figcaption className="flex items-center justify-center mt-6 space-x-3">
              <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
                <cite className="pr-3 font-medium text-gray-900 dark:text-white">
                  Zarif
                </cite>
                <cite className="pl-3 text-sm text-gray-500 dark:text-gray-400">
                  Creator
                </cite>
              </div>
            </figcaption>
          </figure>

          <AnimatedHoverCard>
            <div className="my-4">
              <Image
                className=""
                src={
                  theme === "dark"
                    ? "/whatisit-dark.png"
                    : "/whatisit-light.png"
                }
                alt="banner"
                width={800}
                height={800}
              />
            </div>
          </AnimatedHoverCard>

          <Button
            variant="generalRose"
            className="bg-rose-500 dark:bg-rose-500 mb-1 hover:bg-rose-500 dark:hover:bg-rose-500 focus:ring-offset-0 focus:ring-0"
          >
            Watch a Video?
          </Button>
        </div>
      </GalaxyBg>
    </main>
  );
};

export default IntroPage;
