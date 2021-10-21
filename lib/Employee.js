// need class for employee
class Employee {
  constructor(name, id, email) {
    this.name = name;
    this.id = id;
    this.email = email;
  }
  // create methods
  getName() {
    return this.name;
  }

  getID() {
    return this.id;
  }

  getEmail() {
    return this.email;
  }

  getRole() {
    return "Employee";
  }

};

module.exports = Employee;
