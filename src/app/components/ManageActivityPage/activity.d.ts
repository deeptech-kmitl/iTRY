export type TypeAction = "add" | "edit"
export type TypeActivity = "staff" | "camper" 
export type TypeActivityParams = {
  type: TypeActivity
  activityId: string;
}