import { observable, action, computed, autorun } from "mobx";
import axios from "@/utils/axios";

class Comments {
    @observable commentslist = [];

    @action postComments = (obj) => {
        axios.post("/react/postComments", obj).then(res => {
            console.log(res);
        })
    }

    @action getComments = (newsId) => {
        axios.get("/react/getComments",{
            params:{newsId}
        }).then(res => {
            console.log(res.data.result);
            this.commentslist = res.data.result;
        })
    }

}

export default new Comments(); 