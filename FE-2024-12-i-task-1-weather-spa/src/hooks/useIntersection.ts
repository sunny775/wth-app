import { RefObject, useEffect, useState } from "react";

const useIntersection = (
  ref: RefObject<HTMLElement | null>,
  options: IntersectionObserverInit
) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      options // E.g; { threshold: 0.5 } =>  Trigger when 50% of component is in view
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [ref, options]);

  return isVisible
};

export default useIntersection;
