import { styles } from "../style";
import { ComputersCanvas } from "./canvas";
import { useEffect, useRef, useState } from "react";
import { lion, soundoff, soundon } from "../assets/icons";

const Hero = () => {
  const audioRef = useRef(new Audio(lion));
  audioRef.current.volume = 0.8;
  audioRef.current.loop = true;
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  useEffect(() => {
    if (isPlayingMusic) {
      audioRef.current.play();
    }
    return () => {
      audioRef.current.pause();
    };
  }, [isPlayingMusic]);
  return (
    <section className={`relative w-full h-screen mx-auto`}>
      <div
        className={`absolute inset-0 top-[120px]  max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#897ca4]" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        <div>
          <h1
            className={`font-bold lg:text-6xl text-[38px] text-white`}
            style={{ lineHeight: "38px" }}
          >
            Back-End <span className="text-[#915EFF]">Web Developer</span>
          </h1>
          <p className={`${styles.heroSubText} mt-4 text-white-100`}>
            I create, design and develop server-side logic, ensuring high
            performance and responsiveness to requests from the front-end.
          </p>
        </div>
      </div>

      <ComputersCanvas />
        <div className="absolute top-[480px] left-[360px]">
          <img
            src={!isPlayingMusic ? soundoff : soundon}
            alt="sound"
            className="w-10 h-10 cursor-pointer object-contain"
            onClick={() => setIsPlayingMusic(!isPlayingMusic)}
          />
        </div>
    </section>
  );
};

export default Hero;
