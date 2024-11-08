export const validateFormFields = (documentData, setErrorMessage) => {
  //fnc to check form fileds values if are valid

  let errors = {};

  Object.keys(documentData).forEach((key) => {
    if (documentData[key] === "") {
      // If the field is empty, set an error message
      errors[key] = "Fill out the " + key + " of the document";
    }
  });

  // Update the error message
  setErrorMessage(errors);

  // Check if there are any errors
  const isValid = Object.keys(errors).length === 0;

  return { valid: isValid };
};
