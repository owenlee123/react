

import { foots } from "../foot";
import "./index.scss";
import { TabBar } from 'antd-mobile';
import { connect } from "react-redux";

// @connect(
//     state => ({
//         ...state.data
//     })
// )
export class Mfoot extends Component {
    state = {
        selectedTab: "home"
    }

    componentWillMount() {
        const { location } = this.context.props;
        var pathname = location.pathname.split("/app/");
        var name = pathname[1];
        this.setState({
            selectedTab: name
        })
    }
    componentWillUpdate() {  //会进入死循环
        console.log("11111")
        // const { location } = this.context.props;
        // var pathname = location.pathname.split("/app/");
        // var name = pathname[1];
        // this.setState({
        //     selectedTab: name
        // })
    }
    render() {
        console.log(this.props);
        return (
            <div className="footer">
                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#33A3F4"
                    barTintColor="white"
                >
                    {
                        foots.map((foot, i) => {
                            return (
                                <TabBar.Item
                                    title={foot.txt}
                                    key={i}
                                    icon={<i
                                        className={"icon iconfont " + foot.icon}
                                        style={{
                                            width: '22px',
                                            height: '22px',
                                            display: "block"
                                        }}
                                    />
                                    }
                                    selectedIcon={<i
                                        className={"icon iconfont " + foot.icon}
                                        style={{
                                            width: '22px',
                                            height: '22px',
                                            display: "block"
                                        }}
                                    />
                                    }
                                    selected={this.state.selectedTab === foot.name}
                                    badge={i==2&&10}
                                    onPress={() => {
                                        console.log(this.context);
                                        const { history } = this.context.props;
                                        history.push(foot.path);
                                        this.setState({
                                            selectedTab: foot.name,
                                        });
                                    }}
                                    data-seed="logId"
                                >
                                </TabBar.Item>
                            )
                        })
                    }

                </TabBar>
            </div>
        )
    }
}

import PropTypes from "prop-types";
Mfoot.contextTypes = {   //context 第三步
    props: PropTypes.object
}