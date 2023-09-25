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

  async createOutputFile(folderName, name, content) {
    let fileName = path.join(folderName + name);
    try {
      fs.writeFileSync(fileName, content);
      console.log(`Message written to file: ${fileName}`);
    } catch (error) {
      console.error(`Error writing to file: ${error}`);
    }
  },
};
