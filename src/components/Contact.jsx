// import { useRef, useState } from "react";
// import { motion } from "framer-motion";
// import emailjs from "@emailjs/browser";

// import { styles } from "../style";
// import { EarthCanvas } from "./canvas";
// import { SectionWrapper } from "../hoc";
// import { slideIn } from "../utils/motion";

// const Contact = () => {
//   const formRef = useRef();
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setForm({
//       ...form,
//       [name]: value,
//     });
//   };

// const handleSubmit = (e) => {
//   e.preventDefault();
//   setLoading(true);

//   emailjs
//     .send(
//       "service_b6iur17",
//       "template_8946a49",
//       {
//         from_name: form.name,
//         to_name: "Seun Jacobs",
//         from_email: form.email,
//         to_email: "seunlo@gmail.com",
//         message: form.message,
//       },
//       "jhq4yyLCQ_lSe61og"
//     )
//     .then(
//       () => {
//         setLoading(false);
//         alert("Thank you. I will get back to you as soon as possible.");

//         setForm({
//           name: "",
//           email: "",
//           message: "",
//         });
//       },
//       (error) => {
//         setLoading(false);
//         console.error(error);

//         alert("Ahh, something went wrong. Please try again.");
//       }
//     );
// };

//   return (
//     <div
//       className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}
//     >
// <motion.div
//   variants={slideIn("left", "tween", 0.2, 1)}
//   className="flex-[0.75] bg-black-100 p-8 rounded-2xl"
// >
//   <p className={styles.sectionSubText}>Get in touch</p>
//   <h3 className={styles.sectionHeadText}>Contact.</h3>

//   <form
//     ref={formRef}
//     onSubmit={handleSubmit}
//     className="mt-12 flex flex-col gap-8"
//   >
//     <label className="flex flex-col">
//       <span className="text-white font-medium mb-4">Your Name</span>
//       <input
//         type="text"
//         name="name"
//         value={form.name}
//         onChange={handleChange}
//         placeholder="What's your name?"
//         className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
//       />
//     </label>
//     <label className="flex flex-col">
//       <span className="text-white font-medium mb-4">Your email</span>
//       <input
//         type="email"
//         name="email"
//         value={form.email}
//         onChange={handleChange}
//         placeholder="What's your email?"
//         className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
//       />
//     </label>
//     <label className="flex flex-col">
//       <span className="text-white font-medium mb-4">Your Message</span>
//       <textarea
//         rows={7}
//         name="message"
//         value={form.message}
//         onChange={handleChange}
//         placeholder="What do you want to say?"
//         className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
//       />
//     </label>

//     <button
//       type="submit"
//       className="bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary"
//     >
//       {loading ? "Sending..." : "Send"}
//     </button>
//   </form>
// </motion.div>

// <motion.div
//   variants={slideIn("right", "tween", 0.2, 1)}
//   className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
// >
//   <EarthCanvas />
// </motion.div>
//     </div>
//   );
// };

// export default SectionWrapper(Contact, "contact");

import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { slideIn } from "../utils/motion";
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef, useState, useEffect } from "react";

import { Fox } from "../models";
import useAlert from "../hooks/useAlert";
import { Alert, Loader } from "../components";
import { SectionWrapper } from "../hoc";
import { styles } from "../style";


const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const { alert, showAlert, hideAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState("idle");

  const handleChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
  };

  const handleFocus = () => setCurrentAnimation("walk");
  const handleBlur = () => setCurrentAnimation("idle");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setCurrentAnimation("hit");

    emailjs
      .send(
        "service_b6iur17",
        "template_8946a49",
        {
          from_name: form.name,
          to_name: "Seun Jacobs",
          from_email: form.email,
          to_email: "seunlo@gmail.com",
          message: form.message,
        },
        "jhq4yyLCQ_lSe61og"
      )
      .then(
        () => {
          setLoading(false);
          showAlert({
            show: true,
            text: "Thank you for your message 😃",
            type: "success",
          });

          setTimeout(() => {
            hideAlert(false);
            setCurrentAnimation("idle");
            setForm({
              name: "",
              email: "",
              message: "",
            });
          }, [3000]);
        },
        (error) => {
          setLoading(false);
          console.error(error);
          setCurrentAnimation("idle");

          showAlert({
            show: true,
            text: "I didn't receive your message 😢",
            type: "danger",
          });
        }
      );
  };  

  return (
    <section className="relative flex lg:flex-row flex-col max-container">
      {alert.show && <Alert {...alert} />}

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="flex-[0.75] bg-black-100 p-8 rounded-2xl"
      >
        <p className={styles.sectionHeadText}>Get in touch</p>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-12 flex flex-col gap-8"
        >
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Name</span>
            <input
              type="text"
              name="name"
              placeholder="What's your name?"
              required
              value={form.name}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className="bg-gray py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your email</span>
            <input
              type="email"
              name="email"
              placeholder="What's your email?"
              required
              value={form.email}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className="bg-gray py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Message</span>
            <textarea
              rows={4}
              name="message"
              placeholder="Write your thoughts here..."
              required
              value={form.message}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className="bg-gray py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary w-full"
          >
            {loading ? "Sending..." : "Submit"}
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <Canvas
          camera={{
            position: [0, 0, 5],
            fov: 75,
            near: 0.1,
            far: 1000,
          }}
        >
          <directionalLight position={[0, 0, 1]} intensity={2.5} />
          <ambientLight intensity={1} />
          <pointLight position={[5, 10, 0]} intensity={2} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            intensity={2}
          />

          <Suspense fallback={<Loader />}>
            <Fox
              currentAnimation={currentAnimation}
              position={[0.5, 0.35, 0]}
              rotation={[12.629, -0.6, 0]}
              scale={[0.5, 0.5, 0.5]}
            />
          </Suspense>
        </Canvas>
      </motion.div>      
    </section>
  );
};

export default SectionWrapper(Contact, "contact");
