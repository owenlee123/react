
import ReactDOM, { render } from "react-dom";  // ReactDOM.render(组件,根节点)
import { IndexView } from "./views";


const rootEle = document.getElementById("app");

import { Provider } from "react-redux";   //这是最外层根组件
import store from "./store";
const hotRender = () => {   //这里形参首字母必须大写 
    render(
        <Provider store={store}>
            <IndexView />
        </Provider>,
        rootEle
    );
}

hotRender();
