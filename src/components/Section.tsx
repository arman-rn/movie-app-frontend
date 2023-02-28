import { memo } from "react";
import { useGetShowsQuery } from "../services/API";

import MoviesSlides from "./MoviesSlides";
import { SkelatonLoader } from "./Loader";
import Error from "./Error";

import { sectionPropsType } from "../types";
import { getErrorMessage } from "../utils/helper";

const Section = ({
  title,
  category,
  classes,
  type,
  id,
}: sectionPropsType) => {
  const { data, isLoading, isError, error } = useGetShowsQuery({
    category,
    type,
    page: 1,
    id,
  });

  const errorMessage = isError ? getErrorMessage(error) : "";

  const sectionClass = `md:py-6 sm:py-[20.75px] xs:py-[18.75px] py-[16.75px] font-nunito ${classes}`;

  return (
    <section className={sectionClass}>
      <div
        className={`flex flex-row justify-between items-center sm:mb-6 mb-[22.75px]`}
      >
        <h3 className="sm:text-[22.25px] xs:text-[20px] text-[18.75px] dark:text-gray-50 sm:font-bold font-semibold relative">
          <span>{title}</span>
          <div className="line" />
        </h3>
      </div>
      {isLoading ? (
        <SkelatonLoader />
      ) : isError ? (
        <Error error={String(errorMessage)} classes="h-[250px] text-[18px]" />
      ) : (
        <MoviesSlides movies={data.results} category={category} />
      )}
    </section>
  );
};

export default memo(Section, (prevProps, newProps) => {
  return prevProps.title === newProps.title;
});
