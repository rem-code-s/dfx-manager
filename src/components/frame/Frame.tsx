import { Box } from "@mui/material";
import React, { PropsWithChildren, useState } from "react";
import Topbar from "../topbar/Topbar";
import Drawer from "@components/drawer/Drawer";

export default function Frame({ children }: PropsWithChildren) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <Box sx={{ display: "flex", flexGrow: 1, flexDirection: "column" }}>
      <Topbar drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
      <Drawer open={drawerOpen}>{children}</Drawer>
    </Box>
  );
}
