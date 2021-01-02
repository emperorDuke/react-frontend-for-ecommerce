import { CategoryTypes } from "../../redux/actionCreators/CategoryActions/@types";


export interface SideBarProps {
    navItems: Array<CategoryTypes>;
    navHeader?: string;
}