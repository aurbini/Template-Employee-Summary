var Employee = require('./employee') 


class Manager extends Employee {
  constructor(name, id, email, officeNumber ){
    super(name, id, email); 
    this.officeNumber = officeNumber; 
  }
  getRole(){
    return 'Manager'; 
  }
  getOfficeNumber(){
    return this.officeNumber; 
  }
}

//const newManager = new Manager('g', 1, 'g@gmail.com' , 2 )
//console.log(newManager);

module.exports = Manager 