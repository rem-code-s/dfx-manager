use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct ProjectData {
    pub name: String,
    pub path: String,
    pub last_modified: u64,
}
