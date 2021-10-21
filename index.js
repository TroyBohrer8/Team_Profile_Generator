// link to HTML page
const generateHTML = require("./src/generateHTML");

// import different team members
const Employee = require("./lib/Employee");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");

// need node modules
const fs = require("fs");
const inquirer = require("inquirer");

// team array
const teamArray = [];

// manager prompts
const addManager = () => {
  return (
    inquirer
      .prompt([
        {
          type: "input",
          name: "name",
          message: "Who is the manager of this team?",
          validate: (nameInput) => {
            if (nameInput) {
              return true;
            } else {
              console.log("Please enter the manager's name");
              return false;
            }
          },
        },
        {
          type: "input",
          name: "id",
          message: "Please enter the manager's ID",
          validate: (nameInput) => {
            if (isNaN(nameInput)) {
              console.log("Please enter the manager's ID");
              return false;
            } else {
              return true;
            }
          },
        },
        {
          type: "input",
          name: "email",
          message: "Please enter the manager's email",
          validate: (email) => {
            valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
            if (valid) {
              return true;
            } else {
              console.log("Please enter a valid email");
              return false;
            }
          },
        },
        {
          type: "input",
          name: "officeNumber",
          message: "Please enter the manager's office number",
          validate: (nameInput) => {
            if (isNaN(nameInput)) {
              console.log("Please enter the manager's office number");
              return false;
            } else {
              return true;
            }
          },
        },
      ])
      // take manager input, plug into Manager class then push to array
      .then((managerInput) => {
        const { name, id, email, officeNumber } = managerInput;
        const manager = new Manager(name, id, email, officeNumber);

        teamArray.push(manager);
        console.log(manager);
      })
  );
};

const addEmployee = () => {
  console.log(`
    =====================
    Adding employees to the team
    =====================
    `);

  return inquirer
    .prompt([
      {
        type: "list",
        name: "role",
        message: "Please choose your employee's role",
        choices: ["Enginner", "Intern"],
      },
      {
        type: "input",
        name: "name",
        message: "What's the name of your employee?",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please enter your employee's name");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "id",
        message: "Please enter your employee's id",
        validate: (nameInput) => {
          if (isNaN(nameInput)) {
            console.log("Please enter your employee's id");
            return false;
          } else {
            return true;
          }
        },
      },
      {
        type: "input",
        name: "email",
        message: "Please enter your employee's email",
        validate: (email) => {
          valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
          if (valid) {
            return true;
          } else {
            console.log("Please enter a valid email");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "github",
        message: "Please enter the employee's github username",
        when: (input) => input.role === "Engineer",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please enter the employee's github username");
          }
        },
      },
      {
        type: "input",
        name: "school",
        message: "Please enter the intern's school",
        when: (input) => input.role === "Intern",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Pleas enter the intern's school");
          }
        },
      },
      {
        type: "confirm",
        name: "confirmAddEmployee",
        message: "Would you like to add any more team members?",
        default: false,
      },
    ])
    .then((employeeData) => {
      // data for different employee types
      let { name, id, email, role, github, school, confirmAddEmployee } =
        employeeData;
      let employee;

      if (role === "Engineer") {
        employee = new Engineer(name, id, email, github);
        console.log(employee);
      } else if (role === "Intern") {
        employee = new Intern(name, id, email, school);
        console.log(employee);
      }
      teamArray.push(employee);

      if (confirmAddEmployee) {
        return addEmployee(teamArray);
      } else {
        return teamArray;
      }
    });
};

// need to generate HTML page to fs
const writeFile = (data) => {
  fs.writeFile("./dist/index.html", data, (err) => {
    // if there is an error
    if (err) {
      console.log(err);
      return;
      // profile has been created
    } else {
      console.log(
        "Your team profile page has been sucessfully created! Check out the index.html"
      );
    }
  });
};

addManager()
  .then(addEmployee)
  .then((teamArray) => {
    return generateHTML(teamArray);
  })
  .then((pageHTML) => {
    return writeFile(pageHTML);
  })
  .catch((err) => {
    console.log(err);
  });
