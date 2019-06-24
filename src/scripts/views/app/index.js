
import "./index.scss";
import { Route, Switch, Redirect } from "react-router-dom";
import { Home } from "../home";
import { Classify } from "../classify";
import { Cart } from "../cart";
import { My } from "../my";
import { Foot } from "@/scripts/components/foot";
import { Mfoot } from "@/scripts/components/mFoot";

export class App extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path="/app/home" component={Home} />
                    <Route path="/app/classify" component={Classify} />
                    <Route path="/app/cart" component={Cart} />
                    <Route path="/app/my" component={My} />
                    <Route
                        render={
                            () => (<Redirect to="/app/home" />)
                        }
                    />
                </Switch>
                {/* <Foot></Foot> */}
                <Mfoot />
            </div>
        )
    }
}