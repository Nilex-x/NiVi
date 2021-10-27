import { observer } from "mobx-react-lite";
import react, { useEffect, useState } from "react";
import "../../Style/app.css";
import { useParams } from "react-router-dom";
import { Typography, CircularProgress, Grid } from "@mui/material";
import Query from "../../Graphql/Query";
import RootStore from "../../store";
import format from "date-fns/format";

interface RespType {
    title: String
    picture: String
}

interface EventType {
    code: String
    seats: String
    title: String
    description: String
    nb_inscrits: String
    begin: string
    end: String
    location: String
    user_status: String
    resp: RespType[]
}

interface ActiType {
    module_title: String
    title: String
    description: String
    type_title: String
    type_code: String
    begin: String
    start: String
    end_register: String
    deadline: String
    end: String
    nb_hours: String
    nb_group: Number
    num: Number
    register: Boolean
    is_projet: Boolean
    is_note: Boolean
    nb_notes: String
    rdv_status: String
    archive: String
    nb_planified: Number
    student_registered: Number
    events: EventType[]
}

const ActiDetailUI = () => {

    const { scolaryear, codemodule, codeinstance, codeacti } = useParams()
    const [isLoading, setLoading] = useState<Boolean>(false)
    const [actiInfo, setActiInfo] = useState<null | ActiType | any>(null)

    const queries = new Query()
    const { userLogin } = RootStore.getInstance()

    const getModuleDetail = async () => {
        try {
            const response = await queries.getActiDetail(userLogin.authKey, scolaryear, codemodule, codeinstance, codeacti)
            const moduleDetail = response.data.GetActiDetail
            //console.log("moduleDetail", moduleDetail)
            const newArray = moduleDetail.nb_hours.split(':').filter((element, index) => index < 2)
            const newHours = `${newArray[0]}h${newArray[1]}`
            const events = [...moduleDetail.events]
            const sortEvents = events.sort((a, b) => (new Date(a.begin).getTime() > new Date(b.begin).getTime()) ? 1 : -1)
            setActiInfo({ ...moduleDetail, hours: newHours, events: sortEvents })
        } catch (err) {
            console.log("graphql error") //JSON.stringify(err, null, 2)
            userLogin.setStatusGraphql(false)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        setLoading(true)
        getModuleDetail()
    }, [])

    return (
        <section>
            <div>
                <Typography variant="h4" align="center">Resumé de l'activité</Typography>
                {isLoading ?
                    <div className="center">
                        <CircularProgress />
                    </div>
                    :
                    <div>
                        <div className="box marginbot-10">
                            <div className="space-between-n-center">
                                <div >
                                    <div>
                                        <b>Durée: </b>{actiInfo?.hours /*format(new Date(), 'kk:mm')*/}
                                    </div>
                                    <div>
                                        <b>Status: </b>{actiInfo?.register ? "inscrit" : "pas inscrit"}
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <b>Nom du Module: </b>{actiInfo?.module_title}
                                    </div>
                                    <div>
                                        <b>Nom de l'activité: </b>{actiInfo?.title}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {actiInfo?.events.length > 0 &&
                            <div>
                                <Typography variant="h4" align="center">Sessions:   </Typography>
                                <div className="box-scroll-500">
                                    {actiInfo?.events.map((event: EventType, index) => (
                                        <div className="box" key={index}>
                                            <Typography variant="h6" align="center">Session: {index} {event.title && `| ${event.title}`}</Typography>
                                            <Grid container spacing={2} >
                                                <Grid item>
                                                    <div>
                                                        <div>
                                                            <b>Salle: </b>{event.location}
                                                        </div>
                                                        <div>
                                                            <b>Nombres de place: </b>{event.seats}
                                                        </div>
                                                        <div>
                                                            <b>commence le: </b>{format(new Date(event.begin), 'dd/MM-kk:mm')}
                                                        </div>
                                                    </div>
                                                </Grid>
                                                <Grid item xs={8}>
                                                    {event.description &&
                                                        <div>
                                                            {event.description}
                                                        </div>
                                                    }
                                                </Grid>
                                                <Grid item>
                                                    <div style={{ display: "inline" }}>
                                                        <b>Status: </b>
                                                        <div style={{ display: "inline", color: event.user_status ? "#03CE12" : "#CE0303" }}>
                                                            {event.user_status ? "inscrit" : "pas inscrit"}
                                                        </div>
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        }
                    </div>
                }
            </div>
        </section>
    )
}

export default observer(ActiDetailUI);