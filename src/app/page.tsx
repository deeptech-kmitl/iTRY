import MyCarousel from "./components/Carousel/myCarousel";
import UserLayout from "./user/layout";
import CardRoutes from "./components/CardRoute";

export default function Home() {
  return (
    <>
      <div className="px-8 py-16">
        <MyCarousel />
      </div>
      <UserLayout customClassName="pt-4">
        <h1>main content on homepage</h1>
      </UserLayout>
      <div className="px-24 py-16">
        <div className="text-center pb-16">
          <h1 className="text-2xl">การเดินทางมาคณะเทคโนโลยีสารสนเทศ</h1>
        </div>
        <CardRoutes/>
      </div>
    </>
  )
}
