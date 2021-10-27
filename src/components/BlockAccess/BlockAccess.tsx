
import { LoadingButton } from "@mui/lab";
import { Grid } from "@mui/material";
import { useState } from "react";
import "../../Style/app.css";
import Query from "../../Graphql/Query";
import Logo from "../../assets/NIVILogo.png";
import { observer } from "mobx-react-lite";
import RootStore from "../../store";

const BlockAccess = () => {

    const [isLoading, setLoading] = useState(false)
    const [nbRetry, setNbRetry] = useState(0)
    const queries = new Query()
    const { userLogin } = RootStore.getInstance()

    const getGraphqlStatus = async () => {
        setNbRetry(nbRetry + 1)
        const authKey = localStorage.getItem("KeyAuth")
        try {
            const data = await queries.Login(authKey)
            userLogin.setStatusGraphql(true)
        } catch (err) {
            console.log("graphql error") //JSON.stringify(err, null, 2)
        } finally {
            setLoading(false)
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

export default observer(BlockAccess);