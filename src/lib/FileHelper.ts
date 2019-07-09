import * as path from "path";
import * as fs from "fs";
import { Uri } from "vscode";
import * as fse from "fs-extra";

export class FileHelper {
  private templatesRootDir: string = path.join(
    __dirname,
    "../../assets/templates"
  );
  constructor(private uri: Uri, private useTypescript: boolean) {}

  createDirectory(dirName: string) {
    const contextMenuTargetPath = this.getTargetPath(this.uri.fsPath);
    const directoryToCreate = `${contextMenuTargetPath}/${dirName}`;
    fse.mkdirSync(directoryToCreate);
    return directoryToCreate;
  }

  createDuck(
    moduleName: string = "RenameMe",
    targetLocation: string,
    duck: string
  ) {
    const duckTemplate = `${this.getDuckTemplateDirectory()}/${duck}`;
    const [duckFileType] = duck.split(".");
    const indexDuck = fs
      .readFileSync(duckTemplate)
      .toString()
      .replace(/{moduleName}/g, moduleName);

    const fileToWrite = this.useTypescript
      ? `${targetLocation}/${duckFileType}.ts`
      : `${targetLocation}/${duckFileType}.js`;
    fs.writeFileSync(fileToWrite, indexDuck);
    return fileToWrite;
  }

  createVanillaFunctionComponent(
    targetLocation: string,
    componentName: string
  ) {
    const templateDirectory = this.getVanillaFunctionComponentTemplateDirectory();
    const componentFiles = fs.readdirSync(templateDirectory);

    componentFiles.forEach(file => {
      const template = fs
        .readFileSync(`${templateDirectory}/${file}`)
        .toString()
        .replace(/{moduleName}/g, componentName);

      const fileNameArray = file.split(".");
      let fileNameToWrite: string;
      const [fileName] = fileNameArray;
      if (file === "index.template") {
        fileNameToWrite = this.useTypescript
          ? `${targetLocation}/${fileName}.ts`
          : `${targetLocation}/${fileName}.js`;
      } else if (file === "VanillaFunctionComponent.template") {
        fileNameToWrite = this.useTypescript
          ? `${targetLocation}/${componentName}.tsx`
          : `${targetLocation}/${componentName}.js`;
      } else {
        fileNameToWrite = this.useTypescript
          ? `${targetLocation}/${componentName}.styles.ts`
          : `${targetLocation}/${componentName}.styles.js`;
      }

      fs.writeFileSync(fileNameToWrite, template);
    });
  }

  getVanillaFunctionComponentTemplateDirectory() {
    const templateDirectory = this.useTypescript
      ? `${this.templatesRootDir}/typescript/VanillaFunctionComponent`
      : `${this.templatesRootDir}/VanillaFunctionComponent`;

    return templateDirectory;
  }

  getDuckTemplateDirectory() {
    const templateDirectory = this.useTypescript
      ? `${this.templatesRootDir}/ducks`
      : `${this.templatesRootDir}/ducks`;
    return templateDirectory;
  }

  private getTargetPath(targetLocation: string) {
    if (fs.lstatSync(targetLocation).isDirectory()) {
      return targetLocation;
    }

    return path.dirname(targetLocation);
  }
}
