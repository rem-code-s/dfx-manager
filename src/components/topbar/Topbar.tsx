import { Close, Menu as MenuIcon } from "@mui/icons-material";
import { Box, Button, IconButton, Menu, MenuItem, Select, Typography } from "@mui/material";
import { invoke } from "@tauri-apps/api";
import { useEffect, useState } from "react";
import { Network, networks } from "src/context/DfxContext";
import useDfx from "src/hooks/useDfx";
import useTitle from "src/hooks/useTitle";

interface IProps {
  drawerOpen: boolean;
  setDrawerOpen: (value: boolean) => void;
}

export default function Topbar({ drawerOpen, setDrawerOpen }: IProps) {
  const [identities, setIdentities] = useState<string[]>([]);
  const [selectedIdentity, setSelectedIdentity] = useState<string>("");
  const [anchorElIdentity, setAnchorElIdentity] = useState<null | HTMLElement>(null);
  const [anchorElNetwork, setAnchorElNetwork] = useState<null | HTMLElement>(null);
  const { title } = useTitle();
  const { reload, identityCall, network, setNetwork } = useDfx();

  useEffect(() => {
    getIdentities();
    getCurrentIdentity();
  }, [title]);

  async function getIdentities() {
    let identities: string = await invoke("dfx", { args: ["identity", "list"] });
    setIdentities(identities.split("\n").filter((v) => v !== ""));
  }

  async function getCurrentIdentity() {
    let currentIdentity: string = await invoke("dfx", { args: ["identity", "whoami"] });
    setSelectedIdentity(currentIdentity.split("\n")[0]);
  }

  async function handleIdentityChange(value: string) {
    identityCall(["use", value]);
    reload();
    getCurrentIdentity();
    setSelectedIdentity(value);
    handleIdentityClose();
  }

  async function handleNetworkChange(value: string) {
    setNetwork(value as Network);
    handleNetworkClose();
  }

  function handleIdentityClose() {
    setAnchorElIdentity(null);
  }

  function handleNetworkClose() {
    setAnchorElNetwork(null);
  }

  return (
    <Box sx={{ display: "flex", flexGrow: 1, alignItems: "center", height: 40 }}>
      <Box sx={{ paddingLeft: 1, display: "flex", width: "33%", alignItems: "center" }}>
        <IconButton onClick={() => setDrawerOpen(!drawerOpen)}>
          {drawerOpen ? (
            <Close fontSize="small" sx={{ color: "primary.contrastText" }} />
          ) : (
            <MenuIcon fontSize="small" sx={{ color: "primary.contrastText" }} />
          )}
        </IconButton>
      </Box>

      <Box sx={{ display: "flex", flexGrow: 1, width: "33%", justifyContent: "center", alignItems: "center" }}>
        <Typography variant="h4">{title}</Typography>
      </Box>

      <Box sx={{ display: "flex", paddingRight: 1, width: "33%", justifyContent: "flex-end" }}>
        <Button
          variant="outlined"
          sx={{ marginRight: 1, color: "primary.contrastText" }}
          size="small"
          onClick={(e) => setAnchorElIdentity(e.currentTarget)}
        >
          {selectedIdentity}
        </Button>
        <Menu anchorEl={anchorElIdentity} open={Boolean(anchorElIdentity)} onClose={handleIdentityClose}>
          {identities.map((i) => (
            <MenuItem onClick={() => handleIdentityChange(i)} key={i} value={i}>
              {i}
            </MenuItem>
          ))}
        </Menu>
        <Button
          sx={{ color: "primary.contrastText" }}
          variant="outlined"
          size="small"
          onClick={(e) => setAnchorElNetwork(e.currentTarget)}
        >
          {network}
        </Button>
        <Menu anchorEl={anchorElNetwork} open={Boolean(anchorElNetwork)} onClose={handleNetworkClose}>
          {networks.map((i) => (
            <MenuItem onClick={() => handleNetworkChange(i)} key={i} value={i}>
              {i}
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </Box>
  );
}
