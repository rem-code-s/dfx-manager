import { GradientButton } from "@components/buttons/gradientButton";
import { PostProject } from "@misc/models";
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Switch,
  TextField,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import { invoke } from "@tauri-apps/api";
import React, { useEffect, useState } from "react";

interface IProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  onSuccess: () => void;
}
// ^(\w+\.?)*\w+$

export default function ProjectDialog({ open, setOpen, onSuccess }: IProps) {
  const [projectData, setProjectData] = useState<PostProject>({
    disableFrontend: false,
    language: "motoko",
    name: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

  async function createProject() {
    setErrorMessage(undefined);
    let isvalid = projectData.name.match(/^[^\\/?%*:|"<>\.]+$/);
    if (!isvalid) {
      setErrorMessage("Invalid project name");
      return;
    }

    try {
      setIsLoading(true);
      let result = await invoke("create_project", {
        ...projectData,
        name: projectData.name.toLowerCase().replaceAll(" ", "_"),
      });
      console.log("result", result);
      handleSucces();
      handleClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSucces() {
    setProjectData({
      disableFrontend: false,
      language: "motoko",
      name: "",
    });
    onSuccess();
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <Dialog onClose={handleClose} open={open} fullWidth>
      <DialogTitle>Create new project</DialogTitle>
      <Box sx={{ padding: 2, display: "flex", flexGrow: 1, flexDirection: "column" }}>
        <TextField
          onClick={() => !!errorMessage && setErrorMessage(undefined)}
          error={!!errorMessage}
          helperText={errorMessage ? errorMessage : undefined}
          value={projectData.name}
          onChange={(e) => setProjectData((prevState) => ({ ...prevState, name: e.target.value }))}
          disabled={isLoading}
          fullWidth
          autoCapitalize="none"
          autoComplete="none"
          autoCorrect="none"
          sx={{ marginBottom: 1 }}
          label="Project name"
        />
        <ButtonGroup fullWidth sx={{ marginBottom: 1 }}>
          <Button
            disabled={isLoading}
            onClick={() => setProjectData((prevState) => ({ ...prevState, language: "motoko" }))}
            variant={projectData?.language === "motoko" ? "contained" : undefined}
          >
            Motoko
          </Button>
          <Button
            disabled={isLoading}
            onClick={() => setProjectData((prevState) => ({ ...prevState, language: "rust" }))}
            variant={projectData?.language === "rust" ? "contained" : undefined}
          >
            Rust
          </Button>
          <Button disabled>Java</Button>
          <Button disabled>Go</Button>
          <Button disabled>Typescript</Button>
        </ButtonGroup>
        <Box sx={{ display: "flex", flexGrow: 1, justifyContent: "flex-end" }}>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  disabled={isLoading}
                  checked={!projectData.disableFrontend}
                  onChange={(_, v) => setProjectData((prevState) => ({ ...prevState, disableFrontend: !v }))}
                />
              }
              label="With frontend"
            />
          </FormGroup>
        </Box>
      </Box>
      {isLoading ? (
        <Box sx={{ display: "flex", flexGrow: 1, justifyContent: "center", padding: 1 }}>
          <CircularProgress />
        </Box>
      ) : (
        <DialogActions>
          <GradientButton disableElevation variant="outlined" onClick={handleClose}>
            Cancel
          </GradientButton>
          <GradientButton disableElevation variant="contained" onClick={createProject} autoFocus>
            Create
          </GradientButton>
        </DialogActions>
      )}
    </Dialog>
  );
}
