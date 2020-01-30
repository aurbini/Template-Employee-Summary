var Employee = require('./employee') 

class Manager extends Employee {
  constructor(name, id, title, email, officeNumber ){
    super(name, id, title, email); 
    this.officeNumber = officeNumber; 
  }
  getRole(){
    return 'Manager'; 
  }
}

//const newManager = new Manager('g', 1, 'manager', 'g@gmail.com' , 2 )
console.log(newManager);

module.exports = Manager; 