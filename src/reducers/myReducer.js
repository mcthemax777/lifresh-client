
import {ACTION_TYPE, initialState} from '../actions/myAction';

const URI_SAVE = 'URI_SAVE';

// 버튼 클릭 시 호출될 함수
export const uriSave = (inputData) => ({
    type: URI_SAVE,
    payload: inputData
})

// store 에 실질적으로 저장해주는 reducer
export default function myReducer(state = initialState, action){
    switch(action.type) {
        case URI_SAVE:
            console.log(action.payload);
            return Object.assign({}, state, {
                inputData: action.payload
            });
        case ACTION_TYPE.TEST1:
            console.log(action.payload);
            state.count += action.payload;
            return Object.assign({}, state, {
                count: state.count
            });

        default:
            state.count = 0;
            return state
    }
}