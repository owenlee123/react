import { COUNTADD, GETBANNER, GETSEARCHGOODS, GETREVERSEGOODS, GETNEWS, CHANGEISLOGIN } from "../actions";


const defaultState = {
    count: 20000,
    banner: [],
    news: [],
    goods: [],
    carNum: 10,
    isLogin: false
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

        case GETNEWS:
            return { ...state, news: action.news }
            break;

        case GETSEARCHGOODS:
            return { ...state, goods: action.goods }
            break;

        case CHANGEISLOGIN:
            return { ...state, isLogin: action.flag }
            break;

        case GETREVERSEGOODS:
            return { ...state, goods: state.goods.reverse() }
            break;

        default:
            return state;
            break;
    }
}