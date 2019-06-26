import "./index.scss";
import { Link } from "react-router-dom";

export const navs = [
    { txt: "英超", path: "/app/gbr", name: "gbr", pic: require("@/assets/images/yingchao.png") },
    { txt: "国内足球", path: "/app/chn", name: "chn", pic: require("@/assets/images/guonei.png") },
    { txt: "西甲", path: "/app/esp", name: "esp", pic: require("@/assets/images/xijia.png") },
    { txt: "国际足球", path: "/app/global", name: "global", pic: require("@/assets/images/guoji.png") }
]
export class Nav extends Component {
    render() {
        return (
            <div className="vMod">
                <div className="vMod_navScrollBar2">
                    {
                        navs.map((item, i) => {
                            return (
                                <Link key={i} to={item.path} className="vMod_navScrollBar2_item">
                                    <img src={item.pic} alt={item.txt} />
                                    <span>{item.txt}</span>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}