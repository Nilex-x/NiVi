import React, { useEffect, useState } from "react";
import Query from "../../Graphql/Query";
import RootStore from "../../store";
import addMonths from 'date-fns/addMonths'
import { format } from "date-fns";

const ModuleUI = () => {

    const [isLoading, setLoading] = useState<Boolean>(false)

    const queries = new Query()
    const { userLogin } = RootStore.getInstance()

    const getModules = async () => {
        setLoading(true)
        const startDate = format(new Date(), 'yyyy-MM-dd')
        const endDate = format(addMonths(new Date(), 1), 'yyyy-MM-dd')
        console.log(endDate, startDate)
        try {
            const data = await queries.getAllModule(userLogin.authKey, startDate, endDate)
            const allModules = data.data.GetAllModule
            console.log(allModules, data)
        } catch (err) {
            console.log()
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getModules()
    }, [])

    return (
        <section>
            <div>
                Modules
            </div>
        </section>
    )
}

export default ModuleUI;