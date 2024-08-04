import { readdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";

const listDocuments = () => {
  try {
    const path = join(__dirname, `../../database`);
    const files = readdirSync(path).map((file) => file.split(".")[0]);

    return files;
  } catch (error) {
    return [];
  }
};

const fetchDocument = <DocType>(doc: string): DocType | null => {
  try {
    const path = join(__dirname, `../../database/${doc}.json`);
    const file = readFileSync(path).toString("utf8");

    return JSON.parse(file);
  } catch (error) {
    return null;
  }
};

const saveDocument = <DocType>(docName: string, doc: DocType): void => {
  const path = join(__dirname, `../../database/${docName}.json`);
  const data = JSON.stringify(doc);

  writeFileSync(path, data);
};

export { fetchDocument, saveDocument, listDocuments };
