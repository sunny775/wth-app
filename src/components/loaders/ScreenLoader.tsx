import FullPage from "../FullPage";
import Spinner from "./Spinner";

export default function ScreenLoader() {
  return (
    <FullPage className="w-screen h-screen">
      <Spinner className="w-12 h-12" />
    </FullPage>
  );
}
