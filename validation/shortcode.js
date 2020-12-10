const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.fullUrl = !isEmpty(data.fullUrl) ? data.fullUrl : "";
  data.shortCode = !isEmpty(data.shortCode) ? data.shortCode : "";

  if (validator.isEmpty(data.fullUrl)) {
    errors.fullUrl = "Full URL field is required";
  }

  if (!validator.isLength(data.shortCode, { min: 4, max: 30 })) {
    errors.shortCode = "Entered shortCode must be minimum 4 characters";
  }

  if (validator.isEmpty(data.shortCode)) {
    errors.shortCode = "ShortCode field is required";
  }  

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
