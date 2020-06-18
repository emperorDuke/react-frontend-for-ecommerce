import { FilterKeyTypes } from "../../../actionCreators/FilterActions/@types";
import { FetchOperationType } from "../../../../utils/Fetch/@types";


export type FilterReducertype = {
    filters: FilterKeyTypes;
    operations:{
        [opName:string]: FetchOperationType
    }
}