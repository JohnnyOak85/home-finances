import { notFound, validationError } from "../errors/errors";
import { fetchDocument, saveDocument } from "../tools/orm";

const docName = "contributors";

const getContributors = () => {
  try {
    const doc = fetchDocument<ContributorDoc>(docName);

    if (!doc) {
      throw notFound("Contributor document does not exist");
    }

    return doc;
  } catch (error) {
    throw error;
  }
};

const updateContributor = (contributor: Contributor) => {
  try {
    const doc = fetchDocument<ContributorDoc>(docName);

    if (!doc) {
      throw notFound("Contributor document does not exist");
    }

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
