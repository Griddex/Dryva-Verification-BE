import React, { Suspense, lazy } from "react";
import { Route, Switch } from "react-router-dom";
import OfficerDrawer from "./components/AppUserDrawer";
import ProtectedRoute from "./Routes/ProtectedRoute";
import Grid from "@material-ui/core/Grid";

const LandingRoute = lazy(() => import("./Routes/Landing/landingroute"));
const LoginRoute = lazy(() => import("./Routes/Login/loginroute"));

const App = () => {
    return (
        <Grid
            container
            justify="center"
            alignItems="center"
            spacing={0}
            direction="column"
            style={{ minWidth: 800 }}
        >
            <React.Fragment>
                <Suspense
                    fallback={
                        <div
                            style={{
                                width: "100%",
                                margin: "auto",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: "200px"
                            }}
                        >
                            <h2>Loading...</h2>
                        </div>
                    }
                >
                    <Switch>
                        <Route exact path="/" component={LandingRoute} />
                        <Route exact path="/login" component={LoginRoute} />
                        <Route exact path="/logout" component={LandingRoute} />
                        <ProtectedRoute
                            path={`/Auth`}
                            roles={["Officer", "Admin"]}
                            component={OfficerDrawer}
                        />
                    </Switch>
                </Suspense>
            </React.Fragment>
        </Grid>
    );
};

export default App;