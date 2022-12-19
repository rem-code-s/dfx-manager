use std::{fmt::format, fs, path::PathBuf, process::Command, time::SystemTime};

use crate::models::{project_data::ProjectData, settings::Settings};

use super::dfx::dfx;

#[tauri::command]
pub fn initial_project_path_setup() {
    let ui_settings = "ui-settings.json";

    let mut home_dir = dirs::home_dir().unwrap();
    home_dir.push(".config/dfx");

    let setting_file_path = format!(
        "{}/{}",
        &home_dir.to_string_lossy().to_string(),
        ui_settings
    );

    let has_ui_settings = fs::read_dir(&home_dir)
        .unwrap()
        .map(|d| {
            d.unwrap()
                .path()
                .file_name()
                .unwrap()
                .to_string_lossy()
                .to_string()
        })
        .any(|p| p == ui_settings.to_string());

    if !has_ui_settings {
        let _ = fs::File::create(&setting_file_path).unwrap();

        let mut projects_path = dirs::document_dir().unwrap();
        projects_path.push("dfx-projects");
        let settings = Settings {
            project_path: projects_path.to_string_lossy().to_string(),
        };

        let x = serde_json::to_string(&settings).unwrap();
        let _ = fs::write(&setting_file_path, x.as_bytes());
    };
}

#[tauri::command]
pub fn create_project(
    name: String,
    language: String,
    disable_frontend: bool,
) -> Result<(), String> {
    let project_path = get_projects_path().unwrap();
    let identity = dfx(vec!["identity", "whoami"]);
    match identity {
        Ok(mut _identity) => {
            _identity.pop();
            let identity_path = format!("{}/{}/{}", project_path.project_path, _identity, language);
            let _ = fs::create_dir_all(&identity_path);

            let frontend_arg = if disable_frontend {
                "--no-frontend".to_string()
            } else {
                "--frontend".to_string()
            };

            let _ = Command::new("dfx")
                .current_dir(identity_path)
                .arg("new")
                .arg(name)
                .arg("--type")
                .arg(language)
                .arg(frontend_arg)
                .output();

            Ok(())
        }
        Err(err) => Err(err.to_string()),
    }
}

#[tauri::command]
pub fn get_projects_by_language(language: String) -> Result<Vec<ProjectData>, String> {
    let project_path = get_projects_path().unwrap();
    let identity = dfx(vec!["identity", "whoami"]);
    match identity {
        Ok(mut _identity) => {
            _identity.pop();
            let path = format!("{}/{}/{}", project_path.project_path, _identity, language);
            let dirs = fs::read_dir(&path);
            match dirs {
                Ok(_dirs) => {
                    let result: Vec<ProjectData> = _dirs
                        .map(|_dir| {
                            let dir = _dir.unwrap();
                            let metadata = fs::metadata(&dir.path()).unwrap();
                            let elapsed = metadata.modified().unwrap();
                            let last_modified = elapsed
                                .duration_since(SystemTime::UNIX_EPOCH)
                                .unwrap()
                                .as_millis() as u64;
                            let name = dir
                                .path()
                                .file_name()
                                .unwrap()
                                .to_string_lossy()
                                .to_string();
                            ProjectData {
                                name: name.clone(),
                                path: format!("{}/{}", path, &name),
                                last_modified,
                            }
                        })
                        .collect();
                    Ok(result)
                }
                Err(_) => {
                    let _ = fs::create_dir_all(&path);
                    Ok(vec![])
                }
            }
        }
        Err(err) => Err(err.to_string()),
    }
}
// fn get_projects() {
// }

#[tauri::command]
pub fn get_projects_path() -> Result<Settings, String> {
    let settings_file_path = _get_settings_file_path();

    let file = fs::read(settings_file_path);
    match file {
        Ok(_file) => {
            let file_content = String::from_utf8(_file).unwrap();
            let settings = serde_json::from_str::<Settings>(file_content.as_str());
            match settings {
                Ok(_settings) => Ok(_settings),
                Err(err) => Err(err.to_string()),
            }
        }
        Err(err) => Err(err.to_string()),
    }
}

#[tauri::command]
pub fn open_path(path: String) {
    Command::new("sh").arg("open").arg(path);
}

#[tauri::command]
pub fn run_command(program: String, args: Vec<String>) -> String {
    let command = Command::new(program).args(args).output();
    match command {
        Ok(ok) => format!("{:?}", ok),
        Err(err) => format!("{:?}", err),
    }
}

fn _get_settings_file_path() -> PathBuf {
    let mut dir = dirs::home_dir().unwrap();
    dir.push(".config/dfx/ui-settings.json");
    dir
}
