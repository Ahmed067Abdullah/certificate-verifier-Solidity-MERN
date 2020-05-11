const errorMessagesGenerator = (errors, fieldName) => {
  errors.forEach(err => {
    console.log(err);
    switch (err.code) {
      case "any.required":
        err.message = `${fieldName} is required!`;
        break;
      case "string.empty":
        err.message = `${fieldName} can't be empty!`;
        break;
      case "string.length":
        err.message = `${fieldName} must consist of ${err.local.limit} characters!`;
        break;
      case "string.max":
        err.message = `${fieldName} must have at max ${err.local.limit} character!`;
        break;
      case "string.min":
        err.message = `${fieldName} must have at least ${err.local.limit} character!`;
        break;

      default:
        break;
    }
  });
  return errors;
};

module.exports = errorMessagesGenerator;