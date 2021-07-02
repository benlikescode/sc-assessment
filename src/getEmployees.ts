import { TreeNode } from "./manageEmployees"

// helper function that is used throughout many of the functions to traverse the tree and find the node with the given name
export const getEmployee = (tree: TreeNode, employeeName: string): TreeNode | null => {
  if (tree.employee.name === employeeName) {
    return tree;
  }
  for (const node of tree.descendants) {
    const employeeNode = getEmployee(node, employeeName)
    if (employeeNode !== null) { 
      return employeeNode; 
    }
  }
  return null;
}

// finds given employee and if they have a boss attribute, finds the boss
export const getBoss = (tree: TreeNode, employeeName: string) => {
  const boss = getEmployee(tree, employeeName)?.employee.boss;
  if (boss) {
    return getEmployee(tree, boss);
  }
  return null;
}

// finds given employee and returns their descendants if they exist
export const getSubordinates = (tree: TreeNode, employeeName: string) => {
  const employee = getEmployee(tree, employeeName);
  return employee?.descendants;
}

// EXTRA CREDIT: Finds and returns the lowest-ranking employee and the tree node's depth index.
export const findLowestEmployee = (tree: TreeNode, employeeName: string) => {
  
}
