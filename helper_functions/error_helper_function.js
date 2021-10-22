function error_helper_function(promise) {
  return promise
    .then(data => {
      return [null, data];
    })
    .catch(err => [err]);
}

module.exports.errorFunction = error_helper_function;
