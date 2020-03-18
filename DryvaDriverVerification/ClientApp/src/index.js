import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Router } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import history from "./services/historyService";
import thunk from "redux-thunk";
import { userReducer } from "./reducers/userReducer";
import { saveOrSubmitReducer } from "./reducers/saveOrSubmitReducer";
import { rolesReducer } from "./reducers/rolesReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware, combineReducers } from "redux";
import httpLogin from "./services/httpService/httpLogin";
import httpOthers from "./services/httpService/httpOthers";
import httpRegister from "./services/httpService/httpRegister";
import { setToken } from "./services/authService";

const rootReducer = combineReducers({
    userReducer,
    saveOrSubmitReducer,
    rolesReducer
});

const setAuthToken = store => next => action => {
    if (action.type === "LOGIN_USER_SUCCESS") {
        setToken(action.payload.token);
    }
    return next(action);
};

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(
            setAuthToken,
            thunk.withExtraArgument({ httpLogin, httpRegister, httpOthers })
        )
    )
);

const theme = createMuiTheme({
    palette: { primary: { main: "#6192A6" } },
    background: "#EFEFEF",
    spacing: 2
});

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <Router history={history}>
                <App />
            </Router>
        </ThemeProvider>
    </Provider>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();