const { 
  createMessages,
  generate,
  createOutputFile
} = require("./chatgpt-api"),
  fs = require("fs"),
  path = require("path"),
  async = require('async');

const pagesPath = "../pagesOld";
const outputFolder = "./pagesNew/";
const migratePages = "Could you adapt the following Java Class that uses Selenium and Page Object Model (POM) to the syntax of Playwright? The source code is the following:\n";

(async () => {
  try {
    let folderPath = path.join(__dirname, pagesPath),
      validFolder = fs.readdirSync(folderPath);
    async.each(validFolder, async function (file) {
      let fileData = fs.readFileSync(path.join(__dirname, pagesPath + '/' + file), "utf-8");
      const userMsg = migratePages + fileData;
      let prompt = await createMessages(userMsg);
      let output = await generate(prompt);
      let newName = file + ".js";
      await createOutputFile(outputFolder, newName, output);
    });
  } catch (error) {
    console.error(error);
  }
})();
