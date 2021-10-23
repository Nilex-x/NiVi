import { useQuery } from "@apollo/client";
import { LoadingButton } from "@mui/lab";
import { TextField, Grid, Button } from "@mui/material";
import { useState } from "react";
import Swal from "sweetalert2";
import { GET_USER_INFO } from "../../Graphql/schema";
import '../../Style/app.css'
import Logo from "../../assets/NIVILogo.png"
import { observer } from "mobx-react-lite";
import RootStore from "../../store";
import Query from "../../Graphql/Query";


const Login = () => {

    const [userInput, setUserInput] = useState("")
    const [isLoading, setLoading] = useState(false)

    const queries = new Query()

    const { userLogin } = RootStore.getInstance()

    const GetInfo = async () => {
        setLoading(true)
        try {
            const data = await queries.getUserInfo(userInput)
            const userInfo = data.data.GetUserInfo
            if (userInfo.login === "") {
                Swal.fire({
                    icon: "error",
                    title: "Votre clef autologin est inconnue",
                    text: "Votre clef que vous avez donnée n'est pas trouvé dans l'intra veuillez vérifier votre clef et réessayer",
                    footer: '<a href="https://intra.epitech.eu/admin/autolog" target="_blank">Cliquer ici pour trouver votre clef</a>'
                })
            } else {
                userLogin.login(userInput, userInfo.login, userLogin.firstName, userInfo.lastname, userInfo.semester)
            }
            setLoading(false)
        } catch (e) {
            setLoading(false)
            return
        }
    }

    return (
        <section>
            <div className="center">
                <img src={Logo} />
                <div className="box">
                    <Grid container direction="column" spacing={3}>
                        <Grid item>
                            <div>Pour utiliser l'application vous devez vous connecter a l'aide de votre lien autologin d'epitech</div>
                        </Grid>

                        <Grid item>
                            <TextField
                                placeholder={"https://intra.epitech.eu/[Key]"}
                                value={userInput}
                                fullWidth
                                onChange={(e) => setUserInput(e.target.value)}
                                onKeyPress={(e) => {
                                    if (e.code == "Enter" && !isLoading) {
                                        GetInfo()
                                    }
                                }}
                            >
                                Votre clef autologin
                            </TextField>
                        </Grid>
                        <Grid item>
                            <div className="space-between">
                                <LoadingButton
                                    loading={isLoading}
                                    onClick={() => GetInfo()}
                                >
                                    Se connecter
                                </LoadingButton>
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => window.open("https://intra.epitech.eu/admin/autolog", '_blank')}
                                >
                                    Get My Key
                                </Button>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </section >
    )
}

export default observer(Login);