export interface Settings {
  project_path: string;
}

export interface ProjectData {
  name: string;
  last_modified: number;
  path: string;
  language: string;
}

export interface PostProject {
  name: string;
  language: "rust" | "motoko";
  disableFrontend: boolean;
}
