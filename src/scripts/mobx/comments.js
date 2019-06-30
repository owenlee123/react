import { observable, action, computed, autorun } from "mobx";
import axios from "@/utils/axios";

class Comments {
    @observable commentslist = [];

    @action postComments = (obj, cb) => {
        axios.post("/react/postComments", obj).then(res => {
            cb();
            console.log(res);
        })
    }

    @action getComments = (newsId) => {
        axios.get("/react/getComments", {
            params: { newsId }
        }).then(res => {
            this.commentslist = res.data.result;
        })
    }

}

export default new Comments(); 