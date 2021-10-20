import { AppBar, Button, IconButton, Menu, MenuItem, Toolbar, Typography, CircularProgress } from "@mui/material";
import { observer } from "mobx-react-lite";
import { lazy, Suspense, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import { AccountCircle } from "@mui/icons-material";
import RootStore from "../../store";
import { useHistory } from "react-router-dom";
import "../../Style/appBar.css"

// import ProfilUI from "../Profil/ProfilUI";

const ProfilUI = lazy(() => import("../Profil/ProfilUI"))

//import NotFound from "../BlockAccess/NotFound";

const NotFound = lazy(() => import('../BlockAccess/NotFound'));

//import HomeUI from "../Home/index"

const HomeUI = lazy(() => import('../Home/index'));

const RouteLogin = () => {

    const history = useHistory()

    const [profilOpen, setProfilOpen] = useState<null | HTMLElement>(null)

    const { userLogin } = RootStore.getInstance()

    return (
        <section>
            <AppBar position="static" color="default" style={{ borderRadius: 20 }}>
                <Toolbar>
                    <IconButton>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h5" align="center" component="div" className="appbar-title" sx={{ flexGrow: 1 }} onClick={() => history.push('/')}>
                        NiVi Soluce
                    </Typography>
                    <IconButton
                        size="large"
                        onClick={(e) => setProfilOpen(e.currentTarget)}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        anchorEl={profilOpen}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(profilOpen)}
                        onClose={(e) => setProfilOpen(null)}
                    >
                        <MenuItem onClick={(e) => { history.push("/user"); setProfilOpen(null) }}>Profile</MenuItem>
                        <MenuItem onClick={(e) => userLogin.logout()}>Se déconnecter</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            <Suspense fallback={<div style={{ alignSelf: "center" }}><CircularProgress /></div>}>
                <div className="box">
                    <Switch>
                        <Route exact path="/" component={HomeUI} />
                        <Route path="/user" component={ProfilUI} />
                        <Route path="/*" component={NotFound} />
                    </Switch>
                </div>
            </Suspense>
        </section>
    )
}

export default observer(RouteLogin)