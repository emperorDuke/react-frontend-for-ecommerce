import { useSelector, TypedUseSelectorHook } from "react-redux";
import { RootStoreState } from '../../reducers/RootReducer/@types';



const useTypedSelector:TypedUseSelectorHook<RootStoreState> = useSelector;

export default useTypedSelector;
  