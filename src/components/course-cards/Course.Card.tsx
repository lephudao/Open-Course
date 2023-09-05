"use client";

/* eslint-disable @next/next/no-img-element */
import React from "react";
import Paragraph from "../ui/Paragraph";
import { ICourse } from "@/types/course";
import { useTheme } from "next-themes";
import SelectedTopics from "../course-details/SelectedTopics";
import { formatSelectedLevels } from "@/utils/formatSelectedLevels";
import { Button, buttonVariants } from "../ui/Button";
import {
  PiChatsDuotone,
  PiUsersThreeDuotone,
  PiShootingStarDuotone,
} from "react-icons/pi";
import { useRouter } from "next/navigation";
import ContentLogos from "../course-content/ContentLogos";
import calculateAvgRating from "@/utils/calculateAvgRating";
import { IUser } from "@/types/user";
import BlurredImage from "../ui/BlurredImage";
import formatDate from "@/utils/formatDate";
import getLastUpdatedTopicDate from "@/utils/getLastUpdatedTopicDate";
import courseDurationCalculator from "@/utils/courseDurationCalculator";
import Link from "next/link";

const CourseCard = ({ course }: { course: ICourse }) => {
  const { theme } = useTheme();

  const router = useRouter();

  const creator = course.creator as IUser;

  const generatedBanner = `/api/generateBanner?courseName=${
    course.title
  }&theme=${theme}&
  &topics=${course.categories ? course.categories.join("  ") : ""}
  &creator=${creator.attributes?.first_name ?? ""}`;

  return (
    <div className="p-4">
      <div className="h-full border-2 border-slate-300 dark:border-gray-800 rounded-lg overflow-hidden">
        <BlurredImage
          src={generatedBanner}
          alt="blog"
          className="lg:h-48 md:h-36 w-full object-cover object-center"
        />
        <div className="p-6">
          <div className="flex justify-between items-center">
            <h2 className="tracking-widest text-xs title-font font-bold text-gray-500 truncate">
              By{" "}
              <span className="text-rose-500">
                {creator.attributes.first_name ?? ""}
              </span>
            </h2>
            <p className="text-slate-600 dark:text-gray-600 text-sm font-semibold mb-1">
              {formatDate(getLastUpdatedTopicDate(course.topics))}
            </p>
          </div>
          <Paragraph
            size="default"
            className="font-bold underline decoration-rose-500 decoration-2 truncate"
          >
            {course.title}
          </Paragraph>

          <SelectedTopics
            mode="view"
            selectedTopics={formatSelectedLevels(course.levels)}
          />

          <div
            className="w-full max-w-5xl mx-auto"
            style={{
              borderTop: "2px dashed #f43f5e",
            }}
          />

          <SelectedTopics mode="view" selectedTopics={course.languages} />

          <div className="flex justify-between">
            <ContentLogos topics={course.topics} withDuration={true} />
            <p className="text-gray-500 font-semibold">
              {courseDurationCalculator(course.topics)}
            </p>
          </div>

          <div className="flex justify-end text-gray-500 items-center space-x-2 mt-1">
            <div className="flex space-x-1 items-center">
              <PiShootingStarDuotone className="w-6 h-6" />
              <p className="font-semibold text-md">
                {calculateAvgRating(course.ratings ?? [])}
                {" ("}
                {(course.ratings ?? []).length}
                {")"}
              </p>
            </div>
            <p className="font-semibold text-lg text-slate-300 dark:text-gray-800">
              |
            </p>
            <div className="flex space-x-1 items-center">
              <PiUsersThreeDuotone className="w-6 h-6" />
              <p className="font-semibold text-md">
                {course.enrolledUsers.length}
              </p>
            </div>
            <p className="font-semibold text-lg text-slate-300 dark:text-gray-800">
              |
            </p>
            <div className="flex space-x-1 items-center">
              <PiChatsDuotone className="w-6 h-6" />
              <p className="font-semibold text-md">
                {course.enrolledUsers.length}
              </p>
            </div>
          </div>
          <Link
            href={`course-landing/${course.slug}`}
            className={`${buttonVariants({ variant: "default" })} w-full mt-3`}
          >
            Enroll
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;