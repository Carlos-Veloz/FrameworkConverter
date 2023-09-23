const { 
  readFileAsCode,
  createMessages,
  generate,
  createOutputFile
} = require("./chatgpt-api"),
  fs = require("fs"),
  path = require("path"),
  async = require('async');

const pagesPath = "../pagesOld";

const migratePages = "I am going to share with you the next Java class, it was made using Page Object Model (POM). Could you adapt it to the syntax of"
+ " Playwright? The source code is the following: ";

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
      await createOutputFile(newName, output);
    });
  } catch (error) {
    console.error(error);
  }
})();
