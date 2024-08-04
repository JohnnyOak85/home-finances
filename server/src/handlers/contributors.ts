import { validationError } from "../errors/errors";
import { fetchDocument, saveDocument } from "../tools/orm";

const docName = "contributors";

const getContributors = () => {
  try {
    return fetchDocument<ContributorDoc>(docName);
  } catch (error) {
    throw error;
  }
};

const updateContributor = (contributor: Contributor) => {
  try {
    const doc = fetchDocument<ContributorDoc>(docName);
    const index = doc.findIndex(({ name }) => contributor.name === name);

    if (index === -1) {
      throw validationError(`Contributor does not exist: ${contributor.name}`);
    }

    doc[index] = { ...doc[index], ...contributor };

    saveDocument(docName, doc);
  } catch (error) {
    throw error;
  }
};

export { getContributors, updateContributor };
