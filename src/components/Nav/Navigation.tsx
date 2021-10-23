import { Button, CircularProgress, Drawer, Hidden } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import RootStore from "../../store";
import BlockAccess from "../BlockAccess/BlockAccess";
import { BrowserRouter } from "react-router-dom";
import Login from "../ui/Login";
import RouteLogin from "./RouteLogin";
import Query from "../../Graphql/Query";

const Navigation = () => {

    const [isLoading, setLoading] = useState(true)

    const { userLogin } = RootStore.getInstance()
    const queries = new Query()

    const getInfo = async () => {
        const authKey = localStorage.getItem("KeyAuth")
        if (authKey) {
            console.log("key", authKey)
            try {
                const data = await queries.getUserInfo(authKey)
                const userInfo = data.data.GetUserInfo
                const { firstname, lastname, login, semester } = userInfo
                userLogin.login(authKey, login, firstname, lastname, semester)
            } catch (err) {
                console.log("graphql error", err)
            } finally {
                setLoading(false)
            }
        } else {
            setLoading(false)
        }
    }

    useEffect(() => {
        setLoading(true)
        getInfo()
    }, [])

    if (isLoading) return (<CircularProgress />)
    else if (!userLogin.isLoggedIn) return (<Login />)

    return (
        <BrowserRouter>
            <RouteLogin />
        </BrowserRouter>
    )
}

export default observer(Navigation);