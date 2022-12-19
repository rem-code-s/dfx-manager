import { GradientButton } from "@components/buttons/gradientButton";
import { Settings } from "@misc/settings";
import { Box, Paper, TextField, Typography } from "@mui/material";
import { invoke } from "@tauri-apps/api";
import React, { useEffect, useState } from "react";
import useTitle from "src/hooks/useTitle";

export default function Projects() {
  const { setTitle } = useTitle();
  const [settings, setSettings] = useState<Settings | undefined>(undefined);

  useEffect(() => {
    setTitle("Projects");
    getProjectPath();
  }, []);

  async function getProjectPath() {
    try {
      let result: Settings = await invoke("get_projects_path");
      setSettings(result);
    } catch (error) {
      await intialProjectSetup();
    }
  }

  async function intialProjectSetup() {
    try {
      await invoke("initial_project_path_setup");
      getProjectPath();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Box>
      <Paper sx={{ padding: 4, flexGrow: 1, display: "flex" }}>
        <TextField label="Projects folder" disabled fullWidth value={settings?.project_path ?? ""} />
      </Paper>
      <Box sx={{ display: "flex", flexGrow: 1, alignItems: "center", flexDirection: "column", paddingTop: 2 }}>
        <Paper sx={{ display: "flex", padding: 1, justifyContent: "center", width: "fit-content" }}>
          <GradientButton variant="contained">New Project</GradientButton>
        </Paper>
      </Box>
    </Box>
  );
}
