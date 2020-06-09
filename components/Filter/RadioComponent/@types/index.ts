import { FilterAttributeTypes } from "../../../../redux/actionCreators/FilterActions";


export interface RadioComponentProps {
    label: string;
    items: Array<FilterAttributeTypes>;
    postQuery: (arg: string) => void;
}