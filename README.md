# PoC-Framework-Converter
This project was created as a proof of concept using openai to take a test automation framework written with Java & Selenium, and adapt it to latest technologies.

## Installation
Clone this repository into your local machine
```
git@github.com:Carlos-Veloz/FrameworkMigrator.git
cd FrameworkMigrator
```
Install dependencies by running
```
npm install
```
In order for you to use this project you will need to create an account on [OpenAI](https://openai.com/) then refer to [Authentication](https://platform.openai.com/docs/api-reference/authentication) to understand how to generate your APIKey which you will have to place in a .env file with the following name.
```
OPENAI_API_KEY="Your_OpenAI_APIKey"
```

## Getting started
Considering that you have a test automation framework in a repository first you will have to manually copy all the files you want to convert. Place you pages files under pagesOld folder, do the same for testOld folder (where you should copy all test that need to be converted).

Adapt you folder structure of your old repository as a single text line as follows:
```
\n/java\n\t/pages\n\t/tests\n\t/utils\n/resources\n\t/testdata\n\t\tData provider.xlsx\n.gitignore\nREADME.md\npom.xml\ntestng.xml
```
This information is required for us to generate the commands for the new shell and npm project.
There are 3 commands in the package.json that you need to know:

Commands to create new folder structure
```
npm run generateCommands
```
Convert old pages folder
```
npm run convertPages
```
And convert old test folder
```
npm run convertTests
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.
