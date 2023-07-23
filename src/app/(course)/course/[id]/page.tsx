"use client";
import CourseContents from "@/components/CourseContents";
import CourseTopics from "@/components/CourseTopics";
import { ICourseTopic } from "@/types/courseTopic";
import React, { useState } from "react";

interface PageParams {
  params: {
    id: string;
  };
}

const MODE = 'view';

const Course = ({ params }: PageParams) => {
  const [showCourseTopics, setShowCourseTopics] = useState(true);
  const [courseTopics] = useState<ICourseTopic[]>([]);
  return (
    <section className="w-full max-w-8xl mx-auto h-full flex flex-col">
      <div className="flex">
        {/* Left */}
        <CourseTopics
          courseTopics={courseTopics}
          showCourseTopics={showCourseTopics}
          setShowCourseTopics={setShowCourseTopics}
          mode={MODE}
        />

        {/* Right */}
        <div
          className={`${
            showCourseTopics ? "w-full md:w-9/12" : "w-full"
          }  ml-auto rounded mt-6`}
        >
          <CourseContents />
        </div>
      </div>
    </section>
  );
};

export default Course;
