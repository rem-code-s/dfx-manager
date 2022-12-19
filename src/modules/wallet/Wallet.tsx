import Loading from "@components/loading/Loading";
import { Button, CircularProgress, ListItem, ListItemAvatar, ListItemText, Paper } from "@mui/material";
import React, { useEffect } from "react";
import useDfx from "src/hooks/useDfx";
import useTitle from "src/hooks/useTitle";

export default function Wallet() {
  const { setTitle: setPageTitle } = useTitle();
  const dfx = useDfx();

  useEffect(() => {
    setPageTitle("Wallet");
  }, []);

  if (dfx.isLoading || !dfx.currentAccount) {
    return <Loading />;
  }

  if (!dfx.currentAccount.cyclesBalance) {
    return (
      <Paper sx={{ padding: 4 }}>
        <ListItem>
          <ListItemText
            primary={"No cycles wallet"}
            secondary={"It looks like you dont have a cycles wallet attached to this identity"}
          />
        </ListItem>
      </Paper>
    );
  }

  return (
    <Paper sx={{ padding: 4 }}>
      <ListItem>
        <ListItemText primary={"Cycles balance"} secondary={dfx.currentAccount?.cyclesBalance} />
      </ListItem>
    </Paper>
  );
}
