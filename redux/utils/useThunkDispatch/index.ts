import { useDispatch } from "react-redux";
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from "redux";
import { RootStoreState } from '../../reducers/RootReducer/@types';




export default function useThunkDispatch<D = ThunkDispatch<RootStoreState, void, AnyAction>> () {
    return (
        useDispatch<D>()
    )
}