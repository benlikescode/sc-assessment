import { getBoss, getEmployee, getSubordinates } from "./getEmployees";

export type Employee = {
  name: string
  jobTitle: string
  boss: string
  salary: string
}

export class TreeNode {
  employee: Employee
  descendants: Array<TreeNode>;
  constructor(employee: Employee) {
    this.employee = employee;
    this.descendants = [];
  }
}

// generates the company tree
export const generateCompanyStructure = (employeeArr: Employee[]) =>  {
  console.log("Normalizing JSON file...");
  console.log("Generating employee tree...");
  let root = new TreeNode(employeeArr[0]);
  
  employeeArr.map(employee => { 
    // normalize the names with emails
    if (employee.name.includes("@")) {
      let firstName = employee.name.split("@")[0];
      firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
      employee.name = firstName;
    }

    let thisNode = new TreeNode(employee);
    setDescendants(root, employee.boss, thisNode);
  });
  return root;
}

// recursive DFS to find the boss and append the curr employee to their descendants
export const setDescendants = (tree: TreeNode, bossName: string, currNode: TreeNode) => {
  if (tree.employee.name === bossName) {
    tree.descendants.push(currNode);
  }
  for (const node of tree.descendants) {
    setDescendants(node, bossName, currNode);  
  } 
}

// Reuses above helper function (setDescendants) to append new employee to the given boss's descendants
export const hireEmployee = (tree: TreeNode, newEmployee: Employee, bossName: string) => {
  setDescendants(tree, bossName, new TreeNode(newEmployee));
  console.log(`[hireEmployee]: Added new employee (${newEmployee.name}) with ${bossName} as their boss`);
}

// removes the given employee from the tree promotes a random subordinate if they exist
export const fireEmployee = (tree: TreeNode, employeeName: string) => {
  let employeeNode = getEmployee(tree, employeeName);
  const bossNode = getBoss(tree, employeeName);
  if (employeeNode) {
    // if the fired employee has no subordinates, we simply remove them from their bosses descendants
    if (employeeNode.descendants.length === 0) {
      if (bossNode) {
        let filtered = bossNode.descendants.filter(descendant => descendant.employee.name !== employeeName);
        bossNode.descendants = filtered;
        console.log(`[fireEmployee]: Fired ${employeeName}`);
      }
    }
    else {
      // if the fired employee does have subordinates, we choose one at random and promote them
      const randomSubord = employeeNode.descendants[Math.floor(Math.random() * employeeNode.descendants.length)];
      const replacedName = randomSubord.employee.name;
      employeeNode.employee.name = replacedName;
      randomSubord.descendants.map(descendant => employeeNode?.descendants.push(descendant));
      employeeNode.descendants = employeeNode.descendants.filter(descendant => descendant.employee.name !== replacedName);

      // Updating the boss value of all the subordinates of the new promoted employee
      for (const subord of employeeNode.descendants) {
        subord.employee.boss = replacedName;
      }
      console.log(`[fireEmployee]: Fired ${employeeName} and replaced with ${replacedName}`);
    }
  } 
  else {
    console.log("That employee does not exist");
  }
}

// promotes given employee (swaps positions with boss)
export const promoteEmployee = (tree: TreeNode, employeeName: string) => {
  const employeeNode = getEmployee(tree, employeeName); 
  const bossNode = getBoss(tree, employeeName);
  const bossName = bossNode?.employee.name
  if (bossNode) {
    // storing the name of boss in temp variable, setting the boss name to promoted employee name, then setting the employee name to temp
    const temp = bossNode.employee.name;
    bossNode.employee.name = employeeName;
    employeeNode!.employee.name = temp;
    // updating the new subordinates of the promoted employee to have boss value of the promoted employee
    const bossSubords = getSubordinates(tree, employeeName);
    if (bossSubords) {
      for (const subord of bossSubords) {
        subord.employee.boss = employeeName;
      }
    }
    // updating the original subordinates of the promoted employee to have boss value of the employee that was swapped
    const swappedSubords = getSubordinates(tree, temp);
    if (swappedSubords) {
      for (const subord of swappedSubords) {
        subord.employee.boss = temp;
      }
    }
  }
  else {
    console.log("This Employee does not seem to have a boss, and hence can not be promoted");
  }
  console.log(`[promoteEmployee]: Promoted ${employeeName} and made ${bossName} their subordinate`);
}

// demotes given employee swapping positions with given subordinate
export const demoteEmployee = (tree: TreeNode, employeeName: string, subordinateName: string) => {
  const subordNode = getEmployee(tree, subordinateName);
  if (subordNode) {
    if (subordNode.employee.boss === employeeName) {
      const employeeNode = getEmployee(tree, employeeName)
      if (employeeNode) {
        // swapping employee names
        const temp = subordNode.employee.name;
        subordNode.employee.name = employeeNode.employee.name;
        employeeNode.employee.name = temp;
        // updating subordinates
        const bossSubords = getSubordinates(tree, subordinateName);
        if (bossSubords) {
          for (const subord of bossSubords) {
            subord.employee.boss = subordinateName;
          }
        }
        // updating other persons subordinates
        const swappedSubords = getSubordinates(tree, employeeName);
        if (swappedSubords) {
          for (const subord of swappedSubords) {
            subord.employee.boss = employeeName;
          }
        }
      }
    } else {
      console.log(`${subordinateName} does not have boss of name ${employeeName}`);
    }

  } else {
    console.log("There does not seem to be a subordinate with that name");
  }
  console.log(`[demoteEmployee]: Demoted employee (demoted ${employeeName} and replaced with ${subordinateName})`);
}