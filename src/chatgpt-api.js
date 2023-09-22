const OpenAI = require("openai"),
  fs = require("fs"),
  path = require("path"),
  async = require('async');

require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const background = "You are Software Development Engineer in Test (SDET) with 10 years of experience in the Information Technology Industry." +
  " You have created many test automation frameworks from scratch over the years using different technologies but mainly Java, Selenium," +
  " TestNG and Gradle and now you are in charge of migrating those legacy frameworks to more reliable, scalable and maintainable" +
  " technologies such as Node.js, Javascript, and Playwright.";



module.exports = {
  async createMessages(request) {
    const messages = [
      {
        role: "system",
        content: background,
      },
      {
        role: "user",
        content: request,
      },
    ];
    return messages;
  },

  /*async readFileAsCode(filePath) {
    try {
      let folderPath = path.join(filePath),
        validFolder = fs.readdirSync(folderPath);
      async.each(validFolder, async function (file) {
        let fileData = fs.readFileSync(path.join(__dirname, filePath + '/' + file), "utf-8");
        let bodyMessage = migratePages + fileData;
        let prompt = this.createMessages(bodyMessage);
        let output = await generate(prompt);
        await createOutputFile(file, output);
      });
    } catch (error) {
      throw new Error(`Error reading file: ${error}`);
    }
  },*/
  async readFileAsCode(filePath, file) {
    try {
      let folder = path.join(filePath);
      let fileData = fs.readFileSync(path.join(__dirname, folder + file), 'utf-8');
      return fileData;
    } catch (error) {
      throw new Error(`Error reading file: ${error}`);
    }
  },

  async generate(messages) {
    const spinner = (await import("ora"))
      .default("Please wait processing your request...")
      .start();

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages,
        temperature: 0.2,
        max_tokens: 2048,
      });

      const { message } = response.choices[0];
      output = message.content;
      spinner.succeed("Output file created");
      return output;
    } catch (error) {
      spinner.fail(`Error: ${error}`);
    }
  },

  async createOutputFile(file, output) {
    //path where unit test file is created
    const outputFolder = "./output/";
    let fileName = path.join(outputFolder + file);
    try {
      fs.writeFileSync(fileName, output);
      console.log(`Message written to file: ${fileName}`);
    } catch (error) {
      console.error(`Error writing to file: ${error}`);
    }
  },
};
