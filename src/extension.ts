import * as vscode from 'vscode';
import { exec } from 'child_process';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {

	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('distrobox-reveal.reveal', (uri: vscode.Uri) => {
		
        // If executed from command palette or keybinding without context, try to get active editor
        if (!uri && vscode.window.activeTextEditor) {
            uri = vscode.window.activeTextEditor.document.uri;
        }

        if (uri && uri.scheme === 'file') {
            const fsPath = uri.fsPath;
            // Get directory if it's a file, or the path itself if it's a directory (although for reveal usually we want the parent dir for files)
            // Standard 'Reveal in Explorer' usually selects the file IN the parent folder.
            // xdg-open on a folder opens the folder. xdg-open on a file opens the file with default app.
            // We want to REVEAL, meaning open the folder containing the file.
            
            // However, xdg-open usually just "opens" things. 
            // If we want to "reveal" (select) a file, file managers need specific flags (like --select for dolphin/nautilus).
            // But since we are generic, opening the parent directory is the safest bet for "Reveal".
            
            // Wait, if I user clicks on a FOLDER in explorer, they expect that folder to open.
            // If they click a FILE, they usually expect the folder containing it to open.
            
            // Let's optimize:
            // 1. If we can detect it's a file, get dirname.
            
            // Since we don't want to do async stat check if possible to keep it fast, 
            // and VS Code passes URI. 
            // Actually xdg-open on a directory opens that directory.
            // But xdg-open on a file opens the file in editor/viewer (not what we want for REVEAL).
            
            // So: We should pass the DIRNAME of the file to xdg-open.
            
            // IMPORTANT: But how do we know if 'uri' is a folder or a file? 
            // The context menu in explorer gives us the item.
            // Usually we can check stats using vscode.workspace.fs.stat
             
            vscode.workspace.fs.stat(uri).then((stat) => {
                let targetPath = fsPath;
                if ((stat.type & vscode.FileType.Directory) !== vscode.FileType.Directory) {
                     // It's a file, get dirname
                     targetPath = path.dirname(fsPath);
                }

                // If user selected a folder, targetPath is that folder.
                // If user selected a file, targetPath is its parent.

                // Execute command
                // Note: We use "distrobox-host-exec" explicitly.
                // Also quoting the path to handle spaces.
                const command = `distrobox-host-exec xdg-open "${targetPath}"`;
                
                exec(command, (err, stdout, stderr) => {
                    if (err) {
                        vscode.window.showErrorMessage(`Error opening folder: ${err.message}`);
                        console.error(err);
                    }
                });

            }, (err) => {
                vscode.window.showErrorMessage(`Failed to stat file: ${err.message}`);
            });

        } else {
            vscode.window.showInformationMessage('No file selected to reveal.');
        }
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
