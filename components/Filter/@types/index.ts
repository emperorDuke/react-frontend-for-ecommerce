
import {FilterKeyTypes } from '../../../redux/actionCreators/FilterActions/@types/index'


export interface FilterProps {
    filters: FilterKeyTypes;
    postQuery: (arg:string) => void;
    categories?: Array<{name: string; id: string}>;
}