import { motion } from "framer-motion";

import { styles } from "../style";
import { ComputersCanvas } from "./canvas";

const Hero = () => {
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
          <h1 className={`font-bold lg:text-6xl text-[38px] text-white`} style={{lineHeight:'38px'}}>
            Back-End <span className="text-[#915EFF]">Web Developer</span>
          </h1>
          <p className={`${styles.heroSubText} mt-4 text-white-100`}>
            I create, design and develop server-side logic, ensuring high performance and
            responsiveness to requests from the front-end.
          </p>
        </div>
      </div>

      <ComputersCanvas />
    </section>
  );
};

export default Hero;
