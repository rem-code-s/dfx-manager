use std::{fs, path::PathBuf, process::Command};

use crate::models::settings::Settings;

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

// fn create_project(name: String, language: String, disable_frontend: bool) {
pub fn create_project() {
    let project_path = get_projects_path().unwrap();
    let _ = Command::new("dfx")
        .current_dir(project_path.project_path)
        .arg("test")
        .output();
}

fn _get_settings_file_path() -> PathBuf {
    let mut dir = dirs::home_dir().unwrap();
    dir.push(".config/dfx/ui-settings.json");
    dir
}
