import { useEffect, useState } from "react";
import { Avatar, Button, ListItem, ListItemAvatar, ListItemText, Paper } from "@mui/material";
import useDfx from "src/hooks/useDfx";
import useTitle from "src/hooks/useTitle";
import Loading from "@components/loading/Loading";

export default function Main() {
  const [balance, setBalance] = useState("");
  const { setTitle: setPageTitle } = useTitle();
  const dfx = useDfx();

  useEffect(() => {
    setPageTitle("Main");
  }, []);

  if (dfx.isLoading || !dfx.currentAccount) {
    return <Loading />;
  }

  return (
    <Paper sx={{ padding: 4 }}>
      <ListItem>
        <ListItemAvatar sx={{ paddingRight: 1 }}>
          <Avatar sx={{ width: 48, height: 48 }}>{dfx.currentAccount.name[0].toUpperCase()}</Avatar>
        </ListItemAvatar>
        <ListItemText primary={dfx.currentAccount.name} secondary={dfx.currentAccount.principal} />
      </ListItem>
    </Paper>
  );
}
