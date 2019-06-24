

import "./index.scss"
import { Head } from "~/components/head"
import axios from "@/utils/axios"
import { WingBlank, WhiteSpace, Card, Stepper, Button } from "antd-mobile";

export class Good extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: null,
            count: 1
        }
    }

    componentWillMount() {
        axios.get("/vue/getGoodOne", {
            params: {
                goodId: this.props.match.params.goodId
            }
        }).then(res => {
            this.setState({
                data: res.data.result
            })
        })
    }

    changeCount = (val) => {
        console.log(val);
    }
    render() {
        const {
            location,
            match
        } = this.props;
        const {
            data,
            count
        } = this.state;
        return (
            <div className="">
                <Head title={new URLSearchParams(location.search).get('name')} show={true}> </Head>
                {
                    this.state.data && <div>
                        <WingBlank>
                            <WhiteSpace />
                            <Card>
                                <Card.Header
                                    title={data.type.text}
                                    thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
                                    extra={<span>商品详情</span>}
                                />
                                <Card.Body>
                                    <div>
                                        <img src={data.img} alt="" style={{ width: "100%", height: 300 }} />
                                        <h2>
                                            {data.name} --- 折扣 {data.discount} -- 价格  {data.price}
                                        </h2>
                                    </div>
                                </Card.Body>
                                <Card.Footer content="点赞" extra={<div>评论</div>} />
                            </Card>
                            <div>
                                购买数量 :
                            <Stepper
                                    showNumber
                                    min={1}
                                    defaultValue={count}
                                    onChange={this.changeCount}
                                />

                            </div>
                        </WingBlank>
                        <WhiteSpace />
                        <Button type="primary" inline>加入购物车</Button>
                        <Button type="warning" inline>立即购买</Button>

                    </div>
                }
            </div>
        )
    }
}