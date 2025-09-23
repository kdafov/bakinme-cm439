// import { useState } from "react";
import InstagramButton from "./InstagramButton";

export default function Banner() {
  // const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div>
      {/* Brand Image */}
      <div className="relative w-full h-[63px] shadow-lg overflow-hidden bg-[#462305] border-1 border-[#462305]">
        {/* <div className="relative w-full h-[180px] shadow-lg overflow-hidden bg-gradient-to-br from-[#DC7129] to-[#F7C884] border-1 border-[#462305]"> */}
        {/* <img
          src="/landscape-intro.png"
          alt="BakinMeCrazy"
          onLoad={() => setImgLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out
            ${imgLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
        /> */}

        {/* Top blur overlay */}
        <div className="absolute top-0 left-0 right-0 h-[60px] bg-gradient-to-b from-white/40 via-white/20 to-transparent backdrop-blur-sm pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-black/5" />

        {/* Instagram Button */}
        <InstagramButton />
      </div>
    </div>
  );
}
