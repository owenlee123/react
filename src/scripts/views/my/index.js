
import "./index.scss";
import { Mhead } from "~/components/mHead";
import { Accordion, List, WhiteSpace, Button, Modal } from 'antd-mobile';
import { connect } from "react-redux";
import { changeIsLogin, getUserCollect } from "../../actions";
import { Link } from "react-router-dom";
import axios from "@/utils/axios";

const alert = Modal.alert;
@connect(
    state => ({ ...state.data })
)
export class My extends Component {
    componentWillMount() {
        this.props.dispatch(changeIsLogin(localStorage.userphone))
        this.getCollectAtc()
    }

    // 警告弹框
    showAlert = (nId) => {
        const alertInstance = alert('即将删除!', '您是否确定删除该文章?', [
            { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
            { text: '确定', onPress: () => this.delCollectNews(nId) },
        ]);
        setTimeout(() => {
            // 可以调用close方法以在外部close
            console.log('auto close');
            alertInstance.close();
        }, 500000);
    };

    // 根据新闻id和手机号删除收藏文章
    delCollectNews(newsId) {
        axios.get("/react/delCollectNews", {
            params: {
                userphone: localStorage.userphone,
                newsId
            }
        }).then(res => {
            console.log(res);
            if (res.data.code == 200) {
                setTimeout(() => {
                    this.getCollectAtc();
                }, 1000)
            }
        });
    }

    // 获取收藏文章
    getCollectAtc() {
        if (localStorage.userphone) {
            this.props.dispatch(getUserCollect({
                url: "/react/collectList",
                params: {
                    userphone: localStorage.userphone
                },
                cb() { }
            }));
        }
    }

    // 去登录
    goLogin = () => {
        const { history } = this.props;
        history.push("/login");
    }

    // 注销
    delUserPhone = () => {
        const { dispatch, history } = this.props;
        delete localStorage["userphone"];
        dispatch(changeIsLogin(false));
        this.getCollectAtc();
    }

    render() {
        console.log(this.props);
        const { isLogin, collects } = this.props;

        return (
            <div>
                <Mhead />
                <div style={{ width: "100%", height: "45px" }}></div>
                <div className="user-info" style={{ display: !isLogin ? "block" : "none" }}>
                    <div className="info-pic" onClick={this.goLogin}>
                        <img src={require("@/assets/images/default_pic.jpg")} alt="" />
                    </div>
                    <div className="info-name">未登录,点击上方头像登录</div>
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
                        <List className="my-list" style={{ display: isLogin ? "block" : "none" }}>
                            {
                                collects.map((item, i) => {
                                    return (
                                        <div key={i} id="link_btn">
                                            <Link to={"/good/detail/" + item.newsId}>
                                                <List.Item>{i + 1}.{item.news.title}</List.Item>
                                            </Link>
                                            <Button onClick={() => this.showAlert(item.newsId)} type="warning" inline size="small">X</Button>
                                        </div>
                                    )
                                })
                            }
                        </List>
                    </Accordion.Panel>
                </Accordion>

            </div>
        )
    }
}