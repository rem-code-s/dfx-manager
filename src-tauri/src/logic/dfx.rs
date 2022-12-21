use std::process::Command;

#[tauri::command]
pub fn dfx(args: Vec<&str>) -> Result<String, String> {
    // MAC HACK by path
    let result = Command::new("/usr/local/bin/dfx").args(args).output();
    match result {
        Ok(ok) => {
            if !Vec::is_empty(&ok.stdout) {
                return Ok(
                    String::from_utf8(ok.stdout).unwrap_or("Something went wrong".to_string())
                );
            } else {
                return Err(
                    String::from_utf8(ok.stderr).unwrap_or("Something went wrong".to_string())
                );
            }
        }
        Err(err) => Err(err.to_string()),
    }
}
