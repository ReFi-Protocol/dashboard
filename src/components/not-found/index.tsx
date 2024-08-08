import { FC } from "react";
import { Link } from "react-router-dom";
import { RiSearchLine } from "react-icons/ri";
const NotFound: FC = () => {
  return (
    <div className="bg-black flex h-screen flex-col items-center justify-center gap-4 text-white">
      <div className="flex items-center ">
        <h2 className=" font-sans text-[169px] font-semibold text-[#18573B]">
          4
        </h2>
        <RiSearchLine className="h-40 w-40 rotate-90 text-[#07BA9A]" />
        <h2 className=" font-sans text-[169px] font-semibold text-[#18573B]">
          4
        </h2>
      </div>
      <p className="text-center font-sans text-[40px] font-semibold ">
        Ah, dang. We didn't find that page.
      </p>
      <p className="text-center text-lg">
        Maybe it’s best you start back at our home page...
        <Link
          to="/"
          className="font-sans text-[17px] font-semibold text-[#25AC88] underline"
        >
          Return at home here.
        </Link>
      </p>
    </div>
  );
};

export default NotFound;
