import "./index.scss";

import { SearchBar } from "antd-mobile";
import axios from "@/utils/axios"
import { List } from "~/components/list"
import { connect } from "react-redux";
import { getSearchGoods } from "../../actions";
import { Mhead } from "~/components/mHead";

@connect(
    state => {
        return {
            ...state.data
        }
    }
)
export class Search extends Component {
    getSearch = () => {
        console.log(this.word);  //用的antd-mobile库一定要加state
        const { dispatch } = this.props;
        dispatch(getSearchGoods({
            url: "/react/getSearchList",
            params: {
                keyword: this.word.state.value
            },
            cb() { console.log("search success") }
        }))
    }
    changeGoods = () => {
        this.state.goods.reverse();
        this.setState({
            goods: this.state.goods
        })
    }
    render() {
        console.log(this.props);
        const { goods } = this.props;
        return (
            <div>
                <Mhead />
                <div style={{ width: "100%", height: "45px" }}></div>
                <SearchBar ref={el => this.word = el} placeholder="Search" maxLength={8} onBlur={this.getSearch} />
                {/* 上面代码中onChange事件一定有个参数val  就是你输入的值 */}
                <List
                    goods={goods}
                    changeAllGoods={this.changeGoods}
                />

            </div>
        )
    }
} 