const fs = require("fs");
const path = require("path");

const getAllFiles = function (dirPath, arrayOfFiles) {
  files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function (file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(
        path.join("@import url(../" + dirPath, "/", file + ");")
      );
    }
  });

  return arrayOfFiles;
};

const arrayOfFiles = getAllFiles("./blocks"); //read subdirectoiers
const filePath = "./pages/index.css"; //path to write

const normalize = "@import url(../vendor/normalize.css);";

fs.writeFileSync(filePath, normalize + arrayOfFiles.join("\n"));
