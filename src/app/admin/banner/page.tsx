import Image from 'next/image';
import ITryButton from "../../components/Button";

export default function BannerPage() {
  const dummyBanner = [
    {
      image: "/open_house.png",
    },
    {
      image: "/open_house.png",
    },
    {
      image: "/open_house.png",
    },
    {
      image: "/open_house.png",
    },
    {
      image: "/open_house.png",
    },
  ];
  return (
    <>
      <h1 className="text-3xl text-extrabold text-center pb-16">Banner</h1>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-2 p-5">
        {dummyBanner.map((item, key) => (
          <div key={key}>
            <div className="w-full h-full rounded overflow-hidden md:p-5 p-1 ">
              <Image src={item.image} alt={item.image} width={700} height={300} />
              <ITryButton customWidthClassName="w-full" >ลบ</ITryButton>
            </div>

          </div>
        ))}
      </div>
      <label className="form-control w-full max-w-xs md:max-w-full md:flex-grow">
        <div className="label">
          <span className="label-text text-white">Pick a file</span>
        </div>
        <input type="file" className="file-input file-input-bordered w-full max-w-xs md:max-w-full" />
      </label>

    </>
  );
}
