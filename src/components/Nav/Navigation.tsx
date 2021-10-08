
import { useQuery } from "@apollo/client";
import { LoadingButton } from "@mui/lab";
import { Button, TextField, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { GET_USER_INFO } from "../../Graphql/schema";
import '../../Style/Login.css'
import Login from "../Login/Login";

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

const Navigation = () => {

    const [isConnected, setConnected] = useState(false)

    useEffect(() => {
        if (localStorage.getItem("KeyAuth")) {
            setConnected(true)
        }
    }, [])

    if (!isConnected) return (<Login setConnected={setConnected}/>)

    return (
        <section>
            <div>
                Connected
                <div>
                    <Button
                        onClick={() => {
                            localStorage.removeItem("KeyAuth")
                            setConnected(false)
                        }}
                    >
                        Se déconnecter
                    </Button>
                </div>
            </div>
        </section>
    )
}

export default Navigation;