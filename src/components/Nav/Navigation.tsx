import { useQuery } from "@apollo/client";
import { Button, CircularProgress, Drawer, Hidden } from "@mui/material";
import { useEffect, useState } from "react";
import { GET_USER_INFO } from "../../Graphql/schema";
import '../../Style/Home.css'
import BlockAccess from "../BlockAccess/BlockAccess";
import Login from "../Login/Login";

const Navigation = () => {

    const [status, setStatus] = useState({
        isConnected: false,
        graphqlStatus: true
    })
    const [isOpen, setOpen] = useState(true)
    const [isLoading, setLoading] = useState(true)

    const setConnected = (status) => {
        setStatus({ isConnected: status, ...status })
    }

    const setGraphqlStatus = (status) => {
        console.log(status)
        setStatus({ graphqlStatus: status, ...status })
    }

    const getGraphqlStatus = async () => {
        console.log("Graphql")
        try {
            const data = await fetch('http://localhost:4000/.well-known/apollo/server-health',
            {
                method: 'get',
                mode: 'cors',
                headers: {
                  'Content-Type': 'application/json'
                }
            })
            console.log("data", data)
           
            setLoading(false)
        } catch (err) {
            console.log("not good", err)
            setStatus({ isConnected: false, graphqlStatus: false })
            setLoading(false)
        }
    }

    useEffect(() => {
        if (localStorage.getItem("KeyAuth")) {
            console.log("LocalStorage")
            setStatus({ isConnected: true, graphqlStatus: true })
        }
        setLoading(false)
        //getGraphqlStatus()
    }, [])

    if (isLoading) return (<CircularProgress/>)
    else if (!status.isConnected) return (<Login setStatus={setStatus} />)

    return (
        <section>
            <div className="wrapper">
                {/* <Hidden smDown={true} implementation="css">
                    <Drawer open={isOpen} onClose={() => setOpen(false)}
                        variant="permanent"
                        anchor="left"
                        ModalProps={{
                            keepMounted: true // Better open performance on mobile.
                        }} >
                        <div className="wrapperdrawer">
                            test
                        </div>
                    </Drawer>
                </Hidden> */}
                <div className="content">
                    Connected
                    <div>
                        {/* <Button
                            variant="outlined"
                            color="error"
                            onClick={() => setOpen(true)}
                        >
                            open
                        </Button> */}
                        <Button
                            variant="outlined"
                            onClick={() => {
                                localStorage.removeItem("KeyAuth")
                                setStatus({ isConnected: false, graphqlStatus: true })
                            }}
                        >
                            Se déconnecter
                        </Button>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default Navigation;