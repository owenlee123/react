
import "./index.scss"
import { Item } from "../item";
import { PullToRefresh } from "antd-mobile";
import axios from "@/utils/axios";
import { connect } from "react-redux";
import { getReverseGoods } from "../../actions";

@connect(
    state => ({ ...state.data })
)
export class List extends Component {
    state = {
        refreshing: false,
        down: true,  // 下拉 
        data: [],
        count: 1901
    }

    componentDidMount() {
        const { type, allGoods } = this.props;
        if (allGoods) {
            var data = allGoods.filter(g => g.type.value == type.value);
            console.log(data);
            this.setState({
                data
            })
        }
    }

    render() {
        const {
            goods,
            changeAllGoods,
            type
        } = this.props;
        const {
            data
        } = this.state;
        console.log(this.props);
        return (
            <div>
                <ul>
                    <PullToRefresh
                        damping={50}
                        ref={() => "loadmore"}
                        indicator={{ deactivate: '下拉刷新' }}
                        direction={'down'}
                        refreshing={this.state.refreshing}
                        onRefresh={() => {
                            this.setState({ refreshing: true }); // 正在刷新
                            setTimeout(() => {
                                console.log(this.props);
                                this.props.dispatch(getReverseGoods());
                                this.setState({ refreshing: false });  // 刷新结束 
                            }, 1000);
                        }}
                    >
                        {
                            goods.map((good, i) => {
                                return (
                                    <li key={i}>
                                        <Item good={good} />
                                    </li>
                                )
                            })
                        }
                    </PullToRefresh>
                </ul>
            </div>
        )
    }
}