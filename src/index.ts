const employeeArr = require('./employees.json');
import { demoteEmployee, Employee, fireEmployee, generateCompanyStructure, hireEmployee, promoteEmployee } from './manageEmployees'
import { getBoss, getSubordinates } from './getEmployees'

// driver function that creates company tree and tests the various functions
const main = () => {
  const newEmployee: Employee = {
    name: "Jeb",
    jobTitle: "Software Developer",
    boss: "Sarah",
    salary: "60000"
  }
  const tree = generateCompanyStructure(employeeArr.employees);
  console.log("");

  hireEmployee(tree, newEmployee, newEmployee.boss);
  fireEmployee(tree, "Alicia");
  promoteEmployee(tree, "Jared");
  demoteEmployee(tree, "Xavier", "Maria");
  console.log("");

  console.log("[getBoss]: Bill's boss is " + getBoss(tree, "Bill")?.employee.name);
  console.log("[getSubordinates]: Maria's subordinates are " + 
  getSubordinates(tree, "Maria")?.map(subord => subord.employee.name));
}

main()