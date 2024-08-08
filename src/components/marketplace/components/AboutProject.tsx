import { FC } from "react";

const companyInfo = [
  { value: "May 20, 2019", name: "Project start date" },
  { value: "PEFC", name: "Certification" },
  { value: "8.947 ha", name: "Land area " },
  { value: "none", name: "Social action" },
  { value: "Wetland, ZNIEFF type II", name: "Biodiversity features" },
  { value: "01/04 to 01/09", name: "Open to the public" },
];

const AboutProject: FC = () => {
  return (
    <div className="flex flex-col-reverse justify-center gap-12 md:flex-row">
      <div className="flex w-full items-center justify-center md:w-1/2">
        <div
          className="h-96 w-full rounded-lg md:h-full"
          style={{
            backgroundImage: "url('/images/map-image.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            aspectRatio: "16 / 9",
          }}
        />
      </div>

      <div className="w-full md:w-1/2">
        <h3 className="font-sans text-2xl font-bold text-white md:text-3xl">
          Sample Project Name
        </h3>
        <div className="mt-4 flex flex-col gap-4">
          <p className="text-lg text-white">
            Located in Brittany, our Ploërdut forest is made up of four
            individual plots that we acquired gradually over a period of time.
          </p>
          <p className="text-lg font-medium text-white">
            On Ploërdut 1 a small area of{" "}
            <a
              href="https://ecotree.green/en/offers/species/douglas-fir"
              className="text-white underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Douglas firs
            </a>{" "}
            were preserved. However, the previous owner cleared the rest of the
            area. Thus, we are developing a new uneven-aged forest comprising
            multiple tree species such as{" "}
            <a
              href="https://ecotree.green/en/offers/species/red-oak"
              className="text-white underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Red Oak
            </a>
            ,{" "}
            <a
              href="https://ecotree.green/en/offers/species/chestnut"
              className="text-white underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Chestnut
            </a>
            , and{" "}
            <a
              href="https://ecotree.green/en/offers/species/scots-pine"
              className="text-white underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Scots pine
            </a>
            .
          </p>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-6">
          {companyInfo.map((info, index) => (
            <div
              key={index}
              className="flex flex-col gap-1 rounded-lg bg-[#061A11] px-3 py-4"
            >
              <span className="font-sans text-xs font-medium text-[#949494]">
                {info.name}
              </span>
              <span className="font-sans text-lg font-medium text-white">
                {info.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutProject;
