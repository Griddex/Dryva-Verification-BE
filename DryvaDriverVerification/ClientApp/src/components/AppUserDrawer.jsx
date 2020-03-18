import React, { useState, Suspense, lazy } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MenuList from "@material-ui/core/MenuList";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Tooltip from "@material-ui/core/Tooltip";
import { Route, Switch, Link, Redirect } from "react-router-dom";
import unauthorized from "./unauthorized";
import authService from "./../services/authService";
import iconsService from "./../services/iconsService";

const VehicleRoute = lazy(() => import("../Routes/Vehicle/vehicleroute"));
const DriversListRoute = lazy(() =>
    import("../Routes/DriversList/DriversListRoute")
);
const RegisterRoute = lazy(() =>
    import("../Routes/Admin/Register/registerroute")
);
const RolesRoute = lazy(() => import("../Routes/Admin/rolesroute"));
const RegistrationSuccess = lazy(() =>
    import("./../Routes/Admin/Register/registrationSuccess")
);
const EmailSettingsRoute = lazy(() =>
    import("./../Routes/Admin/Settings/SmtpRoute")
);
const OfficersManagementRoute = lazy(() => import("./OfficerManagementForm"));

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex"
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    menuButton: {
        marginRight: 36
    },
    hide: {
        display: "none"
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: "nowrap"
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    drawerClose: {
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        overflowX: "hidden",
        width: theme.spacing(24) + 1,
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing(30) + 1
        }
    },
    toolbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: theme.spacing(0, 1),
        backgroundColor: "#6C6C6C",
        ...theme.mixins.toolbar
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3)
    },
    link: {
        margin: theme.spacing(1, 1.5)
    }
}));

export default function OfficerDrawer(props) {
    const { history } = props;
    const auth = authService("identity");
    const currentRole = auth.Role;

    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState("");

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleClick = (text, e) => {
        setSelected(text);
    };
    const menuText = link => {
        const menuLinkText = {
            "/Auth/register": "Officer's Registration",
            "/Auth/roles_and_permissions": "Roles and Permissions",
            "/Auth/officers_management": "Officers Management",
            "/Auth/settings": "Email Settings",
            "/Auth/verification": "Drivers Verification",
            "/Auth/DriversList": "Drivers Records"
        };

        return menuLinkText[link];
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Dryva Driver Verification
          </Typography>
                    <div
                        style={{
                            marginLeft: "auto",
                            marginRight: 0
                        }}
                    >
                        <Typography variant="h6" color="inherit">
                            Welcome {auth.sub} [{auth.Role}]
            </Typography>
                        <Button
                            size="small"
                            variant="outlined"
                            onClick={() => {
                                sessionStorage.clear();
                                history.replace("/logout");
                            }}
                        >
                            Logout
            </Button>
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open
                    })
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === "rtl" ? (
                            <ChevronRightIcon />
                        ) : (
                                <ChevronLeftIcon />
                            )}
                    </IconButton>
                </div>
                <Divider />
                {currentRole && currentRole === "Admin" ? (
                    <MenuList>
                        {[
                            `/Auth/register`,
                            `/Auth/roles_and_permissions`,
                            `/Auth/officers_management`,
                            `/Auth/settings`,
                            `/Auth/verification`,
                            `/Auth/DriversList`
                        ].map((text, index) => (
                            <Tooltip
                                key={text}
                                title={menuText(text)}
                                placement="right"
                                interactive
                                arrow
                            >
                                <MenuItem
                                    component={Link}
                                    to={text}
                                    selected={text === selected}
                                    onClick={e => handleClick(text, e)}
                                    style={{ padding: "0.8em" }}
                                >
                                    <ListItemIcon>{iconsService(text)}</ListItemIcon>
                                    <Typography>{menuText(text)}</Typography>
                                </MenuItem>
                            </Tooltip>
                        ))}
                    </MenuList>
                ) : (
                        <MenuList>
                            {[`/Auth/verification`, `/Auth/DriversList`].map((text, index) => (
                                <Tooltip
                                    key={text}
                                    title={menuText(text)}
                                    placement="right"
                                    interactive
                                    arrow
                                >
                                    <MenuItem
                                        component={Link}
                                        to={text}
                                        selected={text === selected}
                                        onClick={e => handleClick(text, e)}
                                        style={{ padding: "0.8em" }}
                                    >
                                        <ListItemIcon>{iconsService(text)}</ListItemIcon>
                                        <Typography>{menuText(text)}</Typography>
                                    </MenuItem>
                                </Tooltip>
                            ))}
                        </MenuList>
                    )}
            </Drawer>
            {currentRole && currentRole === "Admin" ? (
                <main className={classes.content}>
                    <div className={classes.toolbar} />
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
                            <Route
                                exact
                                path={`/Auth/register`}
                                render={props => <RegisterRoute {...props} />}
                            />
                            <Route
                                exact
                                path={`/Auth/registration_success`}
                                component={RegistrationSuccess}
                            />

                            <Route
                                exact
                                path={`/Auth/roles_and_permissions`}
                                render={props => <RolesRoute {...props} />}
                            />
                            <Route
                                exact
                                path={`/Auth/officers_management`}
                                render={props => <OfficersManagementRoute {...props} />}
                            />
                            <Route
                                exact
                                path={`/Auth/settings`}
                                render={props => <EmailSettingsRoute {...props} />}
                            />
                            <Route
                                exact
                                path={`/Auth/verification`}
                                render={props => <VehicleRoute {...props} />}
                            />
                            <Route
                                exact
                                path={`/Auth/DriversList`}
                                render={props => (
                                    <DriversListRoute {...props} currentRole={currentRole} />
                                )}
                            />
                        </Switch>
                    </Suspense>
                </main>
            ) : (
                    <main className={classes.content}>
                        <div className={classes.toolbar} />
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
                                <Route
                                    exact
                                    path={`/Auth/verification`}
                                    render={props => <VehicleRoute {...props} />}
                                />
                                <Route
                                    exact
                                    path={`/Auth/DriversList`}
                                    render={props => <DriversListRoute {...props} />}
                                />
                                <Route path={`/Auth/unauthorized`} component={unauthorized} />
                                <Redirect from="*" to={`/Auth/unauthorized`} />
                            </Switch>
                        </Suspense>
                    </main>
                )}
        </div>
    );
}