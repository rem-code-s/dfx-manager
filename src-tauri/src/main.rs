#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            dfx_manager::logic::dfx::dfx,
            dfx_manager::logic::projects::get_projects_path,
            dfx_manager::logic::projects::initial_project_path_setup,
            dfx_manager::logic::projects::create_project,
            dfx_manager::logic::projects::get_projects_by_language,
            dfx_manager::logic::projects::open_path,
            dfx_manager::logic::projects::run_command,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
