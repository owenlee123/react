
import "./index.scss";
import { Head } from "~/components/head";
import { Button } from 'antd-mobile';

export class My extends Component {
    state = {
        isLogin: false
    }
    goLogin = () => {
        const { history } = this.props;
        history.push("/login");
    }
    render() {
        const { isLogin } = this.state;
        return (
            <div>
                <Head title="个人中心" show={true}></Head>
                <h2>my-my-my</h2>
                <div style={{ display: isLogin ? "block" : "none" }}>
                    <h2>你的账户 === {13212341234}</h2>
                    <img src={require("@/assets/images/photo.png")} alt="" />
                </div>
                <Button onClick={this.goLogin} style={{ display: !isLogin ? "inline-block" : "none" }} type="primary" inline size="large">马上登录</Button>
            </div>
        )
    }
}