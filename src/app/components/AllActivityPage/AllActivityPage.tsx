
import { getActivitiesAsc } from "@/app/api/sortActivity/[user]/asc/route";
import { CardActivity, ascActivityApi } from "@/app/components/CardActivity";
import { Paging } from "@/app/components/Paging";
import { useSearchParams } from "next/navigation";

export const AllActivityPage = async (props: any) => {
  console.log("props------", props);
  const { page, per_page, user } = props;

    //ดึงกิจกรรมทั้งหมด
  const data = (await getActivitiesAsc({
    user: user,
    page: page,
  })) as any | { error: unknown; status: "error" } | undefined;

//   console.log("data-----", data.data);

  return (
    <div>
      {data.data.map((activity:any, index:any) => (
        <CardActivity
          key={index}
          item={activity}
        />
      ))}{" "}
      <Paging activities={[]} />
    </div>
  );
};
