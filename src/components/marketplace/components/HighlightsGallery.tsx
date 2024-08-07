import { FC } from "react";
import HighlightCard from "./HIghlightCard";

const mockHighlights = [
  {
    description:
      "The project commenced on May 20, 2019, and is certified by the Programme for the Endorsement of Forest Certification (PEFC).",
  },
  {
    description:
      "The project commenced on May 20, 2019, and is certified by the Programme for the Endorsement of Forest Certification (PEFC).",
  },
  {
    description:
      "The project commenced on May 20, 2019, and is certified by the Programme for the Endorsement of Forest Certification (PEFC).",
  },
  {
    description:
      "The project commenced on May 20, 2019, and is certified by the Programme for the Endorsement of Forest Certification (PEFC).",
  },
  {
    description:
      "The project commenced on May 20, 2019, and is certified by the Programme for the Endorsement of Forest Certification (PEFC).",
  },
  {
    description:
      "The project commenced on May 20, 2019, and is certified by the Programme for the Endorsement of Forest Certification (PEFC).",
  },
  {
    description:
      "The project commenced on May 20, 2019, and is certified by the Programme for the Endorsement of Forest Certification (PEFC).",
  },
  {
    description:
      "The project commenced on May 20, 2019, and is certified by the Programme for the Endorsement of Forest Certification (PEFC).",
  },
  {
    description:
      "The project commenced on May 20, 2019, and is certified by the Programme for the Endorsement of Forest Certification (PEFC).",
  },
];

const HighlightsGallery: FC = () => {
  return (
    <div className="text-white">
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockHighlights.map((highlight, index) => (
          <HighlightCard key={index} description={highlight.description} />
        ))}
      </div>
    </div>
  );
};

export default HighlightsGallery;
