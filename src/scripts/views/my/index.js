
import "./index.scss";
import { Mhead } from "~/components/mHead";
import { Accordion, List, WhiteSpace, Button } from 'antd-mobile';
import { connect } from "react-redux";
import { changeIsLogin } from "../../actions";

@connect(
    state => ({ ...state.data })
)
export class My extends Component {

    
    goLogin = () => {
        const { history } = this.props;
        history.push("/login");
    }

    // 注销
    delUserPhone = () => {
        const { dispatch } = this.props;
        delete localStorage["userphone"];
        dispatch(changeIsLogin(false))
    }

    render() {
        console.log(this.props);
        const { isLogin } = this.props;
        return (
            <div>
                <Mhead />
                <div style={{ width: "100%", height: "45px" }}></div>
                <div className="user-info" style={{ display: !isLogin ? "block" : "none" }}>
                    <div className="info-pic" onClick={this.goLogin}>
                        <img src={require("@/assets/images/default_pic.jpg")} alt="" />
                    </div>
                    <div className="info-name">未登录</div>
                </div>

                <div className="user-info" style={{ display: isLogin ? "block" : "none" }}>
                    <div className="info-pic" onClick={this.goLogin}>
                        <img src={require("@/assets/images/photo.png")} alt="" />
                    </div>
                    <div className="info-name">欢迎{localStorage.userphone}用户</div>
                    <Button size="small" onClick={this.delUserPhone}>注销</Button>
                </div>

                <WhiteSpace />
                <Accordion defaultActiveKey="0" className="my-accordion" onChange={this.onChange}>
                    <Accordion.Panel header="收藏的文章">
                        <List className="my-list">
                            <List.Item>content 1</List.Item>
                            <List.Item>content 2</List.Item>
                            <List.Item>content 3</List.Item>
                            <List.Item>content 4</List.Item>
                        </List>
                    </Accordion.Panel>
                </Accordion>

            </div>
        )
    }
}