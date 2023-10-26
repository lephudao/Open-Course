import React from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { PiSunDuotone } from "react-icons/pi";
import { PiMoonStarsDuotone } from "react-icons/pi";
import Link from "next/link";
import AvatarDropdown from "./Avatar.Dropdown";
import { Button } from "../ui/Button";
import Paragraph from "../ui/Paragraph";
import routeElements from "@/constants/navBar";
import ElementsDropdown from "./Elements.Dropdown";
import { signIn, signOut, useSession } from "next-auth/react";
import { Skeleton } from "../ui/Skeleton";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/Menu.Bar";

const GeneralNavbar = () => {
  const styles = {
    icon: `h-8 w-8 cursor-pointer`,
    menuBarItems:
      "cursor-pointer hover:bg-slate-200 hover:dark:bg-gray-800 font-semibold",
  };

  const session = useSession();

  const { theme, setTheme } = useTheme();

  return (
    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
      {theme ? (
        <Link href="/" className="flex items-center space-x-1">
          <Image
            src={theme === "dark" ? "/dark1.png" : "/light1.png"}
            priority
            quality={100}
            height="100"
            width="100"
            alt="logo"
            className="h-16 w-16"
          />
          <Paragraph className="px-2 font-semibold rounded bg-gray-950 text-slate-100 dark:text-gray-950 dark:bg-slate-100">
            Beta
          </Paragraph>
        </Link>
      ) : (
        <div className="h-16 w-16"></div>
      )}

      <div className="flex md:order-2 items-center justify-center space-x-2">
        {/* Theme */}
        <div
          onClick={() =>
            theme === "dark" ? setTheme("light") : setTheme("dark")
          }
        >
          {theme === "dark" ? (
            <PiSunDuotone className={styles.icon} />
          ) : (
            theme && <PiMoonStarsDuotone className={styles.icon} />
          )}
        </div>

        {session.status !== "loading" ? (
          session.data?.user ? (
            <AvatarDropdown />
          ) : (
            <Button onClick={() => signIn()}>login</Button>
          )
        ) : (
          <Skeleton className="rounded-full h-12 w-12" />
        )}

        {/* Elements in Mobile view */}
        <ElementsDropdown />
      </div>

      {/* Elements */}
      <div
        className="mt-2 items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
        id="navbar-cta"
      >
        <ul className="flex flex-col font-lg font-bold p-4 md:p-0 mt-4  md:flex-row md:space-x-8 md:mt-0">
          {routeElements.map((route) => (
            <li key={route.name}>
              {route.name === "Create" ? (
                <Menubar>
                  <MenubarMenu>
                    <MenubarTrigger className="!bg-transparent">
                      <p className="text-lg font-bold mb-4 block py-2 pl-3 pr-4 rounded text-gray-900 dark:text-slate-100 md:hover:text-rose-500 md:p-0 md:dark:hover:text-rose-500">
                        Create
                      </p>
                    </MenubarTrigger>
                    <MenubarContent className="bg-slate-100 mx-2 dark:bg-gray-950 border-2 border-slate-200 dark:border-gray-800 rounded">
                      <MenubarItem className={styles.menuBarItems}>
                        <Link href="/course-creation">Course</Link>
                      </MenubarItem>
                      <MenubarSeparator />
                      <MenubarItem className={styles.menuBarItems}>
                        <Link href="/roadmap-creation">Roadmap</Link>
                      </MenubarItem>
                    </MenubarContent>
                  </MenubarMenu>
                </Menubar>
              ) : (
                <Link
                  href={route.redirectTo}
                  className="block py-2 pl-3 pr-4 rounded text-gray-900 dark:text-slate-100 md:hover:text-rose-500 md:p-0 md:dark:hover:text-rose-500"
                >
                  {route.name}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GeneralNavbar;