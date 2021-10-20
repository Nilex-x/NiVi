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
        <div>
            <AppBar position="static" color="default" style={{ borderRadius: 20 }}>
                <Toolbar>
                    <IconButton>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h5" align="center" component="div" sx={{ flexGrow: 1 }}>
                        NiVi Soluce
                    </Typography>
                    <IconButton
                        size="large"
                        onClick={(e) => setProfilOpen(e.currentTarget)}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        anchorEl={profilOpen}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(profilOpen)}
                        onClose={(e) => setProfilOpen(null)}
                    >
                        <MenuItem onClick={(e) => setProfilOpen(null)}>Profile</MenuItem>
                        <MenuItem onClick={(e) => userLogin.logout()}>Se déconnecter</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
        </div >
    )
}

export default observer(homeUI)