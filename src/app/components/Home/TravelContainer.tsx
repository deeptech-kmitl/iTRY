import CardRoutes from "../CardRoute";

export default function TravelContainer() {
  return (
    <div className="text-center py-12 md:py-16">
      <h1 className="text-base md:text-2xl">
        การเดินทางมาคณะเทคโนโลยีสารสนเทศ
      </h1>
      <CardRoutes role="user" />
    </div>
  )
}