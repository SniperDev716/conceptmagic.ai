exports.sleep = (time) =>
  new Promise((resolve) => setTimeout(resolve, time * 1000));