import { useQuery } from "@apollo/client";
import { LoadingButton } from "@mui/lab";
import { TextField, Grid, Button } from "@mui/material";
import { useState } from "react";
import Swal from "sweetalert2";
import { GET_USER_INFO } from "../../Graphql/schema";
import '../../Style/Login.css'
import Logo from "../../assets/NIVILogo.png"

const Login = ({ setStatus }) => {

    const [userInput, setUserInput] = useState("")
    const [isLoading, setLoading] = useState(false)
    const { refetch } = useQuery(GET_USER_INFO)

    const GetInfo = async () => {
        setLoading(true)
        try {
            const data = await refetch({ KeyAuth: userInput })
            console.log("call", data)
            const UserInfo = data.data.GetUserInfo
            if (UserInfo.message || data.error) {
                Swal.fire({
                    icon: "error",
                    title: "Erreur interne",
                    text: "Les serveurs de l'intra sont indisponible veuillez réessayer ultérieurement",
                    footer: '<a href="https://intra.epitech.eu/admin/autolog" target="_blank">Cliquer ici pour trouver votre clef</a>'
                })
                setLoading(false)
                return
            }
            if (UserInfo.login === "") {
                Swal.fire({
                    icon: "error",
                    title: "Votre clef autologin est inconnue",
                    text: "Votre clef que vous avez donnée n'est pas trouvé dans l'intra veuillez vérifier votre clef et réessayer",
                    footer: '<a href="https://intra.epitech.eu/admin/autolog" target="_blank">Cliquer ici pour trouver votre clef</a>'
                })
            } else {
                localStorage.setItem("KeyAuth", userInput)
                setStatus(true)
            }
            setLoading(false)
        } catch (e) {
            setStatus(true)
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

export default Login;