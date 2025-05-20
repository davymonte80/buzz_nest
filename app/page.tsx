//import Image from "next/image";

import { ThemeModeScript } from "flowbite-react";
import Link from "next/link";
export default function Home() {
  return (
    <>
      <head>
        <ThemeModeScript />
      </head>

      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <div className="flex flex-col gap-[32px]">
            <div className="flex flex-col gap-[16px]">
              <h2 className="text-[24px] sm:text-[32px] font-bold text-center">
                Welcome to Buzz Nest
              </h2>
              <p className="text-[16px] sm:text-[20px] text-center">
                Your one-stop destination for the latest in technology, gadgets,
                apps, traveling, finance, parenting, health, food, and
                lifestyle.
              </p>
            </div>

            <div className="flex flex-col gap-[16px]">
              <h2 className="text-[24px] sm:text-[32px] font-bold text-center">
                Explore Our Categories
              </h2>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/technology"
                  className="text-blue-500 hover:underline"
                >
                  Technology
                </Link>
                <Link href="/gadgets" className="text-blue-500 hover:underline">
                  Gadgets
                </Link>
                <Link href="/apps" className="text-blue-500 hover:underline">
                  Apps
                </Link>
                <Link
                  href="/traveling"
                  className="text-blue-500 hover:underline"
                >
                  Traveling
                </Link>
                <Link href="/finance" className="text-blue-500 hover:underline">
                  Finance
                </Link>
                <Link
                  href="/parenting"
                  className="text-blue-500 hover:underline"
                >
                  Parenting
                </Link>
                <Link href="/health" className="text-blue-500 hover:underline">
                  Health
                </Link>
                <Link href="/food" className="text-blue-500 hover:underline">
                  Food
                </Link>
                <Link
                  href="/lifestyle"
                  className="text-blue-500 hover:underline"
                >
                  Lifestyle
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
