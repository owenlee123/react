

export const foots = [
    { txt: "首页", path: "/app/home", name: "home", icon: "icon-yidiandiantubiao04" },
    { txt: "分类", path: "/app/classify", name: "classify", icon: "icon-fenlei" },
    { txt: "购物车", path: "/app/cart", name: "cart", icon: "icon-gouwuche" },
    { txt: "我", path: "/app/my", name: "my", icon: "icon-wo" }
]
import "./index.scss";
import { Link, NavLink } from "react-router-dom";
import { Badge } from "antd-mobile";

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
                                {i==2&&<Badge className="hot" text={8} style={{ marginLeft: 12 }}></Badge>}
                            </NavLink>
                        </div>
                    )
                })
            }
        </footer>
    )
}