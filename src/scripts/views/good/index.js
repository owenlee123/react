

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
import { Toast } from 'antd-mobile';
import { dateFormat } from "@/utils/date";


import comments from "~/mobx/comments";   //导入mobx
import { observer } from "mobx-react";
console.log(comments);

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

@observer
export class Good extends Component {
    state = {
        data: {},
        fontSize: 20,
        likeFlag: false,
        collectFlag: false,
        isLogin: false
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
        });
        this.setState({
            isLogin: localStorage.userphone ? true : false
        })
        comments.getComments(this.props.match.params.newsId);  //获取评论
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
        if (localStorage.userphone) {
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
        } else {
            Toast.info('您还未登录,无法收藏该文章,即将跳转登录页面...', 2, () => {
                this.props.history.push("/login");
            });
        }
    }
    // 去登录
    goToLogin = () => {
        this.props.history.push("/login")
    }
    // 添加评论
    postComments = () => {
        var msg = this.one.value;
        var newTime = dateFormat(new Date());
        var userphone = localStorage.userphone;
        if (localStorage.userphone) {
            if (msg) {
                comments.postComments({
                    msg,
                    newTime,
                    userphone,
                    newsId: this.props.match.params.newsId
                })
                this.one.value = "";
                comments.getComments(this.props.match.params.newsId);
            }else{
                Toast.info('评论不能为空', 2);
            }
        } else {
            Toast.info('您还未登录,无法进行评论', 2);
            this.one.value = "";
        }
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
            like,
        } = this.state.data;
        const { fontSize, likeFlag, collectFlag, isLogin } = this.state;
        const { commentslist } = comments;
        console.log(commentslist);
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
                {/* 评论 */}
                <div id="comment">
                    <div className="vComment_header">
                        <h2>网友评论</h2>
                    </div>
                    <div className="vComment_topInputBox">
                        <div className="vComment_topInputBox_header">
                            <span>我要评论</span>
                            <div onClick={this.goToLogin} className="btns" style={{ display: !isLogin ? "block" : "none" }}>
                                <a>登录</a>
                                <a>注册</a>
                            </div>
                            <div className="btns" style={{ display: isLogin ? "block" : "none" }}>用户{localStorage.userphone}</div>
                        </div>
                        <div className="vComment_input">
                            <textarea ref={el => this.one = el} className="vComment_input_text" placeholder="说说你的看法..."></textarea>
                            <input onClick={this.postComments} className="vComment_input_submit" type="submit" value="发表评论"></input>
                        </div>
                    </div>
                    <div className="vComment_hotList">
                        <div className="vComment_list">
                            <h3>热门评论</h3>
                            <ul>
                                {
                                    commentslist.map((c, i) => {
                                        return (
                                            <li key={i}>
                                                <div className="vComment_item">
                                                    <div className="vComment_item_top">
                                                        <img src={require("@/assets/images/photo.png")} alt="" />
                                                        <span>{c.userphone}</span>
                                                    </div>
                                                    <div className="vComment_item_main">
                                                        <p>{c.msg}</p>
                                                    </div>
                                                    <div className="vComment_item_bottom">
                                                        <i className="data">{c.newTime}</i>
                                                        <span className="source">来自Android客户端</span>
                                                    </div>
                                                </div>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}