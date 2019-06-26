

import "./index.scss";
import { Link } from "react-router-dom";
import logoBackground from '@/assets/images/vHeader_logo_mobile_250x63.png';
import iconsSearch from '@/assets/images/search.png';
import iconsUser from '@/assets/images/mine.png';

var sectionStyle = {
    backgroundImage: `url(${logoBackground})`,
    backgroundSize: "125px 32px",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat"
}
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
export class Head extends Component {
    render() {
        return (
            <div id="wrap">
                <h1><Link style={sectionStyle} to="/app/home"></Link></h1>
                <div className="vHeader_icons">
                    <Link style={searchStyle} to="/app/search"></Link>
                    <Link style={userStyle} to="/app/my"></Link>
                </div>
            </div>
        )
    }
}
