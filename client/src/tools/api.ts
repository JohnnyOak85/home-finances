const host = "http://192.168.1.166:6789";

const getDocument = async <DocType>(resource: string): Promise<DocType> => {
  try {
    const response = await fetch(`${host}/${resource}`);
    const data = await response.json();

    if (response.status >= 300) {
      throw data;
    }

    return data;
  } catch (error) {
    throw error;
  }
};

const updateDocument = async <DocType>(
  resource: string,
  body: DocType
): Promise<void> => {
  try {
    await fetch(`${host}/${resource}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    // TODO: Throw a message modal depending on status code
  } catch (error) {
    throw error;
  }
};

export { getDocument, updateDocument };
