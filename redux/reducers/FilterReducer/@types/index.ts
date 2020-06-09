import { FilterKeyTypes } from "../../../actionCreators/FilterActions/@types";
import { FetchOperationType } from "../../../../service/Fetch/@types";


export type FilterReducertype = {
    filters: FilterKeyTypes;
    operations:{
        [opName:string]: FetchOperationType
    }
}