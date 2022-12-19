#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use dfx_ui::logic::projects::create_project;

fn main() {
    create_project();
    // tauri::Builder::default()
    //     .invoke_handler(tauri::generate_handler![
    //         dfx_ui::logic::dfx::dfx,
    //         dfx_ui::logic::projects::get_projects_path,
    //         dfx_ui::logic::projects::initial_project_path_setup,
    //     ])
    //     .run(tauri::generate_context!())
    //     .expect("error while running tauri application");
}
