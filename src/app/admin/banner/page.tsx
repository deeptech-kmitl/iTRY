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
      <div className="grid grid-cols-2 gap-2 p-5">
      {dummyBanner.map((item, key) => (
        <div key={key}>
          <div className="w-full h-full rounded overflow-hidden p-5">
            <Image src={item.image} alt={item.image} width={700} height={300} />
            <ITryButton  customWidthClassName="w-full" >ลบ</ITryButton>
          </div>
          
        </div>
      ))}
      </div>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Pick a file</span>
        </div>
        <input type="file" className="file-input file-input-bordered w-full max-w-xs" />
      </label>
    </>
  );
}
