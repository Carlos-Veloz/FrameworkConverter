const { 
  createFolderStructure,
  generate,
  createOutputFile 
} = require("./chatgpt-api");

const file = "commands.txt";
const path = "../pagesOld/";
const framework = "Java";

(async () => {
  try {
    let prompt = await createFolderStructure();
    let output = await generate(prompt);
    await createOutputFile(file, output);
  } catch (error) {
    console.error(error);
  }
})();
