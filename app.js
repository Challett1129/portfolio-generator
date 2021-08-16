const inquirer = require('inquirer');

const { writeFile, copyFile } = require('./utils/generate-site.js')

const generatePage = require('./src/page-template.js');

// const pageHTML = generatePage(name, github)

// // const printProfileData = (profileDataArr) => {
// //     profileDataArr.forEach(profileItem => console.log(profileItem));
// // }

// // printProfileData(profileDataArgs);

// fs.writeFile('index.html', generatePage(name, github), err => {
//     if (err) throw err; 

//     console.log('Porfolio complete! Check out index.html to see the output!');
// });
const promptUser = () => {
    return inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is your name? (Required)',
        validate: nameInput => {
            if (nameInput) {
              return true;
          } else {
              console.log('Please enter your name!');
              return false;
           }
        }
      },
      {
          type: 'input',
          name: 'github',
          message: 'Enter your GitHub Username. (Required)',
          validate: githubInput => {
            if (githubInput) {
              return true;
          } else {
              console.log('Please enter your GitHub username!');
              return false;
           }
        }
      },
      {
        type: 'confirm',
        name: 'confirmAbout',
        message: 'Would you like to enter some information about yourself for an "About" section?',
        default: true
      },
      {
          type: 'input',
          name: 'about', 
          message: 'Provide some information about yourself',
          when: ({ confirmAbout }) => {
              if (confirmAbout) {
                  return true; 
              } else {
                  return false;
              }
          }
      }
    ]);
  };
  

  const promptProject = portfolioData => {
      console.log(`
      =================
      Add a new Project
      =================
      `);
      //if there is no 'projects' array property, create one
      if (!portfolioData.projects) {
        portfolioData.projects = []; 
    }
      return inquirer
      .prompt([
          {
              type: 'input',
              name: 'name', 
              message: 'What is the name of your project? (Required)',
              validate: projectNameInput => {
                  if (projectNameInput) {
                      return true;
                  } else {
                      console.log('Please enter your project\'s name!');
                      return false;
                  }
              }
          },
          {
              type: 'input',
              name: 'description', 
              message: 'Provide a description of the project. (Required)',
              validate: descriptionInput => {
                if (descriptionInput) {
                  return true;
              } else {
                  console.log('Please enter a description for your project!');
                  return false;
               }
            }
          },
          {
              type: 'checkbox', 
              name: 'languages',
              message: 'What did you build this project with? (Check all that apply)',
              choices: ['Javascript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
          },
          {
              type: 'input', 
              name: 'link', 
              message: 'Enter the Github link to your project. (Required)',
              validate: linkInput => {
                if (linkInput) {
                  return true;
              } else {
                  console.log('Please enter a link to your project\'s GitHub Repo!');
                  return false;
               }
            }
          },
          {
              type: 'confirm',
              name: 'feature', 
              message: 'Would you like to feature this project?',
              default: false  
          },
          {
              type: 'confirm',
              name: 'confirmAddProject', 
              message: 'Would you like to enter another project?', 
              default: false 
          }
        ])
        .then(projectData => {
            portfolioData.projects.push(projectData);
            console.log(portfolioData);
            if (projectData.confirmAddProject) {
              return promptProject(portfolioData);
            } else {
              return portfolioData;
            }
            
        });
    };

    const mockData = {
        about: 'Collin likes cs',
        name: 'Collin',
        github: 'Challett1129',
        projects: ['run buddy']
    }

// promptUser()
//   .then(promptProject)
//   .then(portfolioData => {
//     const pageHTML = generatePage(portfolioData);

//     fs.writeFile('./dist/index.html', pageHTML, err => {
//       if (err) throw new Error(err);

//       console.log('Page created! Check out index.html in this directory to see it!');
//     })
//     fs.copyFile('./src/style.css', './dist/style.css', err => {
//       if (err) {
//         console.log(err)
//         return; 
//       }
//       console.log('Style sheet copied sucessfully');
//     });
// });


promptUser()
  .then(promptProject)
  .then(portfolioData => {
    return generatePage(portfolioData);
  })
  .then(pageHTML => {
    return writeFile(pageHTML);
  })
  .then(writeFileResponse => {
    console.log(writeFileResponse);
    return copyFile();
  })
  .then(copyFileResponse => {
    console.log(copyFileResponse);
  })
  .catch(err  => {
    console.log(err);
  });

  