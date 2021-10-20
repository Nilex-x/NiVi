import { Button, CircularProgress, Drawer, Hidden } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import RootStore from "../../store";
import '../../Style/Home.css'
import BlockAccess from "../BlockAccess/BlockAccess";
import { BrowserRouter } from "react-router-dom";
import Login from "../Login/Login";
import RouteLogin from "./RouteLogin";

const Navigation = () => {

    const [isLoading, setLoading] = useState(true)

    const { userLogin } = RootStore.getInstance()

    useEffect(() => {
        setLoading(true)
        const authKey = localStorage.getItem("KeyAuth")
        if (authKey) {
            userLogin.login(authKey)
        }
        setLoading(false)
    }, [])

    if (isLoading) return (<CircularProgress />)
    else if (!userLogin.isLoggedIn) return (<Login />)

    return (
        <BrowserRouter>
            <RouteLogin/>
        </BrowserRouter>
    )
}

export default observer(Navigation);