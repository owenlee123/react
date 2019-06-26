
import "./index.scss";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getNews } from "../../actions";

@connect(
    state => ({ ...state.data })
)
export class HomeList extends Component {
    componentDidMount() {
        console.log(this.props);
        const { dispatch } = this.props;
        dispatch(getNews({
            url: "/react/getListNews",
            params: {
                type: "internation"
            },
            cb() { }
        }));
    }
    render() {
        return (
            <div className="vFootball_main">
                <div className="vMod_newsList">
                    {
                        this.props.news.map((n, i) => {
                            return (
                                <Link key={i} to={"/good/detail/" + n._id} className="vMod_newsList_item move-in">
                                    <div className="picture">
                                        <img src={n.smallimg} alt="" />
                                    </div>
                                    <h4 className="title">{n.title}</h4>
                                    <div className="info">
                                        <b className="info_tag">{n.tag}</b>
                                        <span className="info_comment">{n.comment}评</span>
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
} 