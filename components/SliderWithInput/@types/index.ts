import { FilterAttributeTypes } from "../../../redux/actionCreators/FilterActions/@types";


export interface SliderWithInputProps {
    items: Array<FilterAttributeTypes>;
    postQuery: (arg:string) => void;
}