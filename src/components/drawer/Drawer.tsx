import { Backpack, Inbox, ListAlt, Mail, SvgIconComponent, Wallet } from "@mui/icons-material";
import {
  Box,
  styled,
  Drawer as MUIDrawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Icon,
} from "@mui/material";
import React, { PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const pages: { name: string; path: string; icon: SvgIconComponent }[] = [
  { name: "Main", path: "/", icon: Backpack },
  { name: "Wallet", path: "/wallet", icon: Wallet },
  { name: "Projects", path: "/projects", icon: ListAlt },
];

interface IProps extends PropsWithChildren {
  open: boolean;
}

export default function Drawer({ open, children }: IProps) {
  const navigate = useNavigate();
  return (
    <Box sx={{ display: "flex", flexGrow: 1 }}>
      <MUIDrawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            marginTop: "40px",
            boxSizing: "border-box",
            background: "none",
            border: "none",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <List>
          {pages.map((page) => (
            <ListItem onClick={() => navigate(page.path)} key={page.path} disablePadding>
              <ListItemButton>
                <ListItemIcon sx={{ color: "primary.contrastText" }}>
                  <page.icon />
                </ListItemIcon>
                <ListItemText>
                  <Typography variant="button">{page.name}</Typography>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </MUIDrawer>
      {/* <Box>{children}</Box> */}
      <Main open={open}>{children}</Main>
    </Box>
  );
}
