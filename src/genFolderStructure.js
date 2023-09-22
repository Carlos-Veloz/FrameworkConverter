const { 
  createMessages,
  generate,
  createOutputFile 
} = require("./chatgpt-api");

const folderStructure = "Given the following folder structure for the legacy test automation framework " +
  "\n/java\n\t/pages\n\t/tests\n\t/utils\n/resources\n\t/testdata\n\t\tData provider.xlsx\n.gitignore\nREADME.md\npom.xml\ntestng.xml\n " +
  "Could you tell me what are the commands that I have to execute in command line to: 1. Create a new directory for the project, " +
  "2. Initialize a new Node.js project, 3. Install dependencies needed, 4.Create the necessary folders for the new framework structure?"

const file = "commands.txt";

(async () => {
  try {
    let prompt = await createMessages(folderStructure);
    let output = await generate(prompt);
    await createOutputFile(file, output);
  } catch (error) {
    console.error(error);
  }
})();
