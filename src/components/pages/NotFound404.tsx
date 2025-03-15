import { Link } from "react-router";
import FullPage from "../FullPage";

export default function NotFound404() {
  return (
    <FullPage>
      <h1 className="text-gray-700 dark:text-gray-300 text-3xl">
        PAGE NOT FOUND
      </h1>
      <Link to="/" className="text-sky-500">
        Return Home
      </Link>
    </FullPage>
  );
}
