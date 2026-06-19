export const parseJson = (string) => {
  try {
    return JSON.parse(string);
  } catch {
    return string;
  }
};

export const isEmptyArray = (arr) => {
  return Array.isArray(arr) && arr.length === 0;
};

export const isEmptyObject = (object) => {
  return object === null || (typeof object === 'object' && Object.keys(object).length === 0);
};

export const removeEmpty = (object, removeEmptyObject = false) => {
  if (Array.isArray(object)) {
    return object
      .map((item) => {
        return removeEmpty(item, removeEmptyObject);
      })
      .filter((item) => {
        return typeof item !== 'undefined' && !isEmptyArray(item) && !isEmptyObject(item);
      });
  }
  if (typeof object === 'object' && object !== null) {
    return Object.keys(object).reduce((acc, item) => {
      if (object[item] && typeof object[item] !== 'boolean' && typeof object[item] !== 'number') {
        acc[item] = removeEmpty(object[item], removeEmptyObject);
        if (removeEmptyObject && typeof acc[item] === 'object' && Object.keys(acc[item]).length === 0) {
          delete acc[item];
        }
      } else if (typeof object[item] === 'boolean' || typeof object[item] === 'number') {
        acc[item] = object[item];
      }
      return acc;
    }, {});
  }
  return object;
};
