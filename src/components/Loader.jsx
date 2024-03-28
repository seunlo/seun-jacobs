// import { Html, useProgress } from "@react-three/drei";

// const Loader = () => {
//   const { progress } = useProgress();
//   return (
//     <Html>
//       <span className="canvas-load"></span>
//       <p
//         style={{
//           fontSize: 14,
//           color: "#f1f1f1",
//           fontWeight: 800,
//           marginTop: 40,
//         }}
//       >
//         {progress.toFixed(2)}%
//       </p>
//     </Html>
//   );
// };

// export default Loader;

import { Html } from "@react-three/drei";

const Loader = () => {
  return (
    <Html>
      <div className='flex justify-center items-center'>
        <div className='w-20 h-20 border-2 border-opacity-20 border-blue-500 border-t-blue-500 rounded-full animate-spin'></div>
      </div>
    </Html>
  );
};

export default Loader;
