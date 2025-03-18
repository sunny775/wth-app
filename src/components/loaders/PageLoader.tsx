import FullPage from "../FullScreen";
import Spinner from "./Spinner";

export default function PageLoader() {
  return (
    <FullPage className="sm:w-[calc(100vw-4rem)] sm:h-[calc(100vh-4rem)]">
      <Spinner className="w-12 h-12" />
    </FullPage>
  );
}
