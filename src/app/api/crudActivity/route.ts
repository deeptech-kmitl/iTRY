import iTryDynamoDB from "../utils/dynamoDB";

export default async function getActivities() {

    // const tableName =
    // typeActivity == "staff" ? "StaffActivities" : "CamperActivities";

    let paramsDBStaff: AWS.DynamoDB.DocumentClient.ScanInput = {
        TableName: "StaffActivities",
    };

    let paramsDBCamper: AWS.DynamoDB.DocumentClient.ScanInput = {
        TableName: "CamperActivities",
    };


    try {
        const dataStaff = await iTryDynamoDB.scan(paramsDBStaff).promise();
        const dataCamper = await iTryDynamoDB.scan(paramsDBCamper).promise();
        const concatActivities = [...dataStaff.Items || [], ...dataCamper.Items || []];
    
        return { data: concatActivities, status: "success"};
    } catch (error) {
    throw error
    }

}