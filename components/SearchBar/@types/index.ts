import { LocationTypes } from '../../../redux/actionCreators/LocationActions/@types';
import { CategoryTypes } from '../../../redux/actionCreators/CategoryActions/@types';



export type QueryTypes = {
    location: string;
    category: string;
    query: string;
}


export interface SearchBarProps  {
    locations: Array<string>;
    categories: Array<CategoryTypes>;
    queries: QueryTypes;
    onChange: (arg:QueryTypes) => void;
    postSearch:() => void;
}