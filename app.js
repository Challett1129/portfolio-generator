const inquirer = require('inquirer');

// const fs = require('fs');

// const generatePage = require('./src/page-template');

// const pageHTML = generatePage(name, github)

// // const printProfileData = (profileDataArr) => {
// //     profileDataArr.forEach(profileItem => console.log(profileItem));
// // }

// // printProfileData(profileDataArgs);

// fs.writeFile('index.html', generatePage(name, github), err => {
//     if (err) throw err; 

//     console.log('Porfolio complete! Check out index.html to see the output!');
// });

inquirer
    .prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name?'
        }
    ])
    .then(answers => console.log(answers));