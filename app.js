const fs = require('fs');

const generatePage = require('./src/page-template');

const profileDataArgs = process.argv.slice(2, process.argv.length);

const [name, github] = profileDataArgs;

// // const printProfileData = (profileDataArr) => {
// //     profileDataArr.forEach(profileItem => console.log(profileItem));
// // }

// printProfileData(profileDataArgs);

fs.writeFile('index.html', generatePage(name, github), err => {
    if (err) throw err; 

    console.log('Porfolio complete! Check out index.html to see the output!');
});
