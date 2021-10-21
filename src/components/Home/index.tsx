import { CircularProgress, Grid, LinearProgress, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import RootStore from "../../store";
import { useEffect, useState } from "react";
import Query from "../../Graphql/Query";
import format from "date-fns/format";
import fr from "date-fns/locale/fr";


interface Projects {
    title: String
    code_acti: String
    code_module: String
    scolaryear: String
    codeinstance: String
    timeline_start: String
    timeline_end: String
    timeline_barre: Number
}

interface Notes {
    title: String
    code_acti: String
    code_module: String
    scolaryear: String
    codeinstance: String
    note: String
    noteur: String
}

interface ActivitesBoard {
    title: String
    code_acti: String
    code_module: String
    scolaryear: String
    codeinstance: String
    module: String
    timeline_start: String
    timeline_end: String
    timeline_barre: Number
    salle: String
    registerLink: String
}


interface UserHistory {
    picture: String
    title: String
}

interface History {
    title: String
    user: UserHistory
    content: String
    date: String
}

interface Board {
    projets: Array<Projects>
    notes: Array<Notes>
    activites: Array<ActivitesBoard>
    historys: Array<History>
}

const homeUI = () => {

    const [boardInfo, setBoardInfo] = useState<null | Board | any>(null)
    const [isLoading, setLoading] = useState<Boolean>(false)

    const queries = new Query()
    const { userLogin } = RootStore.getInstance()

    const getBoard = async () => {
        setLoading(true)
        try {
            const response = await queries.getBoard(userLogin.authKey)
            console.log("response", response.data.GetBoard)
            setBoardInfo(response.data.GetBoard)
            setLoading(false)
        } catch (err) {
            console.log("graphql error", JSON.stringify(err, null, 2))
        }
    }

    const getFormat = (date) => {
        const formatDate = format(new Date(date), "iii dd MMM - H:mm", { locale: fr })
        return formatDate
    }

    useEffect(() => {
        getBoard()
    }, [])

    return (
        <section>
            <Typography variant="h4" align="center">Accueil</Typography>
            {isLoading ?
                <div className="center">
                    <CircularProgress />
                </div>
                :
                <div>
                    <div>
                        <Grid container spacing={2} rowSpacing={2}>
                            <Grid item xs={6}>
                                <div className="box">
                                    <Typography variant="h5" align="center">Projects</Typography>
                                    <div className="box-scrool-280">
                                        {boardInfo && boardInfo?.projets.map((projet, index) => (
                                            <div className="box-info" key={index}>
                                                <div className="marginbot-5">
                                                    {projet.title}
                                                </div >
                                                <div className="marginbot-5">
                                                    <LinearProgress
                                                        value={projet.timeline_barre}
                                                        variant="determinate"
                                                        className="VolumeBar"
                                                    />
                                                </div>
                                                <div className="space-between">
                                                    <div>
                                                        {getFormat(projet.timeline_end)}
                                                    </div>
                                                    <div>
                                                        {getFormat(projet.timeline_start)}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <div className="box">
                                    <Typography variant="h5" align="center">Notes</Typography>
                                    <div className="box-scrool-280">
                                        {boardInfo && boardInfo?.notes.map((note, index) => (
                                            <div className="box-info" key={index}>
                                                <div className="space-between">
                                                    <div>
                                                        note: {note.note}
                                                    </div>
                                                    <div>
                                                        {note.title}
                                                    </div>
                                                </div>
                                                <div>
                                                    noteur: {note.noteur}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} rowSpacing={2}>
                            <Grid item xs={12}>
                                <div className="box">
                                    <Typography variant="h5" align="center">Activités</Typography>
                                    <div className="box-scrool-280">
                                        {boardInfo && boardInfo?.activites.map((activite, index) => (
                                            <div className="box-info" key={index}>
                                                <div className="space-between marginbot-5">
                                                    <div>
                                                        Salle: {activite.salle}
                                                    </div>
                                                    <div>
                                                        {activite.title} | {activite.module}
                                                    </div>
                                                </div>
                                                <div className="marginbot-5">
                                                    <LinearProgress
                                                        value={activite.timeline_barre}
                                                        variant="determinate"
                                                        className="VolumeBar"
                                                    />
                                                </div>
                                                <div className="space-between">
                                                    <div>
                                                        {getFormat(activite.timeline_end)}
                                                    </div>
                                                    <div>
                                                        {getFormat(activite.timeline_start)}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <Typography variant="h4" align="center">Historique</Typography>
                        <div className="box">
                            <div className="box-scroll-500">
                                {boardInfo && boardInfo?.historys.map((history, index) => (
                                    <div key={index} className="marginbot-10" >
                                        <div dangerouslySetInnerHTML={{ __html: history.title }} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>}
        </section >
    )
}

export default observer(homeUI)