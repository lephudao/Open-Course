"use client";

import React from "react";
import LargeHeading from "./ui/LargeHeading";
import CourseCard from "./Course.Card";
import SwiperComp from "./ui/SwiperComp";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { v1MainEndpoint } from "@/utils/apiEndpoints";
import { ICourse } from "@/types/course";
import CourseSkeleton from "./Skeletons/Course.Skeleton";
import { Button, buttonVariants } from "./ui/Button";
import Link from "next/link";

const Courses = () => {
  const { data: courses, isLoading } = useQuery({
    queryKey: ["course"],
    queryFn: async () => {
      const { data } = await axios.get(`${v1MainEndpoint}/course`);

      return data.data.map(async (course: ICourse, index: number) => {
        return <CourseCard course={course} key={index} />;
      });
    },
  });

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-x-hidden w-full max-w-7xl mx-auto">
      <LargeHeading className="underline decoration-rose-500">
        Courses
      </LargeHeading>
      <div className="container px-5 py-24 pb-12 mx-auto">
        <div className="flex flex-wrap -m-4"></div>
        {isLoading ? (
          <div className="flex flex-wrap justify-between">
            {new Array(3).fill(9).map((_, index) => (
              <CourseSkeleton key={index} />
            ))}
          </div>
        ) : (
          <SwiperComp comps={courses} slidesPerView={0} />
        )}
      </div>

      <Link
        href="/courses"
        className={`${buttonVariants({
          variant: "generalRose",
        })} bg-rose-500 dark:bg-rose-500 mb-1 hover:bg-rose-500 dark:hover:bg-rose-500 focus:ring-offset-0 focus:ring-0`}
      >
        More Courses?
      </Link>
    </main>
  );
};

export default Courses;
