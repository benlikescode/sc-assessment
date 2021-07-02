## Social Curator Assessment Reflection

### How To Install and Run Code

Make sure you have Node and TypeScript installed.

Typescript files are in the src directory and are for development.

Running yarn dev will spin up ts-node for development and the project can be compiled to JS through tsc.

### Logic/Style Decisions

I made the assumption for promoteEmployee and demoteEmployee that the employees swapping would just be swapping their names and would take on the jobTitle and salary of the employee they got swapped with.

I made a few helper functions, most importantly (getEmployee) as most of the functions involved getting an employee node based on their name.

### Improvements

If I had more time, I would try to combine similar functions to make the code more readable / less redundant. The time complexity could likely be improved for many of the functions by using some form of caching / memoization (storing already traversed employees). 

Lastly, I would do some more tests for edge cases and proper error handling in each of the functions.

### Time Complexity

* getEmployee (helper function) = O(n) - Recursively traverses the tree, worst case the employee is at the bottom of the tree which would require n traversals (where n is the number of nodes / employees in the tree)
* generateCompanyStructure = O(n^2) - Loops over the employees and for each employee, does a recursive check to find the boss
* hireEmployee = O(n) - similar to getEmployee as we recurse over the tree until we find the boss node and then simply append the new employee (constant time) 
* fireEmployee = O(3n) - Calls getEmployee and getBoss individually. There is some loops / filtering in the body of the function, but it is independant of the input size so complexity is still linear.
* promoteEmployee = O(4n) - Calls getEmployee, getBoss, and getSubordinates twice
* demoteEmployee = O(4n) - Calls getEmployee twice, and getSubordinates twice
* getBoss = O(2n) - Calls getEmployee twice (not nested), thus still O(n)
* getSubordinates = O(n) - Calls getEmployee to find the corresponding node and returns the descendants (constant time operation), thus still O(n)

In summary, most of the functions are running in linear time except for generateCompanyStructure as we have a nested loop (quadratic time). As mentioned above, this could be improved by using some form of memoization or data structure with constant insert/search such as a map.

However, with such a small input size this extra complexity is pretty well neglible and optimizing would be something to consider with a larger dataset.

### Similar Functions

The functions promoteEmployee and demoteEmployee are nearly identical in logic as they both simply swap two employees. They could be merged by replacing them with a single updateEmployee function that promotes/demotes based on a parameter.