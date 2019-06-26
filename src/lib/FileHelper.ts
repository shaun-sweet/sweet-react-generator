import * as path from "path";
import * as fs from "fs";
import { Uri } from "vscode";
import * as fse from "fs-extra";

export class FileHelper {
  private templatesRootDir: string = path.join(
    __dirname,
    "../../assets/templates"
  );
  constructor(private uri: Uri) {}

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

    const fileToWrite = `${targetLocation}/${duckFileType}.js`;
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
        fileNameToWrite = `${targetLocation}/${fileName}.js`;
      } else if (file === "VanillaFunctionComponent.template") {
        fileNameToWrite = `${targetLocation}/${componentName}.js`;
      } else {
        fileNameToWrite = `${targetLocation}/${componentName}.styles.js`;
      }

      fs.writeFileSync(fileNameToWrite, template);
    });
  }

  getVanillaFunctionComponentTemplateDirectory() {
    return `${this.templatesRootDir}/VanillaFunctionComponent`;
  }

  getDuckTemplateDirectory() {
    return `${this.templatesRootDir}/ducks`;
  }

  private getTargetPath(targetLocation: string) {
    if (fs.lstatSync(targetLocation).isDirectory()) {
      return targetLocation;
    }

    return path.dirname(targetLocation);
  }
}
