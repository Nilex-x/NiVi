import { AppBar, Button, CircularProgress, Grid, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import RootStore from "../../store";
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect, useState } from "react";
import { AccountCircle } from "@mui/icons-material";
import Query from "../../Graphql/Query";

interface UserInfoType {
    firstname: String
    lastname: String
    login: String
    credits: number
    gpa: String
    picture: String
    semester: number
    studentyear: String
    promo: number
    scolaryear: String
}

const ProfilUI = () => {

    const { userLogin } = RootStore.getInstance()
    const queries = new Query()
    const [userInfo, setUserInfo] = useState(null)
    const [isLoading, setLoading] = useState(false)

    const getUserInfo = async () => {
        setLoading(true)
        try {
            const response = await queries.getUserInfo(userLogin.authKey)
            console.log("response", response)
            setUserInfo(response.data.GetUserInfo)
        } catch (err) {
            console.log("graphql error", JSON.stringify(err, null, 2))
        }
        setLoading(false)
    }

    useEffect(() => {
        getUserInfo()
    }, [])

    return (
        <section>
            {/* <Grid>

            </Grid> */}
            <div>
                Profil
                {isLoading ?
                    <CircularProgress />
                    :
                    <div>
                        {userInfo?.firstname}
                        {userInfo?.lastname}
                        {userInfo?.login}
                    </div>
                }
            </div>
        </section>
    )
}

export default observer(ProfilUI)