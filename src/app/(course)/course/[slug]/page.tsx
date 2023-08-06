"use client";
import CourseContents from "@/components/CourseContents";
import CourseContentsTabs from "@/components/CourseContents.Tabs";
import CourseDetails from "@/components/CourseDetails";
import CourseLandingPage from "@/components/CourseLanding.Page";
import CourseTopics from "@/components/CourseTopics.Bar";
import { setCourseForView, setCurrentCourseTopicForView, setEnrollState } from "@/redux/features/course-view-slice";
import { AppDispatch } from "@/redux/store";
import { ICourse } from "@/types/course";
import { v1MainEndpoint } from "@/utils/apiEndpoints";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams, useRouter  } from 'next/navigation'
import canBeParsedToInt from "@/utils/canBeParsedToInt";
import { useUser } from "@clerk/nextjs";
import { IEnrollState } from "@/types/enrollState";
import { ICourseTopic } from "@/types/courseTopic";
import { current } from "@reduxjs/toolkit";

interface PageParams {
  params: {
    slug: string;
  };
}

const MODE = "view";

const isValid = (topicId: number, enrollState: IEnrollState): boolean => {
  // check from the finishedId array

  // return finishedTopics.includes(topicId.toString())

  const currentTopic = enrollState.currentTopic as ICourseTopic

  console.log(topicId === currentTopic.topicID || enrollState.finishedTopics.includes(topicId.toString()))

  return (topicId === currentTopic.topicID || enrollState.finishedTopics.includes(topicId.toString()))
}

const Course = ({ params }: PageParams) => {

  const [showCourseTopics, setShowCourseTopics] = useState(true);

  const [isEnrolled, setIsEnrolled] = useState<'yes' | 'no' | 'loading'>('loading');

  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();


  const { user } = useUser()

  const searchParams = useSearchParams()
 
  const topicId = searchParams?.get('topicId')

  const { isLoading } = useQuery({
    queryKey: ["course", params.slug],
    queryFn: async () => {
      
      const { data } = await axios.get(`${v1MainEndpoint}/course/bySlug/${params.slug}`);
      
      const enrollState = await axios.get(`${v1MainEndpoint}/enrollState?user=${user?.id}&course=${data.data.id}`);

      return {
        course: data.data as ICourse,
        enrollState: enrollState.data,
      }
    },

    enabled: !!user?.id,

    onSuccess: (data) => {
      const { course, enrollState } = data;
      if(!enrollState.data) {
        router.push(`/course/${params.slug}`)

        setIsEnrolled('no')
      } else if(!topicId || !canBeParsedToInt(topicId) || !isValid(
        parseInt(topicId), enrollState.data)) {
        
        router.push(`/course/${params.slug}?topicId=${enrollState.data.currentTopic.topicID}`)
        dispatch(setCurrentCourseTopicForView(course.topics[enrollState.data.currentTopic.topicID - 1]))
        
        setIsEnrolled('yes')
      } else {
        dispatch(setCurrentCourseTopicForView(course.topics[parseInt(topicId) - 1]))

        setIsEnrolled('yes')
      }

      dispatch(setEnrollState(enrollState.data));
      dispatch(setCourseForView(course));
    },
    onError: (error) => {
      console.log("error", error);
    },
  });

  return (
    <section className="w-full max-w-8xl mx-auto h-full flex flex-col">
        {(isLoading || isEnrolled === 'loading') ? (
          <div className="flex items-center justify-center">
            <span className="loading loading-infinity loading-lg"></span>
          </div>
        ) : (
          isEnrolled === 'yes' ? <div className="flex">
            {/* Left */}
            <CourseTopics
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
              <CourseContentsTabs />
            </div>
          </div> : <CourseLandingPage />
        )}
      </section>
  );
};

export default Course;