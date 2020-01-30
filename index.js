const inquirer = require('inquirer'); 
var Manager = require('./manager'); 
var Engineer = require('./engineer'); 
var Intern = require('./intern'); 


getTeam(); 
const team = [];
//Create manager function
//ask for name, id, title, email, officeNumber from user
const createManager = () => {
  console.log('Please build out your team')
  inquirer.prompt(
  [{
      type: input, 
      message: "Who is your team manager", 
      name: "name"
    },
    {
      type: input, 
      message: "What is your managers ID?", 
      name: "ID"
    },{
      type: input, 
      message: "Who is your managers title?", 
      name: "title"
    },{
      type: input, 
      message: "Who is your managers email?", 
      name: "email"
    },{
      type: input, 
      message: "Who is your managers office?", 
      name: "office"
      }
    ]).then((answers)=>{
      const newManager = new Manager(answers.name, answers.ID, answers.title, answers.email, 
        answers.office); 
      team.push(newManager); 
      createTeam(); 
    })
}
const createTeam = () => {
  inquirer.prompt(
    [{ 
      type: list, 
      message: 'The role of the employee to add?',
      name: "teamMember",
      choices: [
        'engineer', 
        'intern', 
        'Team Finished'
      ]
    }]
  ).then((answer) => {
    switch(answer.teamMember){
      case 'engineer':
        addEngineer()
      break;
      case 'intern':
        addIntern();
      break;
      default: 
        buildTeam(); 
    }
  })
}
const addEngineer = () => {
  inquirer.prompt(
    [{
        type: input, 
        message: "Who is your engineers name?", 
        name: "name"
      },
      {
        type: input, 
        message: "What is your engineers ID?", 
        name: "ID"
      },{
        type: input, 
        message: "Who is your engineers title?", 
        name: "title"
      },{
        type: input, 
        message: "Who is your engineers email?", 
        name: "email"
      },{
        type: input, 
        message: "Who is your engineers gitHub?", 
        name: "gitHub"
      }
  ]).then((answers)=>{
    const newEngineer = new Engineer(answers.name, answers.ID, answers.title, answers.email, answers.gitHub);
    team.push(newEngineer);
  })
}
const addIntern = () => {
  inquirer.prompt(
    [{
        type: input, 
        message: "Who is your interns name", 
        name: "name"
      },
      {
        type: input, 
        message: "What is your interns ID?", 
        name: "ID"
      },{
        type: input, 
        message: "Who is your interns title?", 
        name: "title"
      },{
        type: input, 
        message: "Who is your interns email?", 
        name: "email"
      },{
        type: input, 
        message: "Who is your interns School?", 
        name: "school"
      }
    ]).then((answers)=>{
      const newIntern = new Intern(answers.name, answers.ID, answers.title, answers.email,answers.school);  
      team.push(newIntern); 
    })
}

