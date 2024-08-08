import { FC } from "react";

const companyInfo = [
  { value: "May 23, 2023", name: "Project start date" },
  { value: "(In progress)", name: "Certification" },
  { value: "61 ha", name: "Land area " },
  { value: "none", name: "Social action" },
  { value: "Wetland - meadow - hedge - stream", name: "Biodiversity features" },
  { value: "01/04 to 01/09", name: "Open to the public" },
];

const AboutProject: FC = () => {
  return (
    <div className="flex flex-col-reverse justify-center gap-12 md:flex-row">
      <div className="flex w-full items-center justify-center md:w-1/2">
        <div
          className="h-96 w-full rounded-lg md:h-full"
          style={{
            backgroundImage: "url('/images/map-image.svg')",
            backgroundPosition: "center",
            backgroundColor: "#E0EBE1",
            backgroundSize: "cover",
            aspectRatio: "16 / 9",
          }}
        />
      </div>

      <div className="w-full md:w-1/2">
        <h3 className="font-sans text-2xl font-bold text-white md:text-3xl">
          Peyrat-de-Bellac Forest
        </h3>
        <div className="mt-4 flex flex-col gap-4">
          <p className="text-lg text-white">
            Located in the Nouvelle-Aquitaine in central France, the
            Peyrat-de-Bellac forest stands out for its rich biodiversity. This
            land, which we acquired in May 2023, is home to a unique ecosystem
            of preserved meadows and ancient hedgerows. These wet meadows are
            managed sustainably, encouraging their specific flora. As crucial
            structural elements, the hedgerows are carefully maintained to
            support the local fauna. The aim is to afforest only a part of the
            property, thus preserving an open environment. Today, the forest is
            dominated by{" "}
            <a
              href="https://ecotree.green/en/species/4"
              className="text-white underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              sessile oaks
            </a>
            .The Peyrat-de-Bellac forest has another unique feature: it is home
            to the plant 'Galium debile', slender marsh-bedstraw, an endangered
            species in the Limousin region. This rare plant thrives on the banks
            of streams on unwooded plots of land.
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
