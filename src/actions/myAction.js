
// action type 설정
export const ACTION_TYPE = {
    TEST1: 'TEST1',
    CALCULATOR_UPDATE_SUM_SECOND: 'CALCULATOR_UPDATE_SUM_SECOND',
};

// data 초기화
export const initialState = {
    payload: 0
}

// 버튼 클릭 시 호출될 함수
export const countAction = (count) => ({
    type: ACTION_TYPE.TEST1,
    payload: count
});
