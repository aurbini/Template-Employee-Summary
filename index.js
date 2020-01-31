//Node Modules Needed
const inquirer = require('inquirer'); 
const util = require("util");
const fs = require('fs');
//Importing Employee Classes
const Manager = require('./lib/manager.js'); 
const Engineer = require('./lib/engineer'); 
const Intern = require('./lib/intern'); 

//Promisifying FS methods
const readFileAsync = util.promisify(fs.readFile);
const appendFileAsync = util.promisify(fs.appendFile);
const writeFileAsync = util.promisify(fs.writeFile);

//making empty team in order to push data
//collected from user inputs to
const team = []; 
//ask the user for the name, id, title, email, etc 
//of each member of their team until team is complete
const createManager = () => {
  console.log('Please build out your team')
  inquirer  
    .prompt([
      {
        type: "input", 
        message: "Who is your team manager", 
        name: "name"
      },  
      {
        type: "input", 
        message: "What is your managers ID?", 
        name: "ID"
      },{
        type: "input", 
        message: "What is your managers email?", 
        name: "email"
      },{
        type: "input", 
        message: "What is your managers office number?", 
        name: "officeNumber"
        }
    ]).then(({name, ID, email, officeNumber})=>{
      const newManager = new Manager(name, ID, email, officeNumber); 
      team.push(newManager); 
      createTeam(); 
    })
}
const createTeam = () => {
  inquirer.prompt(
    [{ 
      type: "list", 
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
      //function to break out of inquirer and render team
        renderTeam(team);
    }
  })
}
const addEngineer = () => {
  inquirer.prompt(
    [{
        type: "input", 
        message: "Who is your engineers name?", 
        name: "name"
      },
      {
        type: "input", 
        message: "What is your engineers ID?", 
        name: "id"
      },{
        type: "input", 
        message: "Who is your engineers email?", 
        name: "email"
      },{
        type: "input", 
        message: "Who is your engineers github?", 
        name: "github"
      }
  ]).then(({name, id, email, github})=>{
    const newEngineer = new Engineer(name, id, email, github);
    //team.push(newEngineer);
    team.push(newEngineer);
    createTeam();
  })
} 
  const addIntern = () => {
  inquirer.prompt(
    [{
        type: "input", 
        message: "Who is your interns name", 
        name: "name"
      },
      {
        type: 'input', 
        message: "What is your interns ID?", 
        name: "id"
      },{
        type: 'input', 
        message: "Who is your interns email?", 
        name: "email"
      },{
        type: 'input', 
        message: "Who is your interns School?", 
        name: "school"
      }
    ]).then(({name, id, email, school})=>{
      const newIntern = new Intern(name, id, email,school); 
      team.push(newIntern); 
      createTeam();
    })
}
 createManager();
  // //build team or run  test///
  // const buildTeam =() => {

  //  team.forEach(async teamMember => {

//Put the data into each template and appvend it all to empty
//main.js file 
async function renderTeam(team){
  try{
    appendString = '';
    for(let i = 0; i < team.length;i++){
      let teamMember = team[i];
      if(teamMember.getRole() === 'Manager'){
        const { name, id, email, officeNumber } = teamMember; 
        const managerHTML = await readFileAsync('./templates/manager.html', 'utf8');
        const updatedHTML = managerHTML.replace(`{{Name}}`, `${name}`).replace(`{{ID}}`, `${id}`).replace(`{{Email}}`, `${email}`).replace(`{{officeNumber}}`, `${officeNumber}`)
        appendString += updatedHTML; 
        //const mainHTML = await appendFileAsync('./templates/main.html', updatedHTML, 'utf8'); 
      }else if(teamMember.getRole() === 'Engineer'){
      console.log(teamMember);
        const { name, id, email, github } = teamMember; 
        const engineerHTML= await readFileAsync('./templates/engineer.html', 'utf8');
        const updatedHTML = engineerHTML.replace(`{{Name}}`, `${name}`).replace(`{{ID}}`, `${id}`).replace(`{{Email}}`, `${email}`).replace(`{{github}}`, `${github}`)
        //const mainHTML = await appendFileAsync('./templates/main.html', updatedHTML,'utf8');
        //console.log('append engineer') 
        appendString += updatedHTML; 

      }else if(teamMember.getRole() === 'Intern'){
        const { name, id, email, school } = teamMember; 
        const internHTML = await readFileAsync('./templates/intern.html', 'utf8');
        const updatedHTML = internHTML.replace(`{{Name}}`, `${name}`).replace(`{{ID}}`, `${id}`).replace(`{{Email}}`, `${email}`).replace(`{{School}}`, `${school}`)
       // const mainHTML = await appendFileAsync('./templates/main.html', updatedHTML, 'utf8'); 
       // console.log('append intern')
       appendString += updatedHTML; 

      }
    } 
  }catch(err){
    console.log(err);
  }
  fs.readFile("./templates/team.html", "utf8", function(err, data){
    if(err){
      return console.log(err);
    }
    data = data.replace("{{team}}", appendString);

    fs.writeFile("./output/teamHTML.html", data, function(err){
      if(err){
        return console.log(err);
      }
      console.log("html complete")
    })
  })

  // console.log('finished rendering components');
  // renderTeamHTML();
}


//  async function renderTeamHTML(){
//       try{
//     const mainHTML = await readFileAsync('./templates/main.html', 'utf8');
//     console.log(mainHTML);
//     const teamHTML = await readFileAsync('./templates/team.html', 'utf8');
//     //console.log(teamHTML);
//     const updatedHTML = teamHTML.replace(`{{team}}`, `${mainHTML}`)


//     await writeFileAsync('./templates/team.html', updatedHTML, 'utf8');




//   }catch(err){
//       console.log(err);
//   }
// }

  

