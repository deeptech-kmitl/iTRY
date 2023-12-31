import MyCarousel from "./components/Carousel/myCarousel";
import UserLayout from "./user/layout";

export default function Home() {
  return (
    <>
      <div className="px-8 py-16">
        <MyCarousel />
      </div>
      <UserLayout customClassName="pt-4">
        <h1>main content on homepage</h1>
      </UserLayout>
    </>
  )
}
