const path = require('path');
const fs = require('fs');

const delFile = async (filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(path.resolve(filePath));
      console.log(`'${filePath}' has been removed successfully!`);
    } else {
      console.log(`'${filePath}' does not exist!`);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = delFile;
