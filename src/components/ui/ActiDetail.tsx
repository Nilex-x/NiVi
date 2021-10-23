import { observer } from "mobx-react-lite";
import react, { useEffect, useState } from "react";
import "../../Style/app.css";
import { useParams } from "react-router-dom";
import { Typography, CircularProgress } from "@mui/material";
import Query from "../../Graphql/Query";
import RootStore from "../../store";

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
    begin: String
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
            setActiInfo(moduleDetail)
        } catch (err) {
            console.log("graphql error") //JSON.stringify(err, null, 2)
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
                <Typography variant="h4" align="center">Acti</Typography>
                {isLoading ?
                    <div className="center">
                        <CircularProgress />
                    </div>
                    :
                    <div>
                        {actiInfo.title}
                    </div>
                }
            </div>
        </section>
    )
}

export default observer(ActiDetailUI);