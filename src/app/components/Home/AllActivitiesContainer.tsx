import { ActivityApiData, ITryActivityCard } from "@/app/utils/ManageActivityPage/activity";
import { ApiDataList, ApiError } from "../global";
import { CardActivity } from "../CardActivity";
import NoResultData from "../NoData/NoResultData";
import { Paging } from "../Paging";


interface AllActivitiesContainerProps {
  activitiesData: ActivityApiData | ApiError | undefined;
  customClassName?: string;
  page?: number;
  showPagination?: boolean;
  canEdit?: boolean;
}

export default function AllActivitiesContainer({ activitiesData, customClassName, page = 1, showPagination = false, canEdit = false }: AllActivitiesContainerProps) {


  if (activitiesData?.status === 'error') {
    // Handle error case
    return <div>Error</div>;
  } else if (Array.isArray(activitiesData?.data) && activitiesData) {

    return (

      <div className={`${customClassName}`}>
        {activitiesData?.data?.length > 0 ? (
          <>
            {activitiesData?.data.map((activity, index) => (
              <CardActivity
                key={index}
                canEdit={canEdit}
                {...activity}
              />
            ))}{" "}
          </>
        ) : (
          <NoResultData text="ไม่มีกิจกรรมที่คุณต้องการ" />
        )}
        {showPagination && <Paging page={page || 1} countActivities={activitiesData?.countActivities || 0} perPage={5} />}
      </div>
    );
  } else {
    // Handle undefined or other cases
    return <div>No data available</div>;
  }

}