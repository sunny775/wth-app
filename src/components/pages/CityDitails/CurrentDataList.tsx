import { Current } from "../../../utils/shared-types";

const CurrentDataList = ({ data }: { data: Current }) => {
  const nodes = [];
  
  const selected: { [k in keyof Current]?: string } = {
    temperature: "°C",
    wind_speed: "km/h",
    pressure: "mb",
    precip: "mm",
    humidity: "%",
    cloudcover: "%",
    feelslike: "°C",
    uv_index: "",
    visibility: "km",
  };

  for (const k of Object.keys(data) as Array<keyof Current>) {
    if (typeof data[k] !== "object") {
      nodes.push(
        <li key={k} className="flex justify-center items-center flex-col">
          <p className="text-sm">{k.split("_").join(" ").toUpperCase()}</p>
          <p className="pt-4 text-gray-500 dark:text-gray-400 text-xs">
            {data[k]} {selected[k] || ""}
          </p>
        </li>
      );
    }
  }
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-8">
      {nodes}
    </ul>
  );
};

export default CurrentDataList;
