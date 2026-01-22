<div align="center">

# 📂 Distrobox Reveal in File Explorer

<img src="folder.png" alt="Distrobox Reveal" width="128" height="128">

<strong>Open files in your host's file manager from inside Distrobox containers!</strong>

<a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT"></a>
<a href="https://code.visualstudio.com/"><img src="https://img.shields.io/badge/VS%20Code-1.85.0+-blue.svg" alt="VS Code"></a>
<a href="https://distrobox.it/"><img src="https://img.shields.io/badge/Distrobox-Compatible-green.svg" alt="Distrobox"></a>

---

**[Overview](#-overview) • [Features](#-features) • [Usage](#-usage) • [Requirements](#-requirements) • [Installation](#-installation) • [Contributing](#-contributing)**

---
</div>

## 🎯 Overview

A lightweight VS Code extension designed for developers working inside **[Distrobox](https://distrobox.it/)** containers. It restores the missing "Reveal in File Explorer" functionality, allowing you to open files and folders in your **host OS's** file manager seamlessly.

> ✨ **Why use this extension?** When using VS Code connected to a Distrobox container, the standard "Reveal in File Explorer" option is often missing or unavailable. This extension bridges that gap by using `distrobox-host-exec` to open files in your host's file manager (Nautilus, Dolphin, Thunar, etc.) with a single click.

## ✨ Features

| 🚀 Quick Access | 🔧 Flexible Integration |
| --- | --- |
| 🖱️ **Context Menus** - Right-click on files in Explorer sidebar or editor tabs | 📂 **Any File Manager** - Works with Nautilus, Dolphin, Thunar, and more |
| ⌨️ **Command Palette** - Access via "Reveal in Host Explorer" | 🐧 **Native Feel** - Seamless bridge between container and host |
| 📁 **Files & Folders** - Works with both files and directories | ⚡ **Zero Config** - Uses standard `distrobox-host-exec` |

### Key Highlights

- ✅ **Zero Configuration** - Works out-of-the-box with standard Distrobox setups
- 🎨 **Seamless Integration** - Appears in native VS Code context menus
- 🐧 **Linux Native** - Built specifically for the Linux + Distrobox workflow
- ⚡ **Lightweight** - Minimal performance impact on your editor

## 🚀 Usage

The extension provides the command: **"Reveal in Host Explorer"**

### Access Methods

| Method | How to Use |
| --- | --- |
| 📁 **Explorer Context Menu** | Right-click any file or folder in the VS Code sidebar |
| 📑 **Editor Tab Context Menu** | Right-click the tab of any open file |
| ⌨️ **Command Palette** | Press `Ctrl+Shift+P` and type "Reveal in Host Explorer" |

<details>
<summary>🔧 How it works under the hood</summary>

When triggered, the extension executes the following command in your container:

```bash
distrobox-host-exec xdg-open "/absolute/path/to/directory"
```

- If a **file** is selected → opens the parent directory
- If a **directory** is selected → opens that directory directly

</details>

## 📋 Requirements

To use this extension effectively, your environment must meet these criteria:

| Requirement | Description |
| --- | --- |
| 🐧 **Distrobox** | You are running VS Code inside a Distrobox container |
| 🔧 **distrobox-host-exec** | Pre-installed in standard Distrobox containers (must be in `$PATH`) |
| 🖥️ **Host Environment** | Linux host with `xdg-open` configured (GNOME, KDE, XFCE, etc.) |

> ⚠️ **Note:** This extension assumes 1:1 path mapping between host and container (the default Distrobox behavior with home directory mounting). Custom internal paths that don't exist on the host won't work.

### 🔑 Important: Remote User Configuration

To ensure VS Code connects to the Distrobox with your host user, you need to configure the `remoteUser` setting:

1. Open the Command Palette (`Ctrl+Shift+P`)
2. Search for **"Dev Containers: Open Container Configuration File"**
3. Add the following line to the configuration:

```json
"remoteUser": "${localEnv:USER}"
```

Without this setting, VS Code may connect as root, which prevents `xdg-open` from accessing your host's desktop session (D-Bus, display server) and the file manager won't open.

## 📦 Installation

### From VS Code Marketplace

1. Open VS Code inside your Distrobox
2. Go to Extensions view (`Ctrl+Shift+X`)
3. Search for **"Distrobox Reveal"**
4. Click **Install**

### Manual Installation

Install the `.vsix` file directly if building from source.

## 🤝 Contributing

Want to contribute? We'd love your help!

### 🚀 Development Setup

1. **Clone the repository**
2. **Install dependencies**
3. **Start development**
   - Press `F5` or go to Run → Start Debugging
   - A new VS Code window will open with the extension loaded

4. **Build the extension**
   ```bash
   npm run compile
   ```

<div align="center">

**Made with ❤️ for the Linux community**

⭐ Star us on [GitHub](https://github.com/firsttris/vscode-distrobox-reveal) • 🐛 [Report a Bug](https://github.com/firsttris/vscode-distrobox-reveal/issues) • 💡 [Request a Feature](https://github.com/firsttris/vscode-distrobox-reveal/issues)

</div>
