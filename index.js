const ARRAY_ACCESS_REGEX = /[(\d+)]/;

const getArrayValue = (value, key) => {
  let arrayAccessKeys = key;

  const arrIndices = [];

  // identify the start of the array definition
  // all the string up to now is the object we need to access
  const arrayAccessStart = key.indexOf("[");

  // name of the object
  // 'abc[0][1] -> abc
  const objectName = key.substring(0, arrayAccessStart);

  while (1) {
    const match = ARRAY_ACCESS_REGEX.exec(arrayAccessKeys);
    if (!match) break;

    // push the found array index to an array
    arrIndices.push(parseInt(match[0], 10));
    // remove the found array access so that we can continue
    arrayAccessKeys = arrayAccessKeys.replace(ARRAY_ACCESS_REGEX, "");
  }

  // get the value of the object ex: value[abc]
  let arrayValue = value && value[objectName];
  // if there is no objectName, this means array access
  if (objectName === "") {
    arrayValue = value;
  }

  arrIndices.forEach((index) => {
    // access the array index
    arrayValue = arrayValue && arrayValue[index];
  });

  return arrayValue;
};

const baseGetValue = (value, key, defaultValue) => {
  // check if there is an array access
  if (key.indexOf("[") === -1) {
    // typeof [] === 'object' therefore first check should be an array check
    // if an array is found, array will be returned with the the elements nested
    // getValue({ a: [{ b: { c: 2}}, { b: { c: 3 }}]}, 'a.b.c')) === [2, 3]
    if (Array.isArray(value)) {
      value = value.map((val) => val && val[key]);
    } else if (typeof value === "object") {
      value = value && value[key];
    } else {
      // if it is not type of an object, we can't access it
      // return the default value
      value = defaultValue;
    }
  } else {
    // getValue({ a: [{ b: { c: 2}}, { b: { c: 3 }}]}, 'a[0].b.c')) === 2
    value = getArrayValue(value, key);
  }
  return value || defaultValue;
};

// Get the value of the key inside body
// key can have dot (.) there we need to recursively go into the body
const getValue = (body, key, defaultValue) => {
  if (typeof key !== "string" || !key) return null;
  // Search for a dot
  if (key.indexOf(".") === -1) return baseGetValue(body, key, defaultValue);

  // split by the .
  const nestedKeys = key.split(".");
  let value = body;

  // Go inside the body and get the keys
  nestedKeys.forEach((key) => {
    value = baseGetValue(value, key, defaultValue);
  });

  return value;
};

module.exports = getValue;
