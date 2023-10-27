"use client";

import { TbFilterSearch } from "react-icons/tb";
import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/Dialog";
import React, { useState } from "react";
import { Input } from "../ui/Input";
import { useRouter, useSearchParams } from "next/navigation";
import { Combobox } from "../ui/Combobox";
import { courseCategories, courseLevels, languages } from "@/constants/course";
import SelectedTopics from "./SelectedTopics";

const CourseSearchDialog = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const searchTermFromParams = searchParams?.get("searchTerm") ?? "";
  const [searchTerm, setSearchTerm] = useState<string>(searchTermFromParams);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  const constructUrlAndSearch = () => {
    let url = "";

    if (searchTerm !== "") url += `?searchTerm=${searchTerm}`;

    if (selectedCategories.length) {
      url += url.length ? "&" : "?";
      url += `category=${selectedCategories.join(",")}`;
    }
    if (selectedLevels.length) {
      url += url.length ? "&" : "?";
      url += `level=${selectedLevels.join(",")}`;
    }
    if (selectedLanguages.length) {
      url += url.length ? "&" : "?";
      url += `language=${selectedLanguages.join(",")}`;
    }
    router.push(url);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="flex space-x-2">
          <TbFilterSearch className="w-6 h-6" />
          <p className="font-semibold">Search & Filter</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-slate-100 dark:bg-gray-950 border border-slate-300 dark:border-gray-800 max-w-2xl w-full">
        <label htmlFor="text" className="font-bold">
          Search Courses
        </label>
        <Input
          defaultValue={searchTerm}
          placeholder="Search Courses"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTermFromParams !== "" && (
          <React.Fragment>
            <label htmlFor="text" className="font-bold">
              Searching for
            </label>
            <p className="px-2 dark:bg-slate-100 bg-gray-950 w-fit rounded text-slate-100 dark:text-gray-950 font-semibold text-md">
              {searchTermFromParams}
            </p>
          </React.Fragment>
        )}

        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-1">
          <div className="w-full">
            <Combobox
              limit={3}
              title="Category"
              list={courseCategories}
              currentValues={selectedCategories}
              setCurrentValuesFunction={(categories: string[]) => {
                setSelectedCategories([...selectedCategories, ...categories]);
              }}
            />
            <SelectedTopics
              selectedTopics={selectedCategories}
              mode="creation"
              setSelectedTopics={setSelectedCategories}
            />
          </div>
          <div className="w-full">
            <Combobox
              limit={3}
              title="Level"
              list={courseLevels}
              currentValues={selectedLevels}
              setCurrentValuesFunction={(levels: string[]) => {
                setSelectedLevels([...selectedLevels, ...levels]);
              }}
            />
            <SelectedTopics
              selectedTopics={selectedLevels}
              mode="creation"
              setSelectedTopics={setSelectedLevels}
            />
          </div>
          <div className="w-full">
            <Combobox
              limit={3}
              title="Language"
              list={languages}
              currentValues={selectedLanguages}
              setCurrentValuesFunction={(languages: string[]) => {
                setSelectedLanguages([...selectedLanguages, ...languages]);
              }}
            />
            <SelectedTopics
              selectedTopics={selectedLanguages}
              mode="creation"
              setSelectedTopics={setSelectedLanguages}
            />
          </div>
        </div>

        <DialogClose className="w-full">
          <Button onClick={constructUrlAndSearch} className="w-full">
            Search
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default CourseSearchDialog;
