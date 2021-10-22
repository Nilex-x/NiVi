import { AppBar, Button, Checkbox, CircularProgress, FormControlLabel, FormGroup, Grid, IconButton, Menu, MenuItem, TextField, Toolbar, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import RootStore from "../../store";
import { useEffect, useState } from "react";
import Query from "../../Graphql/Query";
import '../../Style/app.css'
import endOfYear from "date-fns/endOfYear";
import startOfWeek from 'date-fns/startOfWeek'
require('react-big-calendar/lib/css/react-big-calendar.css');
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import fr from "@fullcalendar/core/locales/fr"

interface PlanningInfoType {
    scolaryear: string
    codemodule: string
    codeinstance: string
    codeacti: string
    codeevent: string
    semester: Number
    titlemodule: string
    acti_title: string
    start: string
    end: string
    total_students_registered: Number
    title: string
    type_title: string
    type_code: string
    is_rdv: string
    nb_hours: string
    allowed_planning_start: string
    allowed_planning_end: string
    nb_group: Number
    nb_max_students_projet: Number
    salle: string
    nb_seat: string
    module_available: Boolean
    module_registered: Boolean
    past: Boolean
    allow_register: Boolean
    event_registered: Boolean
    project: Boolean
}

const PlanningUI = () => {

    const { userLogin } = RootStore.getInstance()
    const queries = new Query()
    const [planningInfo, setPlanningInfo] = useState<null | PlanningInfoType | any>([])
    const [tabOfCheck, setTabOfCheck] = useState<Number[]>([0, 1, 2])
    const [filterOfModule, setFilterOfModule] = useState<Number[]>([1, 1, 0])
    const [onlyRegisterSes, setOnlyRegisterSes] = useState(false)
    const [onlyRegisterMod, setOnlyRegisterMod] = useState(true)
    const [isLoading, setLoading] = useState(false)

    const formatEvent = (event) => {
        const clearArray = event.map((element: PlanningInfoType) => {
            return {
                ...element,
                start: new Date(element.start),
                end: new Date(element.end),
                title: element.acti_title
            }
        })
        console.log("newArray", clearArray)
        setPlanningInfo(clearArray)
    }

    const manageTabCond = (nb: Number) => {
        const newArray = [...tabOfCheck]
        const index = tabOfCheck.indexOf(nb)
        if (index != -1) {
            newArray.splice(index, 1)
        } else {
            newArray.push(nb)
        }
        setTabOfCheck(newArray)
    }

    const removeCurrentModule = (index: number) => { // remove current module [update Mobx]
        const value = filterOfModule[index]
        const newArray = [...filterOfModule]
        if (value == 0) {
            newArray[index] = 1
        } else {
            newArray[index] = 0
        }
        setFilterOfModule(newArray)
    }

    const getPlanning = async () => {
        setLoading(true)
        try {
            const response = await queries.getPlanning(userLogin.authKey)
            const planning = response.data.GetPlanning
            console.log(planning)
            formatEvent(planning)
        } catch (err) {
            console.log("graphql error") //JSON.stringify(err, null, 2)
        }
        setLoading(false)
    }

    const refecthByFilter = (obj: PlanningInfoType) => {
        const isChecked = tabOfCheck.indexOf(obj.semester) == -1 ? false : true
        if (isChecked) {
            if (onlyRegisterMod && !obj.module_registered) {
                return false
            } else {
                if (onlyRegisterSes && !obj.event_registered) {
                    return false
                } else {
                    return true;
                }
            }
        } else {
            return false;
        }
    }

    useEffect(() => {
        console.log("re render root")
        getPlanning()
    }, [])

    useEffect(() => {
        console.log("re render tabOfCheck")
    }, [tabOfCheck])

    const events = planningInfo.filter(refecthByFilter)
    console.log(events, tabOfCheck)

    return (
        <section>
            <div>
                <Typography variant="h4" align="center">Planning</Typography>
                {isLoading ?
                    <div className="center">
                        <CircularProgress />
                    </div>
                    :
                    <div>
                        <Grid container spacing={2}>
                            <Grid item>
                                <div className="box">
                                    <Typography variant="h6" align="center">Semester</Typography>
                                    <div className="flex-row">
                                        <FormGroup>
                                            <FormControlLabel control={<Checkbox defaultChecked onClick={() => manageTabCond(0)} />} label="Semester 0" />
                                            <FormControlLabel control={<Checkbox defaultChecked onClick={() => manageTabCond(1)} />} label="Semester 1" />
                                            <FormControlLabel control={<Checkbox onClick={() => manageTabCond(3)} />} label="Semester 3" />
                                            <FormControlLabel control={<Checkbox onClick={() => manageTabCond(5)} />} label="Semester 5" />
                                            <FormControlLabel control={<Checkbox onClick={() => manageTabCond(7)} />} label="Semester 7" />
                                            <FormControlLabel control={<Checkbox onClick={() => manageTabCond(9)} />} label="Semester 9" />
                                        </FormGroup>
                                        <FormGroup style={{ marginTop: 40 }}>
                                            <FormControlLabel control={<Checkbox defaultChecked onClick={() => manageTabCond(2)} />} label="Semester 2" />
                                            <FormControlLabel control={<Checkbox onClick={() => manageTabCond(4)} />} label="Semester 4" />
                                            <FormControlLabel control={<Checkbox onClick={() => manageTabCond(6)} />} label="Semester 6" />
                                            <FormControlLabel control={<Checkbox onClick={() => manageTabCond(8)} />} label="Semester 8" />
                                            <FormControlLabel control={<Checkbox onClick={() => manageTabCond(10)} />} label="Semester 10" />
                                        </FormGroup>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item>
                                <div className="box" style={{ height: "81%" }}>
                                    <Typography variant="h6" align="center">Filtres</Typography>
                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox defaultChecked />} label="Modules du semestre courant" />
                                        <FormControlLabel control={<Checkbox defaultChecked onClick={() => setOnlyRegisterMod(!onlyRegisterMod)} />} label="Module ou je suis incrit seulement" />
                                        <FormControlLabel control={<Checkbox onClick={() => setOnlyRegisterSes(!onlyRegisterSes)} />} label="Sessions ou je suis inscrit uniquement" />
                                    </FormGroup>
                                    <TextField
                                        variant="outlined"
                                        label="Recherche"
                                        placeholder="Code Module"
                                    />
                                </div>
                            </Grid>
                        </Grid>
                        <div className="box">
                            <FullCalendar // https://fullcalendar.io/docs
                                plugins={[dayGridPlugin, timeGridPlugin]}
                                initialView="timeGridWeek"
                                headerToolbar={{
                                    start: 'today prev,next',
                                    center: 'title',
                                    end: 'dayGridMonth,timeGridWeek,timeGridDay'
                                }}
                                contentHeight={800}
                                events={events}
                                dayHeaderFormat={{ weekday: 'long', day: 'numeric', month: 'numeric', omitCommas: true }}
                                slotMinTime="08:00:00"
                                slotMaxTime="24:00:00"
                                locale={fr}
                                allDaySlot={false}
                                eventClick={(info) => console.log(info.event.title)}
                            />
                        </div>
                    </div>
                }
            </div>
        </section>
    )
}

export default observer(PlanningUI)