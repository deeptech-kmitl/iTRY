import CardSponsor from "../CardSponsor";
import { SponsorData } from "../SponsorPage/SponsorAdmin";
import { ApiDataList, ApiError } from "../global";

interface SponSorContainerProps {
  sponsorsData: ApiDataList<SponsorData> | ApiError | undefined;
}

export default function SponsorContainer({ sponsorsData }: SponSorContainerProps) {
  if (sponsorsData?.status === 'error') {
    // Handle error case
    return <div>Error</div>;
  } else if (Array.isArray(sponsorsData?.data)) {

    return (
      <div className="py-12 md:py-16">
        <div className="text-center pb-16">
          <h1 className="text-base md:text-2xl">ขอบคุณผู้สนับสนุน</h1>
        </div>
        <div
          className={`grid grid-cols-3 md:grid-cols-5 place-items-center gap-4`}
        >
          {sponsorsData?.data.map(sponsor => (
            <CardSponsor {...sponsor} key={sponsor.sponsorId} />
          ))}
        </div>
      </div>
    )
  } else {
    // Handle undefined or other cases
    return <div>No data available</div>;
  }

}