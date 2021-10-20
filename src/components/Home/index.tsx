import { AppBar, Button, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import RootStore from "../../store";
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";
import { AccountCircle } from "@mui/icons-material";


const homeUI = () => {

    const [profilOpen, setProfilOpen] = useState<null | HTMLElement>(null)

    const { userLogin } = RootStore.getInstance()

    return (
        <section>
            <div style={{ justifyItems: "center" }}>
                <div>
                    Home
                </div>
            </div>
        </section>
    )
}

export default observer(homeUI)