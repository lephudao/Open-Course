'use client'
import React from "react";
import CourseTopic from "./CourseTopic";
import CourseProgressBar from "./CourseProgress.Bar";
import Paragraph from "./ui/Paragraph";
import { ICourseTopic } from "@/types/courseTopic";

const CourseTopicsSidebar = ({ courseTopics, setCurrentCourseTopic,  mode }: { courseTopics: ICourseTopic[], setCurrentCourseTopic: React.Dispatch<React.SetStateAction<ICourseTopic>>, mode: 'creation' | 'edit' | 'view' }) => {
  return (
    <div className={`hidden md:inline w-3/12 fixed rounded mt-8 min-h-screen`}>
      <div className={`overflow-y-auto ${mode === 'view' ? 'h-[70vh]' : 'h-[78vh]'} m-4 ml-0 lg:ml-4`}>
        <Paragraph className="mx-2 font-bold">Course Topics</Paragraph>
        {
          courseTopics.map((courseTopic: ICourseTopic, index: number) => {
            return (
              <div key={index} onClick={() => setCurrentCourseTopic(courseTopic)}>
                <CourseTopic  index={index + 1} title={courseTopic.title} description="hi how are you?" mode={mode} />
              </div>
            )
          })
        }
      </div>
      {
        mode === 'view' && <CourseProgressBar completed={6} outOf={11} styles="p-2 m-4 mx-6" />
      }
    </div>
  );
};

export default CourseTopicsSidebar;
