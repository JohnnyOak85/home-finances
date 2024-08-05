import { readdirSync, readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

const projectRoot = resolve(__dirname, "../../../");
const databasePath = `${projectRoot}/database`;

const listDocuments = () => {
  try {
    const path = databasePath;
    const files = readdirSync(path).map((file) => file.split(".")[0]);

    return files;
  } catch (error) {
    return [];
  }
};

const fetchDocument = <DocType>(doc: string): DocType | null => {
  try {
    const path = `${databasePath}/${doc}.json`;
    const file = readFileSync(path).toString("utf8");

    return JSON.parse(file);
  } catch (error) {
    return null;
  }
};

const saveDocument = <DocType>(docName: string, doc: DocType): void => {
  const path = `${databasePath}/${docName}.json`;
  const data = JSON.stringify(doc);

  writeFileSync(path, data);
};

export { fetchDocument, saveDocument, listDocuments };
