import CardRoutes from "../../components/CardRoute";
import { getTravel } from "../../api/travel/route";

export default async function TravelPage() {
  const result = (await getTravel()) as any;
  // console.log("result----", result.data);
  return (
    <>
      <h1 className="text-3xl text-extrabold text-center pb-16">การเดินทาง</h1>
      <CardRoutes role="admin" route={result.data} />
    </>
  );
}
