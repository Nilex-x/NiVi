import { useQuery } from "@apollo/client";
import { LoadingButton } from "@mui/lab";
import { TextField, Grid, Button } from "@mui/material";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { GET_USER_INFO } from "../../Graphql/schema";
import '../../Style/Login.css'
import Logo from "../../assets/NIVILogo.png"

const BlockAccess = ({ setStatus }) => {

    const [isLoading, setLoading] = useState(false)
    const [nbRetry, setNbRetry] = useState(0)
    const { refetch } = useQuery(GET_USER_INFO)

    const getGraphqlStatus = async () => {
        setNbRetry(nbRetry + 1)
        setLoading(true)
        try {
            const data = await refetch({ KeyAuth: "" })
            setStatus(true)
        } catch (e) {
            setStatus(false)
        }
        setLoading(false)
    }

    return (
        <section>
            <div className="center">
                <img src={Logo} />
                <div className="box">
                    <Grid container direction="column" spacing={3}>
                        <Grid item>
                            <div>Les services de NiVi soluce ne sont pas disponibles à ce moment veuillez réessayer ultérieurement ou cliquer sur le bouton pour rafraîchir</div>
                        </Grid>
                        <Grid item>
                            <div className="space-between">
                                <LoadingButton
                                    loading={isLoading}
                                    onClick={() => getGraphqlStatus()}
                                >
                                    Actualisé
                                </LoadingButton>
                                <div>Nombres d'actualité: {nbRetry}</div>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </section >
    )
}

export default BlockAccess;