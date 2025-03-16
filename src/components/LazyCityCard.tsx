import { useRef } from "react";
import CityCard, { CityCardProps } from "./CityCard";
import useIntersection from "../hooks/useIntersection";
import CityCardSkeleton from "./loaders/CityCardSkeleton";

export default function LazyCityCard(props: CityCardProps) {
  const ref = useRef(null);
  const isVisible = useIntersection(ref, { threshold: 0.7 });

  return (
    <li ref={ref}>
      {isVisible ? <CityCard {...props} /> : <CityCardSkeleton />}
    </li>
  );
}
