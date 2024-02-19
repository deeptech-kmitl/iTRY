'use client'
import ITryButton from "../Button";
import ITryInput from "../Input";
import { ApiDataList } from "../global";
import ManageableImage from "../ManageableImage/ManageableImage";
import useBannerPage from "@/app/utils/BannerPage/useBannerPage";

interface BannerPageProps {
    apiData: ApiDataList<BannerData> | { error: unknown, status: "error" } | undefined;
}

export interface BannerData {
    bannerId: string;
    bannerUrl: string;
}
export default function BannerPage({ apiData }: BannerPageProps) {

    const { register, setValue, watch, handleSubmit, onSubmit, onDeleteBanner } = useBannerPage();
    if (apiData && 'status' in apiData && apiData.status === 'error') {
        // Handle error case
        return <div>Error</div>;
    } else if (Array.isArray(apiData?.data)) {
        // Now TypeScript knows that data is an array of BannerData
        return (
            <div>
                <h1 className="text-3xl text-extrabold text-center pb-16">Banner</h1>
                <div className="grid md:grid-cols-2 gap-2 p-5">
                    {apiData?.data.map((item, key) => (
                        <div key={item.bannerId}>
                            <div className="w-full h-full rounded overflow-hidden md:p-5 p-1 ">
                                <ManageableImage itemId={item.bannerId} itemImageUrl={item.bannerUrl} deleteFunc={onDeleteBanner} />
                            </div>

                        </div>
                    ))}
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full rounded overflow-hidden md:p-5 p-1">
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
