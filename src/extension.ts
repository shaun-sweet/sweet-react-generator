// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { commands, window, ExtensionContext, workspace, Uri } from "vscode";
import * as fs from "fs";
import { FileHelper } from "./lib/FileHelper";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "sweet-react-generator" is now active!'
  );
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const createDucks = commands.registerCommand(
    "extension.createDucks",
    async (uri: Uri) => {
      const useTypescript = Boolean(workspace.getConfiguration('SweetReactGenerator').get('useTypescript'));
      const fileHelper = new FileHelper(uri, useTypescript);
      const ducksModuleName = await window.showInputBox({
        placeHolder: "Ducks module name?"
      });
      const createdDirectory = fileHelper.createDirectory("ducks");
      const duckTypes: string[] = fs.readdirSync(fileHelper.getDuckTemplateDirectory());

      duckTypes.forEach(duckType => {
        fileHelper.createDuck(ducksModuleName, createdDirectory, duckType);
      });

      // Display a message box to the user
      window.showInformationMessage(`${ducksModuleName} Duck created`);
    }
  );

  const createVanillaFunctionComponent = commands.registerCommand(
    "extension.createVanillaFunctionComponent",
    async (uri: Uri) => {
      const useTypescript = Boolean(workspace.getConfiguration('SweetReactGenerator').get('useTypescript'));
      const fileHelper = new FileHelper(uri, useTypescript);

      const componentName =
        (await window.showInputBox({
          placeHolder: "Component name?"
        })) || "ChangeMe";

      const createdDirectory = fileHelper.createDirectory(componentName);
      
      fileHelper.createVanillaFunctionComponent(
        createdDirectory,
        componentName
      );
    }
  );

  context.subscriptions.push(createVanillaFunctionComponent);
  context.subscriptions.push(createDucks);
}

// this method is called when your extension is deactivated
export function deactivate() {}
