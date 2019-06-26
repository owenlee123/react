
import "./index.scss";
import { Route, Switch, Redirect } from "react-router-dom";
import { Esp } from "../esp";
import { Gbr } from "../gbr";
import { Chn } from "../chn";
import { My } from "../my";
import { Foot } from "@/scripts/components/foot";
import { Mfoot } from "@/scripts/components/mFoot";
import { Home } from "../home";
import { Global } from "../global";
import { Search } from "../search";

export class App extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path="/app/home" component={Home} />
                    <Route path="/app/gbr" component={Gbr} />
                    <Route path="/app/chn" component={Chn} />
                    <Route path="/app/esp" component={Esp} />
                    <Route path="/app/global" component={Global} />
                    <Route path="/app/my" component={My} />
                    <Route path="/app/search" component={Search} />
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