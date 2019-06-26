import "./index.scss"

import { WingBlank, WhiteSpace } from "antd-mobile";
import { Link } from "react-router-dom";

export class Item extends Component {
    render() {
        const { good } = this.props;
        return (
            <div className="move-in item">
                <Link to={"/good/detail/" + good._id}>
                    <WhiteSpace />
                    <WingBlank>
                        <img src={good.articlepic} alt="" style={{ width: "100%", height: 260 }} />
                        <h2 style={{ color: "black", fontSize: ".3rem" }}>
                            <p>发布时间-{good.time}</p>
                            <p style={{fontSize:"18px",backgroundColor:"rgba(189, 184, 184, 0.5)"}}>{good.title}</p>
                            <p>标签-<span style={{color:"red"}}>{good.tag}</span></p>
                        </h2>
                    </WingBlank>
                </Link>
            </div>
        )
    }
}