
import "./index.scss";
import { Mhead } from "~/components/mHead";
import ycbg from '@/assets/images/football_bg.png';
import axios from "@/utils/axios";
import { Link } from "react-router-dom";

var bgStyle = {
    backgroundImage: `url(${ycbg})`,
    backgroundSize: "100% 100%",
}
export class Gbr extends Component {
    state = {
        pic: require("@/assets/images/yingchao.png"),
        txt: "英超",
        bg: require("@/assets/images/football_bg.png"),
        news: []
    }

    componentWillMount() {
        axios.get("/react/getListNews", {
            params: {
                type: "gbr"
            }
        }).then(res => {
            console.log(res.data.result);
            this.setState({
                news: res.data.result
            })
        })
    }

    render() {
        return (
            <div>
                <Mhead />
                <div style={{ width: "100%", height: "45px" }}></div>
                <div className="banner" style={bgStyle}>
                    <div className="logo">
                        <img src={this.state.pic} alt="" />
                    </div>
                    <h2>{this.state.txt}</h2>
                </div>
                <div className="vFootball_main">
                    <div className="vMod_newsList">
                        {
                            this.state.news.map((n, i) => {
                                return (
                                    <Link key={i} to={"/good/detail/" + n._id} className="vMod_newsList_item move-fade">
                                        <div className="picture">
                                            <img src={n.smallimg} alt="" />
                                        </div>
                                        <h4 className="title">{n.title}</h4>
                                        <div className="info">
                                            <b className="info_tag">{n.tag}</b>
                                            <span className="info_comment">{n.comment}评</span>
                                        </div>
                                    </Link>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

