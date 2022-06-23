# Employee-Tracker

## **Goal:**
### *For a business owner to be able to view and mange their departments, roles, and employees in their company so that they can organize and plan their business*

___

<br>

## Application Details
- A command-line application that accepts user input to view, add to, and update employee data.
- Has the options to:
    - View all departments
    - View all roles
    - View all employees
    - Add a department
    - Add a role
    - Add an employee
    - Update an employee
- Data is all stored in a sql database

___

<br>

## Challenges Faced
- When displaying the prompts through the inquirer npm, it was tricky trying to pull the data from the sql tables and then displaying that as the choices for a prompt question.
- Also, being able to have a user to select a certain data, but then using someting different as the query insert into the tables when inputing the user data into the tables was difficult.
    - For example, the user would choose which employee they wanted to update by a list of the names of employees, which would return a first and last name as the answer. However, I had to input that employee's new role id into the table. So I had to loop through both tables, find where they intersected, and then pull the role id from that endpoint so I can input that data into the table to update.

<br>

## *Links to GitHub repository & a walkthrough video:*

- **[Link to the GitHub Repository](https://github.com/Doctor-Worm/Employee-Tracker)**

- **[Walkthrough Video](https://drive.google.com/file/d/1haI_uKEBWG-P3RQu1h7WGERQ_XzNo7kc/view)**