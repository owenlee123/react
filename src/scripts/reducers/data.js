import { COUNTADD, GETBANNER, GETSEARCHGOODS, GETREVERSEGOODS } from "../actions";


const defaultState = {
    count: 20000,
    banner: [],
    goods: [],
    carNum: 10
}

export default (state = defaultState, action) => {
    console.log(action);

    switch (action.type) {
        case COUNTADD:
            return { ...state, count: state.count + action.num }
            break;

        case GETBANNER:
            return { ...state, banner: action.banner }
            break;

        case GETSEARCHGOODS:
            return { ...state, goods: action.goods }
            break;

        case GETREVERSEGOODS:
            return { ...state, goods: state.goods.reverse() }
            break;

        default:
            return state;
            break;
    }
}