

import "./index.scss"
import { Mhead } from "~/components/mHead";
import axios from "@/utils/axios"
import infoComment from '@/assets/images/info-comment.png';
import beforelike from '@/assets/images/beforelike.png';
import afterlike from '@/assets/images/afterlike.png';
import weibo from '@/assets/images/weibo.png';
import weixin from '@/assets/images/weixin.png';
import qzone from '@/assets/images/qzone.png';
import cang from '@/assets/images/cang.png';
import cang2 from '@/assets/images/cang2.png';

var commentStyle = {
    backgroundImage: `url(${infoComment})`,
    backgroundSize: "10px 10px",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat"
}
var beforeStyle = {
    backgroundImage: `url(${beforelike})`,
    backgroundSize: "50px 50px",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat"
}
var afterStyle = {
    backgroundImage: `url(${afterlike})`,
    backgroundSize: "50px 50px",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat"
}
var weiboStyle = {
    backgroundImage: `url(${weibo})`,
    backgroundSize: "25px auto",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat"
}
var weixinStyle = {
    backgroundImage: `url(${weixin})`,
    backgroundSize: "25px auto",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat"
}
var qzoneStyle = {
    backgroundImage: `url(${qzone})`,
    backgroundSize: "25px auto",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat"
}
var cangStyle = {
    backgroundImage: `url(${cang})`,
    backgroundSize: "25px auto",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat"
}
var afterCangStyle = {
    backgroundImage: `url(${cang2})`,
    backgroundSize: "25px auto",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat"
}

export class Good extends Component {
    state = {
        data: {},
        fontSize: 20,
        likeFlag: false,
        collectFlag: false
    }

    componentWillMount() {
        console.log(this.props);
        axios.get("/react/getNewsOne", {
            params: {
                newsId: this.props.match.params.newsId
            }
        }).then(res => {
            this.setState({
                data: res.data.result
            })
        })
    }
    // 改变文章字体大小
    changeBig = () => {
        this.setState({
            fontSize: ++this.state.fontSize
        })
    }
    changeSmall = () => {
        if (this.state.fontSize > 10) {
            this.setState({
                fontSize: --this.state.fontSize
            })
        }
    }
    // 点赞
    addLike = () => {
        this.setState({
            likeFlag: true
        })
        this.setState({
            data: { ...this.state.data, like: ++this.state.data.like }
        })
        axios.get("/react/likeAdd", {
            params: {
                newsId: this.props.match.params.newsId
            }
        }).then(res => {
            console.log(res)
            if (res.data.code == 200) {
                setTimeout(() => {
                    this.setState({
                        likeFlag: false
                    })
                }, 1000)
            }
        })
    }
    // 收藏
    collectArt = () => {
        axios.post("/react/collectArt", {
            newsId: this.props.match.params.newsId,
            news: JSON.stringify(this.state.data),
            userphone: localStorage.userphone
        }).then(res => {
            console.log(res);
            if (res.data.type) {
                this.setState({
                    collectFlag: true
                });
            } else {
                this.setState({
                    collectFlag: false
                });
            }
        })
    }

    render() {
        const {
            title,
            time,
            comment,
            articlepic,
            p1,
            p2,
            p3,
            articleCopyright,
            like
        } = this.state.data;
        console.log(this.state.data);
        const { fontSize, likeFlag, collectFlag } = this.state;
        return (
            <div>
                <Mhead />
                <div style={{ width: "100%", height: "45px" }}></div>
                <div className="article">
                    <h1 className="title">{title}</h1>
                    <div className="article-info">
                        <i className="info-data">今天 {time}</i>
                        <span className="info-via">唯彩看球</span>
                        <button id="fontAdd" onClick={this.changeBig}>A<sup>+</sup></button>
                        <button id="fontDes" onClick={this.changeSmall}>A<sup>-</sup></button>
                        <i className="iconfont icon-shoucang"></i>
                        <a className="info-comment" style={commentStyle}>{comment}</a>
                    </div>
                    <div className="article-content" style={{ fontSize }}>
                        <section>
                            <p>
                                <span className="img">
                                    <img src={articlepic} alt="" />
                                </span>
                            </p>
                            <p>{p1}</p>
                            <p>{p2}</p>
                            <p>{p3}</p>
                            <p className="articleCopyright">{articleCopyright}</p>
                        </section>
                    </div>
                </div>
                {/* 点赞 */}
                <div className="article-like">
                    <a onClick={this.addLike} className="like-button" style={likeFlag ? afterStyle : beforeStyle}></a>
                    <i>{like}</i>
                    <a onClick={this.collectArt} className="cang-button" style={collectFlag ? afterCangStyle : cangStyle}></a>
                    <i>收藏</i>
                </div>
                {/* 分享 */}
                <div className="article-share">
                    <div className="share">
                        <span>分享到:</span>
                        <div className="vRes_share">
                            <a className="weibo" style={weiboStyle}></a>
                            <a className="weixin" style={weixinStyle}></a>
                            <a className="qzone" style={qzoneStyle}></a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}