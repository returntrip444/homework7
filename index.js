// https://api.github.com/users/
// github api

const inquirer = require("inquirer")
const fs = require("fs")
const axios = require("axios")

const questions = [
    {
        type: "input",
        message: "what is your github user name?",
        name: "githubusername",
    }, 
    {
        type: "input",
        message: "what is your github email?",
        name: "githubemail"
    }, 
    {   
        type: "input",
        message: "what is your project title?",
        name: "projecttitle"
    },
    {
        type: "input",
        message: "what description would you like to add?",
        name: "projectdescription"
    },
    {
        type: "input",
        message: "how would you like to install project?",
        name: "projectinst"
    },
    {
       type: "input",
       message: "what are you contributing to the project?",
       name: "contribution"
    },


];

function writeToFile(fileName, data) {
    
    const template = `
        # ${data.projecttitle}

        ## description
        ${data.projectdescription}

        ## 

        * Here I created a README generator using writeFile and axios functions. first i created const variables to require fs, axios, and inquirer
       then i made type and input methods for each part of the github input such as github username, github email, project description, project title, project installation,
       and contribution. Then i created a writeToFile function for fileName and data also a variable for the template. I then created a writeFile function for
       fileName, template, and function(err) and an if and throw statement. Created a template literal for github username through the github API and console
       logged the response.
    `
 fs.writeFile(fileName, template, function(err){
    if (err) throw err
    console.log("save")
 })
}

function getProfilePhoto (data){
    console.log(data.githubusername)
    axios.get(`https://api.github.com/users/${data.githubusername}`)
        .then(function(response) {

            console.log(response.data)
            if (response.data) {
                 data.avatar_url = response.data.avatar_url
                 console.log(data)
                 writeToFile("README.MD", data)
            }
        })
        .catch(function(err){
            console.log(err)
        })
        
}


function init() {
    inquirer.prompt(questions).then(function(response){
        console.log(response)
        // writeToFile("README.MD", response)
      getProfilePhoto(response)

    })

}

init();
