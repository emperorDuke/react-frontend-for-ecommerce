import { postingFailed, postingSuccess, Posting } from '../../redux/actionCreators/PostActions';
import { REQ } from './@types';
import { ThunkDispatch } from 'redux-thunk';
import { RootStoreState } from '../../redux/reducers/RootReducer/@types';
import { AnyAction } from 'redux';

export * from './@types';

// /**
//  * 
//  * @param url 
//  * @param data
//  * @param config 
//  */

// export default function post (url:string, method: REQ = REQ.POST, data?:(FormData|{}), config:{} = {'Content-Type': 'application/json'}) {

//     return async (dispatch:ThunkDispatch<RootStoreState, void, AnyAction> ) => {

//         const customAxios = AxiosClient(" ");

//         try {
//             const response = await customAxios({
//                 method: method,
//                 url: url,
//                 data: data,
//                 headers: config
//             });
//             if (response.status >= 200 && response.status < 400) {
//                 dispatch(postingSuccess(response.data));
//             }
//             else {
//                 dispatch(postingFailed(response.data));
//             };
//         }
//         catch (error) {
//             dispatch(postingFailed(error));
//         }
//     }    
// }