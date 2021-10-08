
import { useQuery } from "@apollo/client";
import { LoadingButton } from "@mui/lab";
import { Button, TextField, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { GET_USER_INFO } from "../../Graphql/schema";
import '../../Style/Login.css'

interface UserInfoType {
    firstname: String,
    lastname: String,
    login: String,
    credits: Number,
    gpa: String,
    picture: String,
    semester: Number,
    studentyear: String,
    promo: Number,
    scolaryear: String
}

interface Props {
    setConnected: any
}

const Login = ({ setConnected }: Props) => {

    const [userInput, setUserInput] = useState("")
    const [isLoading, setLoading] = useState(false)
    const { error, refetch } = useQuery(GET_USER_INFO)

    const GetInfo = async () => {
        setLoading(true)
        const data = await refetch({ KeyAuth: userInput })
        console.log("call", data)
        const UserInfo = data.data.GetUserInfo
        if (UserInfo.message) {
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
            setConnected(true)
        }
        setLoading(false)
    }

    return (
        <section className="bg-config">
            <div className="center">
                <div className="box">
                    <Grid container direction="column" spacing={3}>
                        <Grid item>
                            <div>Pour utiliser l'application vous devez vous connecter a l'aide de vous lien autologin d'epitech</div>
                        </Grid>

                        <Grid item>
                            <TextField
                                placeholder={"https://intra.epitech.eu/[Key]"}
                                value={userInput}
                                fullWidth
                                onChange={(e) => setUserInput(e.target.value)}
                            >
                                Votre clef autologin
                            </TextField>
                        </Grid>
                        <Grid item>
                            <LoadingButton
                                loading={isLoading}
                                onClick={() => {
                                    GetInfo()
                                }}
                            >
                                Se connecter
                            </LoadingButton>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </section >
    )
}

export default Login;