import { GradientButton } from "@components/buttons/gradientButton";
import ProjectDialog from "@components/projectDialog/ProjectDialog";
import { ProjectData, Settings } from "@misc/models";
import {
  Box,
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { invoke } from "@tauri-apps/api";
import React, { useEffect, useState } from "react";
import useDfx from "src/hooks/useDfx";
import useTitle from "src/hooks/useTitle";

export default function Projects() {
  const { setTitle } = useTitle();
  const { currentAccount } = useDfx();
  const [settings, setSettings] = useState<Settings | undefined>(undefined);
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [isLoading, setIsLoading] = useState<string | undefined>(undefined);
  const [projectDialogOpen, setProjectDialogOpen] = useState(false);

  useEffect(() => {
    setTitle("Projects");
    initialize();
  }, [currentAccount]);

  async function initialize() {
    try {
      await getProjectPath();
      await getProjects();
    } catch (error) {
      console.log(error);
    }
  }

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

  async function openCodeEditor(path: string) {
    try {
      setIsLoading(path);
      await invoke("run_command", { program: "sh", args: ["code", path] });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(undefined);
    }
  }

  async function getProjects() {
    try {
      const rustProjects: { name: string; last_modified: number; path: string }[] = await invoke(
        "get_projects_by_language",
        {
          language: "rust",
        }
      );

      const motokoProjects: { name: string; last_modified: number; path: string }[] = await invoke(
        "get_projects_by_language",
        {
          language: "motoko",
        }
      );

      let mappedRustProjects = rustProjects.map(
        (p): ProjectData => ({ name: p.name, last_modified: p.last_modified, language: "rust", path: p.path })
      );
      let mappedMotokoProjects = motokoProjects.map(
        (p): ProjectData => ({ name: p.name, last_modified: p.last_modified, language: "motoko", path: p.path })
      );
      setProjects([...mappedRustProjects, ...mappedMotokoProjects]);
    } catch (error) {
      console.log(error);
    }
  }

  function renderProjects(project: ProjectData) {
    return (
      <Paper key={project.path + project.language + project.name} sx={{ padding: 1, marginBottom: 1 }}>
        <List disablePadding>
          <ListItem>
            <Button
              variant="outlined"
              sx={{ marginRight: 2 }}
              disabled={!!isLoading}
              onClick={() => openCodeEditor(project.path)}
            >
              {project.path === isLoading ? <CircularProgress /> : "Open"}
            </Button>
            <ListItemText
              primary={project.name}
              secondary={`Last modified: ${new Date(project.last_modified).toLocaleDateString()} ${new Date(
                project.last_modified
              ).toLocaleTimeString()}`}
            />
            <ListItemSecondaryAction>
              <Button disabled>{project.language.toUpperCase()}</Button>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Paper>
    );
  }

  return (
    <Box>
      <Paper sx={{ padding: 4, flexGrow: 1, display: "flex" }}>
        <TextField label="Projects folder" disabled fullWidth value={settings?.project_path ?? ""} />
      </Paper>
      <Box sx={{ marginTop: 4 }}>
        <Typography sx={{ paddingLeft: 2, paddingBottom: 1 }} variant="h4">
          Projects
        </Typography>
        {projects.map(renderProjects)}
      </Box>
      <Box sx={{ display: "flex", flexGrow: 1, alignItems: "center", flexDirection: "column", paddingTop: 1 }}>
        <Paper sx={{ display: "flex", padding: 1, justifyContent: "center", width: "fit-content" }}>
          <GradientButton onClick={() => setProjectDialogOpen(true)} variant="contained">
            New Project
          </GradientButton>
        </Paper>
      </Box>
      <ProjectDialog open={projectDialogOpen} setOpen={setProjectDialogOpen} onSuccess={getProjects} />
    </Box>
  );
}
