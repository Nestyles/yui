#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use std::process::Command;

#[tauri::command]
fn get_installed_packages() -> Vec<String> {
    let output = Command::new("pacman")
        .args(["-Q"])
        .output()
        .unwrap();

    let splitted_packages: Vec<&str> = std::str::from_utf8(&output.stdout)
        .unwrap()
        .split("\n").collect();

    splitted_packages.into_iter().map(|package| package.to_string()).collect()
}

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![get_installed_packages])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
