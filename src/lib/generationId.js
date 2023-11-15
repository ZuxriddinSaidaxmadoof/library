export const generationId = (data) => {
  let id = 0;

  for (let i = 0; i < data.length; i++) {
    const element = data[i];

    if (element.id > id) {
      id = element.id;
    }
  }

  return id + 1;
};
