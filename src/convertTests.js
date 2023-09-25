const { 
    createMessages,
    generate,
    createOutputFile
  } = require("./chatgpt-api"),
    fs = require("fs"),
    path = require("path"),
    async = require('async');
  
  const testsPath = "../testsOld";
  const outputFolder = "./testsNew/";
  const migrateTests = "Could you adapt the following tests made with Java language and the Page Object Model (POM) design pattern to the syntax of a test written on Playwright and Javascript? " +
    "We already have all the pages and dependencies needed for the test to run, however please let me know if I should be aware of anything else. The source code is the following:\n";
  
  (async () => {
    try {
      let folderPath = path.join(__dirname, testsPath),
        validFolder = fs.readdirSync(folderPath);
      async.each(validFolder, async function (file) {
        let fileData = fs.readFileSync(path.join(__dirname, testsPath + '/' + file), "utf-8");
        const userMsg = migrateTests + fileData;
        let prompt = await createMessages(userMsg);
        let output = await generate(prompt);
        let newName = file + ".spec.js";
        await createOutputFile(outputFolder, newName, output);
      });
    } catch (error) {
      console.error(error);
    }
  })();
  