# How to create a new nodejs application

1. Create a new folder or directory for the application
2. `cd` into that directory 
3. Enter `npm init` and press the ENTER key until you see your prompt again
   Or `npm init -y`

4. Add the express package by:
`yarn add express` (make sure that the prompt is in the project directory -- the directory for your node application) or `npm install express`

* Other dependecies will be: `hbs` and `wax-on`

4b. To install yarn, you just type `npm install -g yarn`

5. Don't modify any files in the `node_modules` folder and also make sure it don't go up to .github

6. Creating a `.gitignore` file

7. Install node monitor so that we don't have to keep restarting our server.  In the terminal, type in: `npm install -g nodemon` 

If using MacOS, you have to write `sudo npm install -g nodemon`

8. In the terminal (after making sure that the project folder is correct), we will  install `hbs` (handlebars) with
```
yarn add hbs
```

9. Create a folder name `views` and that will store all our template files (view files)