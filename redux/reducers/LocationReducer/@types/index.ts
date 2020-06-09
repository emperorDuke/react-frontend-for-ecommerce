import { FetchOperationType } from "../../../../service/Fetch/@types";


export type LocationReducerType = {
    locations: Array<string>;
    operations:{
        [opName:string]: FetchOperationType
    }
}
