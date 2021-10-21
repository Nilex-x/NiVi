import { AppBar, Button, CircularProgress, Grid, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import RootStore from "../../store";
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect, useState } from "react";
import { AccountCircle } from "@mui/icons-material";
import Query from "../../Graphql/Query";
import '../../Style/app.css'

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
    const [userInfo, setUserInfo] = useState<null | UserInfoType | any>(null)
    const [isLoading, setLoading] = useState(false)

    const getUserInfo = async () => {
        setLoading(true)
        try {
            const response = await queries.getUserInfo(userLogin.authKey)
            //console.log("response", response.data.GetUserInfo)
            setUserInfo(response.data.GetUserInfo)
        } catch (err) {
            console.log("graphql error") //JSON.stringify(err, null, 2)
        }
        setLoading(false)
    }

    useEffect(() => {
        getUserInfo()
    }, [])

    return (
        <section>
            <div>
                <Typography variant="h4" align="center">Profil</Typography>
                {isLoading ?
                    <CircularProgress />
                    :
                    // <div>
                    //     {userInfo?.firstname}
                    //     {userInfo?.lastname}
                    //     {userInfo?.login}
                    // </div>
                    <Grid container spacing={2} direction="row" wrap="wrap">
                        <Grid item xs={8}>
                            <div className="box">
                                <Typography variant="h5" align="center" style={{ textDecoration: "underline", marginBottom: 10 }}>Info General</Typography>
                            </div>
                        </Grid>
                        <Grid item xs={4}>
                            <div className="box">
                                <Typography variant="h5" align="center" style={{ textDecoration: "underline", marginBottom: 10 }}>Info Profil</Typography>
                                <div className="profil-info">
                                    <div>
                                        <img src={userInfo?.picture} />
                                    </div>
                                    <div style={{ marginTop: 5 }}>
                                        <Grid container spacing={3} direction="column">
                                            <Grid item>
                                                <div>
                                                    {userInfo?.firstname} {userInfo?.lastname}
                                                </div>
                                            </Grid>
                                            <Grid item>
                                                <div>
                                                    Email: {userInfo?.login}
                                                </div>
                                            </Grid>
                                            <Grid item>
                                                <div>
                                                    GPA: {userInfo?.gpa}
                                                </div>
                                            </Grid>
                                            <Grid item>
                                                <div>
                                                    Crédits: {userInfo?.credits}
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                }
            </div>
        </section>
    )
}

export default observer(ProfilUI)