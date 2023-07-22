import * as React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/auth";

import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ShowerIcon from "@mui/icons-material/Shower";
import LogoutIcon from "@mui/icons-material/Logout";
import Nav from "../Nav";

const drawerWidth = 285;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function DrawerAndNav() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { logout } = useContext(AuthContext);

  const handleLogout = async () => {
    await logout();
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Nav handleDrawerOpen={handleDrawerOpen} />
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}>
          <DrawerHeader>
            <IconButton
              className="w-auto shadow-none"
              onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>

          <Divider />

          <List className="mt-2 ms-2">
            <ListItem key={"scheduleIrrigation"} disablePadding>
              <Link to="/schedule" className="custom-link">
                <ListItemButton className="shadow-none">
                  <ListItemIcon>
                    <ShowerIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Agendar irrigação"} />
                </ListItemButton>
              </Link>
            </ListItem>

            <ListItem key={"logout"} disablePadding onClick={handleLogout}>
              <ListItemButton className="shadow-none">
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary={"Sair"} />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
      </Box>
    </div>
  );
}
