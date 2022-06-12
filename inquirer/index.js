const inquirer = require('inquirer');

// Array of questions for user input
const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'What is the title of your project? (Required)',
        validate: title => {
            if (title) {
                return true;
            } else {
                console.log('Please enter your project title!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'description',
        message: 'Provide a short description explaining the what, why, and how of your project. (Required)',
        validate: description => {
            if (description) {
                return true;
            } else {
                console.log('Please provide a description!');
                return false;
            }
        }
    }
]