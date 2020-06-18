import { FetchOperationType } from "../../../../utils/Fetch/@types";


export type LocationReducerType = {
    locations: Array<string>;
    operations:{
        [opName:string]: FetchOperationType
    }
}
