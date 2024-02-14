'use client'
import useBannerPage from "@/app/utils/BannerPage/useBannerPage";
import ITryButton from "../Button";
import ITryInput from "../Input";
import Image from "next/image";

interface BannerPageProps {
    data: BannerData[] | { error: unknown, status: "error" } | undefined;
}

export interface BannerData {
    bannerId: string;
    bannerUrl: string;
}

export default function BannerPage({ data }: BannerPageProps) {
    const { register, setValue, watch, handleSubmit, onSubmit } = useBannerPage();
    if (data && 'status' in data && data.status === 'error') {
        // Handle error case
        return <div>Error</div>;
    } else if (Array.isArray(data)) {
        // Now TypeScript knows that data is an array of BannerData
        return (
            <div>
                <h1 className="text-3xl text-extrabold text-center pb-16">Banner</h1>
                <div className="grid md:grid-cols-2 grid-cols-1 gap-2 p-5">
                    {data.map((item, key) => (
                        <div key={item.bannerId}>
                            <div className="w-full h-full rounded overflow-hidden md:p-5 p-1 ">
                                <Image  className="w-full" src={item.bannerUrl} alt={item.bannerUrl} width={700} height={300} />
                                <ITryButton customWidthClassName="w-full" >ลบ</ITryButton>
                            </div>
                        </div>
                    ))}
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:px-8 px-0">
                        <ITryInput type="image" register={register} file={watch("image")} formKeyFile="image" setValue={setValue} />
                        <ITryButton type="submit" customPositionClassName="mt-0" fullWidth>สร้าง Banner</ITryButton>
                    </form>
                </div>
            </div>
        );
    } else {
        // Handle undefined or other cases
        return <div>No data available</div>;
    }
}
