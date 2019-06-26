

export const foots = [
    { txt: "首页", path: "/app/home", name: "home", icon: "icon-zuqiuxie" },
    { txt: "英超", path: "/app/gbr", name: "gbr", icon: "icon-zuqiu-copy" },
    { txt: "西甲", path: "/app/esp", name: "esp", icon: "icon-zuqiu1" },
    { txt: "我", path: "/app/my", name: "my", icon: "icon-wo" }
]
import "./index.scss";
import { Link, NavLink } from "react-router-dom";

export const Foot = () => {
    return (
        <footer>
            {
                foots.map((item, i) => {
                    return (
                        <div key={i}>
                            <NavLink to={item.path} activeClassName="nav-active">
                                <i className={"iconfont " + item.icon}></i>
                                <span>{item.txt}</span>
                            </NavLink>
                        </div>
                    )
                })
            }
        </footer>
    )
}