
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { Guide } from "./guide";
import { App } from "./app";
import PropTypes from "prop-types";
import { Search } from "./search";
import { Login } from "./login";
import { Good } from "./good";
export class IndexView extends Component {
    render() {
        return (
            <Router>
                <div id='main'>
                    <Route path="" exact component={Layout} />
                </div>
            </Router>
        )
    }
}

// 路由配置 在Layout这里配置
export class Layout extends Component {

    getChildContext() {   //context  第一步
        return {
            props: this.props
        }
    }

    render() {
        return (
            <Switch>
                <Route path="/" exact render={() => (<Redirect to="/guide" />)} />
                <Route path="/guide" component={Guide} />
                <Route path="/app/" strict component={App} />
                <Route path="/search" component={Search} />
                <Route path="/login" component={Login} />
                <Route path="/good/detail/:newsId?" component={Good} />
                <Route
                    render={
                        () => (<Redirect to="/app/" />)
                    }
                />
            </Switch>
        )
    }
}

Layout.childContextTypes = {   //context 第二步
    props: PropTypes.object
}