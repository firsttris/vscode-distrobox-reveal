# Distrobox Reveal in File Explorer

This is a Visual Studio Code extension designed for developers working inside **[Distrobox](https://distrobox.it/)** containers. 

It solves a common annoyance: when you use VS Code connected to a **Distrobox** container, the standard "Reveal in File Explorer" option is often **missing** or unavailable.

**Distrobox Reveal** adds this missing functionality back, allowing you to open the current file or folder using your **Host OS's** file manager seamlessly.

## Features

- **📂 Seamless Integration**: Open the current file's location directly in your host's default file manager (Nautilus, Dolphin, Thunar, etc.).
- **🖱️ Context Menus**: right-click on files in the Explorer sidebar or editor tabs.
- **⌨️ Command Palette**: Access the feature via "Reveal in Host Explorer".
- **🐧 Native Feel**: Uses `distrobox-host-exec` to bridge the container gap without complex setup.

## Requirements

To use this extension effectively, your environment must meet these criteria:

1.  **Distrobox**: You are running VS Code inside a Distrobox container.
2.  **distrobox-host-exec**: This utility is pre-installed in standard Distrobox containers. It must be obtainable in your `$PATH`.
3.  **Host Environment**: A Linux host with `xdg-open` configured (standard on almost all Linux desktops like GNOME, KDE, XFCE).

## How to specific usage

The extension provides a new command: **"Reveal in Host Explorer"**.

You can access it via:
*   **Explorer Context Menu**: Right-click any file or folder in the VS Code side bar.
*   **Editor Tab Context Menu**: Right-click the tab of any open file.
*   **Command Palette**: Press `Ctrl+Shift+P` (or `Cmd+Shift+P`) and type "Reveal in Host Explorer".

### How it works under the hood
When triggered, the extension executes the following command in your container:

```bash
distrobox-host-exec xdg-open "/absolute/path/to/directory"
```

If a file is selected, it opens the parent directory. If a directory is selected, it opens that directory directly.

## Installation

1.  Open VS Code inside your Distrobox.
2.  Search for "Distrobox Reveal" in the Extensions view (pending publication).
3.  Or install the `.vsix` manually if building from source.

## Building from source

```bash
git clone git@github.com:firsttris/vscode-distrobox-reveal.git
cd vscode-distrobox-reveal
npm install
npm run compile
```

## Known Issues

*   This extension is specifically for **Linux** users using Distrobox.
*   It assumes the path mapping between host and container is 1:1 (which is the default and recommended way Distrobox works, mounting the home directory). If you are using custom internal paths that do not exist on the host, `xdg-open` on the host will naturally fail to find them.

## Release Notes

### 0.0.1

Initial release of Distrobox Reveal in File Explorer.
