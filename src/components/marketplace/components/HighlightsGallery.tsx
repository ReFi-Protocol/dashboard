import { FC } from "react";
import HighlightCard from "./HIghlightCard";

const mockHighlights = [
  {
    description:
      "The Western Red Cedar (Thuja plicata) is a coniferous species from northwestern North America introduced to Europe in the second half of the 19th century. It is often associated with Douglas fir in the lush forests of the North Pacific coast or along streams and swamps. The Amerindians used its soft, light, resistant and rotproof wood to build totems, houses and canoes. Today, cedar is cultivated as an ornamental tree, mainly for hedging and less commonly used during reforestation.",
    imageUrl:
      "https://bocdn.ecotree.green/essence/0001/03/f8a6877b2887051a0576fcfcac134244c2810f73.jpeg?d=960x540",
    link: "https://ecotree.green/en/offers/56-morbihan/ploerdut-forest-5/red-cedar/5384",
  },
  {
    description:
      "Sessile oak (Quercus petraea). Some call it the king of trees: the Oak is an imposing tree common in our forests and gardens. A multiole-species tree, Quercus is present in all regions of France. Depending on the species, the Oak can be a tree over 35 m high. The ones usually found in parks are 15-20 m high. The Oak is a tree capable of living for several centuries.",
    imageUrl:
      "https://bocdn.ecotree.green/essence/0001/03/29975171525cffa6ac400a830e26cf86373eb387.jpeg?d=960x540",
    link: "https://ecotree.green/en/offers/72-sarthe/ruille-forest/sessile-oak/5212",
  },
  {
    description:
      "The Common Beech (Fagus sylvatica), also known as the European Beech, is a deciduous tree belonging to the beech family Fagaceae. It is native to Europe, Asia, and North America. The natural range extends from southern Sweden to northern Sicily, West of France, Southern England, Northern Portugal, Central Spain, and east to Northwest Turkey, where it intergrades with the oriental beech (Fagus orientalis), which replaces it further east.",
    imageUrl:
      "https://bocdn.ecotree.green/essence/0001/04/33a5e1266b7e223aa0292c07280991dec5f0b41e.jpeg?d=960x540",
    link: "https://ecotree.green/en/offers/4490-sj%C3%A6lland/oroe-margrete-forest-2/beech/4693",
  },
  {
    description:
      "Larches are deciduous conifers in the genus Larix, of the family Pinaceae (subfamily Laricoideae). Growing from 20 to 45 metres mostly in Europe, Asia and North America. In Europe, the most common larch species are Larix decidua and Larix siberica.",
    imageUrl:
      "https://bocdn.ecotree.green/essence/0001/03/5a4b02c451eca6d9634141f1548976d4bac06cfa.jpeg?d=960x540",
    link: "https://ecotree.green/en/offers/4490-sj%C3%A6lland/oroe-margrete-forest-2/larch/4653",
  },
  {
    description:
      "The Douglas fir (Pseudotsuga menziesii) is a North American species of the pinaceous family that was introduced into Breton parks in the mid-19th century. Its area of origin extends along the Pacific coast from Canada to California. This species is one of the most widely used in reforestation in France. In Brittany, Douglas fir areas represent about 12,000 ha, or 4% of the wooded area. The Douglas is a fast-growing tree, which is why it is used extensively in reforestation. It also has good technical qualities (wood processing for carpentry, exterior construction because it is rot-proof to the core).",
    imageUrl:
      "https://bocdn.ecotree.green/essence/0001/04/f878815b9b9d7ae94a19642f4a2bf1c56b46b64d.jpeg?d=960x540",
    link: "https://ecotree.green/en/offers/7755-nordjylland/nysum-forest/douglas-fir/4229",
  },
  {
    description:
      "The hazel tree is a deciduous shrub which belongs to the Corylaceae family. It is widely distributed in temperate regions of the northern hemisphere. The leaves of the hazel tree are round and serrated, green in colour. The shrub produces hazelnuts, a hard-shelled fruit, which are often harvested for their delicious flavour and use in cooking. Hazel is also valued for its ornamental properties and its wood is used in crafts and construction. It is an important element of many forest ecosystems.",
    imageUrl:
      "https://bocdn.ecotree.green/essence/0001/05/a940451aa0d11446048cb0bcad9796fb2d4a55dd.jpg?d=960x540",
    link: "https://ecotree.green/en/offers/7755-nordjylland/nysum-forest/hazel/4094",
  },
  {
    description:
      "The Norway Maple is a deciduous tree. They are green in spring and turn yellow and sometimes red in autumn. This hardy tree, very widespread in France, is precious for its rapid growth. Its wood is used in carpentry, for floors, and its ashes are used to make potash. Its Latin name Acer means sharp, hence the French word 'acéré' (pointed). The tree owes its name to its wood, which was used in antiquity to make spears.",
    imageUrl:
      "https://bocdn.ecotree.green/essence/0001/04/c655e758f256168e2dce85019615878c69c8b85d.jpg?d=960x540",
    link: "https://ecotree.green/en/offers/4490-sj%C3%A6lland/oroe-margrete-forest/norway-maple/3866",
  },
  {
    description: "Details of the pack: Douglas fir, Norway Maple, Sessile Oak",
    imageUrl:
      "https://bocdn.ecotree.green/pack/0001/04/e7b80dddf86dcd04126e124a2b9e52f7ec72285c.jpeg?d=960x540",
    link: "https://ecotree.green/en/offres/pack/danish-forest-bundle",
  },
  {
    description: "Details of the pack: Sessile Oak",
    imageUrl: "https://cdn.ecotree.green/img/articles/WEDDING.jpg?d=960x540",
    link: "https://ecotree.green/en/offres/pack/wedding-bundle",
  },
];

const HighlightsGallery: FC = () => {
  return (
    <div className="text-white">
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockHighlights.map((highlight, index) => (
          <HighlightCard
            key={index}
            description={highlight.description}
            imageUrl={highlight.imageUrl}
            link={highlight.link}
          />
        ))}
      </div>
    </div>
  );
};

export default HighlightsGallery;
