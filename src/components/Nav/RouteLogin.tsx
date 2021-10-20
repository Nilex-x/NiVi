import { CircularProgress } from "@mui/material";
import { observer } from "mobx-react-lite";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

//import NotFound from "../BlockAccess/NotFound";

const NotFound = lazy(() => import('../BlockAccess/NotFound'));

//import HomeUI from "../Home/index"

const HomeUI = lazy(() => import('../Home/index'));


const RouteLogin = () => {
    return (
        <Suspense fallback={<div style={{ alignSelf: "center" }}><CircularProgress /></div>}>
            <Switch>
                <Route exact path="/" component={HomeUI} />
                <Route path="/*" component={NotFound} />
            </Switch>
        </Suspense>
    )
}

export default observer(RouteLogin)