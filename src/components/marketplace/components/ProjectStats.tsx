import { FC } from "react";

interface StatsItem {
  value: string;
  name: string;
}

interface ProjectStatsProps {
  stats: StatsItem[];
}

const ProjectStats: FC<ProjectStatsProps> = ({ stats }) => {
  return (
    <div className="mb-20 mt-[106px] flex flex-col gap-4 px-16">
      <div className="flex justify-center rounded-[20px] bg-[#061A11]">
        <ul className="flex flex-col px-12 py-5 text-center text-white md:flex-row">
          {stats.map((item, index) => (
            <li key={index} className="flex flex-col items-center md:flex-row">
              <div className="flex flex-col items-center gap-1">
                <span className="font-sans text-xl font-bold lg:text-2xl">
                  {item.value}
                </span>
                <span className="font-sans text-xs font-medium lg:text-base">
                  {item.name}
                </span>
              </div>
              {index < stats.length - 1 && (
                <div
                  className="my-2 border-b border-[#414141] md:mx-5 md:my-0 md:border-b-0 md:border-l lg:mx-10"
                  style={{
                    height: index < stats.length - 1 ? "100%" : "0px",
                    width: "1px",
                    display: "block",
                  }}
                ></div>
              )}
            </li>
          ))}
        </ul>
      </div>
      <p className="px-1 text-center font-sans text-[15px] font-normal text-white md:px-11">
        The project commenced on May 23, 2023, and is currently in progress for
        certification. It encompasses a land area of 61 hectares and features
        significant biodiversity element, including a wetlands, meadows, hedges,
        and a stream. There are currently no social action initiatives
        associated with the project. Additionally, the area is open to the
        public from April 1 to September 1.
      </p>
    </div>
  );
};

export default ProjectStats;
