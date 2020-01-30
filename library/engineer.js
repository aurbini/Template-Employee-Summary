class Engineer extends Employee {
  constructor(name, id, title,  gitHubName ){
    super(name, id, title); 
    this.gitHubName = gitHubName; 
  }
  getRole(){
    return 'Manager'; 
  }
  getGitHub(){
    return this.gitHubName; 
  }
}

module.exports = Engineer; 