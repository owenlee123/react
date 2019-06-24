import "./index.scss"

import { WingBlank, WhiteSpace } from "antd-mobile";
import { Link } from "react-router-dom";

export class Item extends Component {
    render() {
        const { good } = this.props;
        return (
            <div className="move-in item">
                <Link to={"/good/detail/" + good._id + "?name=" + good.name}>
                    <WhiteSpace />
                    <WingBlank>
                        <img src={good.img} alt="" style={{ width: "100%", height: 260 }} />
                        <h2 style={{ color: "yellowgreen", fontSize: ".4rem" }}>
                            {good.name} === RMB --- {good.price} - type={good.type.text}
                        </h2>
                    </WingBlank>
                </Link>
            </div>
        )
    }
}