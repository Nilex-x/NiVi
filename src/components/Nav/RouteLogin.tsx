import { AppBar, Button, IconButton, Menu, MenuItem, Toolbar, Typography, CircularProgress } from "@mui/material";
import { observer } from "mobx-react-lite";
import { lazy, Suspense, useState } from "react";
import { Route, Switch } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import { AccountCircle } from "@mui/icons-material";
import RootStore from "../../store";
import { useHistory } from "react-router-dom";
import "../../Style/app.css"

// import ProfilUI from "../Profil/ProfilUI";

const ProfilUI = lazy(() => import("../ui/ProfilUI"))

//import NotFound from "../BlockAccess/NotFound";

const NotFound = lazy(() => import('../BlockAccess/NotFound'));

//import HomeUI from "../Home/index"

const HomeUI = lazy(() => import('../ui/HomeUi'));

import PlanningUI from "../ui/PlanningUi";

//const PlanningUI = lazy(() => import("../ui/PlanningUi"))

//import ModuleUI from "../ui/ModuleUI";

const ModuleUI = lazy(() => import("../ui/ModuleUI"))

//import ModuleDetailUI from "../ui/ModuleDetail";

const ActiDetailUI = lazy(() => import("../ui/ActiDetail"))

const RouteLogin = () => {

    const history = useHistory()

    const [profilOpen, setProfilOpen] = useState<null | HTMLElement>(null)
    const [menuOpen, setMenuOpen] = useState<null | HTMLElement>(null)

    const { userLogin } = RootStore.getInstance()

    return (
        <section>
            <AppBar position="static" color="default" style={{ borderRadius: 20 }}>
                <Toolbar className="space-around">
                    <IconButton
                    onClick={(e) => setMenuOpen(e.currentTarget)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        anchorEl={menuOpen}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={Boolean(menuOpen)}
                        onClose={(e) => setMenuOpen(null)}
                    >
                        <MenuItem onClick={(e) => { history.push("/"); setMenuOpen(null) }}>Accueil</MenuItem>
                        <MenuItem onClick={(e) => { history.push("/planning"); setMenuOpen(null) }}>Planning</MenuItem>
                    </Menu>
                    <Typography variant="h5" align="center" sx={{ cursor: "pointer" }} onClick={() => history.push('/')}>
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
                            vertical: 'bottom',
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
                        <MenuItem onClick={(e) => { history.push("/user"); setProfilOpen(null) }}>Profil</MenuItem>
                        <MenuItem onClick={(e) => userLogin.logout()}>Se déconnecter</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            <Suspense fallback={<div style={{ alignSelf: "center" }}><CircularProgress /></div>}>
                <div className="box">
                    <Switch>
                        <Route exact path="/" component={HomeUI} />
                        <Route path="/user" component={ProfilUI} />
                        <Route path="/planning" component={PlanningUI} />
                        {/* <Route path="/modules" component={ModuleUI} /> */}
                        <Route exact path="/module/:scolaryear/:codemodule/:codeinstance/:codeacti" component={ActiDetailUI} />
                        <Route path="/*" component={NotFound} />
                    </Switch>
                </div>
            </Suspense>
        </section>
    )
}

export default observer(RouteLogin)