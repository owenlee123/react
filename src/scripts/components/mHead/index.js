

import "./index.scss";
import { Link } from "react-router-dom";
import iconsSearch from '@/assets/images/search.png';
import iconsUser from '@/assets/images/mine.png';
import history from "@/utils/history";

var searchStyle = {
    backgroundImage: `url(${iconsSearch})`,
    backgroundSize: "18px 18px",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat"
}
var userStyle = {
    backgroundImage: `url(${iconsUser})`,
    backgroundSize: "18px 18px",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat"
}
export class Mhead extends Component {

    render() {
        return (
            <div id="vHeader_wrap">
                <h1><a onClick={() => (history.go(-1))}>返回</a></h1>
                <div className="vHeader_icons">
                    <Link style={searchStyle} to="/app/search"></Link>
                    <Link style={userStyle} to="/app/my"></Link>
                </div>
            </div>
        )
    }
}
