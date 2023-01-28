import { useEffect, useRef } from "react";
import lottie from "lottie-web";
import LoadingImg from "../../assets/red-pulsing-dot.json";

export const PulsingPoint = () => {
  const animImg = useRef(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: animImg.current,
      animationData: LoadingImg,
      renderer: "svg", // "canvas", "html"
      loop: true, // boolean
      autoplay: true, // boolean
    });
  }, []);

  return <div style={{ width: "72px", height: "72px" }} ref={animImg} />;
};
