// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
		console.log('Congratulations, your extension "sweet-react-generator" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.sweet', async () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		const test = await vscode.window.showInputBox({placeHolder: "Enter React Component Name"})

		vscode.window.showInformationMessage(test || "didn't work");
	});

	context.subscriptions.push(disposable);

// 	const componentArray = [
// 		{ type: "container", commandId: 'extension.genReactContainerComponentFiles' },
// 		{ type: "stateless", commandId: 'extension.genReactStatelessComponentFiles' },
// 		{ type: "reduxContainer", commandId: 'extension.genReactReduxContainerComponentFiles' },
// 		{ type: "reduxStateless", commandId: 'extension.genReactReduxStatelessComponentFiles' },
// ];

// The command has been defined in the package.json file
// Now provide the implementation of the command with  registerCommand
// The commandId parameter must match the command field in package.json
// componentArray.forEach(component => {
// 		const disposable = commands.registerCommand(
// 				component.commandId, (uri) => createComponent(uri, suffix));
		
// 		// Add to a list of disposables which are disposed when this extension is deactivated.
// 		context.subscriptions.push(disposable);
// });
}

// this method is called when your extension is deactivated
export function deactivate() {}
