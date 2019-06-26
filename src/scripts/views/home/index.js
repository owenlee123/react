
import "./index.scss";
import { Head } from "~/components/head";

import { WingBlank, WhiteSpace, Carousel, NoticeBar, List } from "antd-mobile";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { getBanner } from "../../actions";
import { Nav } from "../../components/nav";
import { HomeList } from "../../components/homeList";

@connect(
    state => ({ ...state.data })
)
export class Home extends Component {
    componentWillMount() {
        console.log(this.props);
        const { dispatch } = this.props;
        dispatch(getBanner({
            url: "/react/getNews",
            params: {
                limit: 4
            },
            cb() { }
        }));
    }
    render() {
        return (
            <div>
                <Head title="首页" show={true}></Head>
                <div style={{width:"100%",height:"45px"}}></div>
                <WingBlank>
                    <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px', color: "red" } }}>
                        唯彩看球（唯彩会）提供专业的足球资讯和免费足球直播，同时提供专业的福彩/体彩分析预测推荐和彩票行业资讯报道。
                    </NoticeBar>

                    <Carousel
                        autoplay={true}
                        speed={200}
                        autoplayInterval={2000}
                        infinite
                        className="carousel"
                    >
                        {
                            this.props.banner.map((b, i) => {
                                return (   //map 一定要写return
                                    <Link
                                        to={"/good/detail/" + b._id}
                                        key={i}
                                        style={{ display: 'inline-block', width: '100%', height: 200 }}
                                    >
                                        <img
                                            src={b.articlepic}
                                            alt=""
                                            style={{ width: '100%', verticalAlign: 'top', height: 200 }}
                                            onLoad={() => {

                                                window.dispatchEvent(new Event('resize'));

                                            }}
                                        />
                                        <p className="p-style">{b.title}</p>
                                    </Link>
                                )
                            })
                        }
                    </Carousel>
                    <Nav />
                    <HomeList />
                </WingBlank>
            </div>
        )
    }
}