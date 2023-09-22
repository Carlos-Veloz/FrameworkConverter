const { 
  readFileAsCode,
  createMessages,
  generate,
  createOutputFile
} = require("./chatgpt-api");

const path = "../pagesOld/";
const file = "Base.java";
const framework = "Dart";

const migratePages = "I am going to share with you the next Java class, it was made using Page Object Model (POM). Could you adapt it to the syntax of"
+ " Playwright and Javascript? The source code is the following: ";

(async () => {
  try {
    const code = await readFileAsCode(path, file);
    const userMsg = migratePages + code;
    let prompt = await createMessages(userMsg);
    let output = await generate(prompt);
    await createOutputFile(file, output);
  } catch (error) {
    console.error(error);
  }
})();
