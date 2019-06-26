

export const COUNTADD = "countAdd";
export const countAdd = (num) => {
    return {
        type: COUNTADD,
        num
    }
}


import axios from "@/utils/axios";
export const GETBANNER = "getBanner";
export const getBanner = ({ url, params, cb }) => {
    return axios.get(url, {
        params
    }).then(res => {
        cb();
        return {
            type: GETBANNER,
            banner: res.data.result
        }
    });
}

export const GETNEWS = "GETNEWS";
export const getNews = ({ url, params, cb }) => {
    return axios.get(url, {
        params
    }).then(res => {
        cb();
        return {
            type: GETNEWS,
            news: res.data.result
        }
    });
}

export const GETSEARCHGOODS = "getSearchGoods";
export const getSearchGoods = ({ url, params, cb }) => {
    return axios.get(url, {
        params
    }).then(res => {
        cb();
        return {
            type: GETSEARCHGOODS,
            goods: res.data.result
        }
    });
}

export const CHANGEISLOGIN = "changeIsLogin";
export const changeIsLogin = (flag) => {
    return {
        type: CHANGEISLOGIN,
        flag
    }
}

export const GETREVERSEGOODS = "getReverseGoods";
export const getReverseGoods = () => {
    return {
        type: GETREVERSEGOODS
    }
}