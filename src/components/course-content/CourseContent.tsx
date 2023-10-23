"use client";

import { ICourseTopic } from "@/types/courseTopic";
import React, { useState } from "react";
import LargeHeading from "../ui/LargeHeading";
import createEmbeddableUrls from "@/utils/getEmbedableUrl";
import CourseContentFullscreenDialog from "./CourseContentFullscreen.Dialog";
import CourseContentUrl from "./CourseContentUrl";
import { FiLink } from "react-icons/fi";
import { MdOutlineVideoLibrary } from "react-icons/md";

function CourseContent({ courseTopic }: { courseTopic: ICourseTopic }) {
  const [urlStatus, setUrlStatus] = useState<
    "loading" | "available" | "unavailable"
  >("available");

  const [showUrl, setShowUrl] = useState<boolean>(false);

  return (
    <div className={`mx-auto w-[100%] h-[45vh] md:h-[80vh]`}>
      <div className="flex items-center justify-end space-x-8">
        <div onClick={() => setShowUrl(!showUrl)}>
          {!showUrl ? (
            <div className="flex space-x-1 items-center cursor-pointer">
              <FiLink />
              <p>Link</p>
            </div>
          ) : (
            <div className="flex space-x-1 items-center cursor-pointer">
              <MdOutlineVideoLibrary />
              <p>Content</p>
            </div>
          )}
        </div>
        <CourseContentFullscreenDialog
          url={courseTopic.versions[courseTopic.versions.length - 1].url}
        />
      </div>
      {!showUrl ? (
        <iframe
          src={createEmbeddableUrls(
            courseTopic.versions[courseTopic.versions.length - 1].url
          )}
          className="border-[3px] border-rose-500 rounded "
          width="100%"
          height="100%"
          title="Embedded Website"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <CourseContentUrl
          url={courseTopic.versions[courseTopic.versions.length - 1].url}
        />
      )}
    </div>
  );
}

export default CourseContent;
