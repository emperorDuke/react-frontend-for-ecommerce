import { FilterAttributeTypes } from "../../../../redux/actionCreators/FilterActions/@types";



export interface InputXcheckboxProps {
    items: Array<FilterAttributeTypes>;
    postQuery: (query:string) => void;
    label: string;
    disableInputEl?: boolean;
}

