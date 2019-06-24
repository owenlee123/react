
// 封装 swiper props children
// new Swiper()  实例化
import PropTypes from "prop-types";
export default class Swipe extends Component {
    render() {
        const {
            id,
            children
        } = this.props;
        console.log(this.props);
        return (
            <div className="swiper-container" id={id}>
                <div className="swiper-wrapper">
                    {
                        children && children.map((child, index) => {
                            return (
                                child
                            )
                        })
                    }
                </div>
            </div>
        )
    }

    componentDidMount() {
        let { id, options, children } = this.props;
        if (children.length > 0) {  //有数据
            let mySwiper = new Swiper("#" + id, options)
        }

    }

    componentDidUpdate() {
        console.log("update ........");
        let { id, options, children } = this.props;
        if (children.length > 0) {  //有数据
            let mySwiper = new Swiper("#" + id, options)
        }
    }
}
// props 效验
Swipe.propTypes = {
    id: PropTypes.string.isRequired,
    options: PropTypes.object.isRequired
}

// 静态属性
Swipe.item = (props) => {
    console.log(props);
    return (
        <div className="swiper-slide">
            {props.children}
        </div>
    )
}

// export class Slide extends Component {
//     render() {
//         return (
//             <div className="swiper-slide">
//                 {this.props.children}
//             </div>
//         )
//     }
// }