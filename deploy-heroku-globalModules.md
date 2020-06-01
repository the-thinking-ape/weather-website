# How to Deploy to Heroku

## Intro
Unlike github, withe Heroku we can interact w/ the entire website with command-line (cml) if we want to.

Download/install heroku for cml [here](https://devcenter.heroku.com/articles/heroku-cli)

Heroku is production enviroment, in other words a server that anyone around the world with an internet conection can reach this.

## Setup heroku SSH public key
1. command line command: `heroku keys:add`
    * when we run this, this looks through our SSH directory and asks us which key we want to upload to our heroku account
    * printing:
    ``` terminal
    Found an SSH public key at /Users/workstudy/.ssh/id_rsa.pub
    ? Would you like to upload it to Heroku? (Y/n) 
    ```
    * In this case it found only 1 public key `.ssh/id_rsa.pub`, so we enter `yes`

    * this prints: `Uploading /Users/workstudy/.ssh/id_rsa.pub SSH key... done`
    * now our SSH key is associated w/ our Heroku account. 
    * This means we will be able to securely send code back and forth between our repo and heroku server


## Create Heroku Application 
1. Go to root directory of project

2. cml: `heroku create`, this creates our heroku app. run this from root dir of our project

3. we can specify a name for our app by adding one more arg: `herok create unique-heroku-app-name`
    * this app `name` must be unique accross our account and all heroku accounts
    * start them off with an ID like your last name
    * ex: `uniqueID-app-name`
    * name can be maximum 30 chracters

    This prints:
    ``` terminal
    Creating ⬢ thinking-ape-weather-app... done
    https://thinking-ape-weather-app.herokuapp.com/ | https://git.heroku.com/thinking-ape-weather-app.git
    ```

    meaning it creates a new application on the **heroku servers** , and then spitting out **2 URLs**
    * the first URL is a location where we can view our APP (the live URL for app)
    * the second url is for the heroku git repository; where we should push the code we want to deploy


## Explore Heroku App
Go to the first link (URL live app link):
https://thinking-ape-weather-app.herokuapp.com/

You will see a default welcome screen if you haven't deployed your code to the servers.

## Configure Heroku (for running our app when it gets our code)
So heroku can know how to run our app, we need to provide it w/ basic instructions
of what to do when it gets our code.
* In order for Heroku to start our app we need to tell it which file to run. package.JSON
> Aside: when we ran our node apps locally from terminal 
> we've been running our node.js app using `node app_to_run_name.js` command

* We tell heroku to do the same thing by specifying it in a script

* `package.JSON` has a **script obect**
    * Allows us to setup scripts using key-value pairs
    * Key is name for script, Value is what to run from terminal
    * by default package.json file has a test script

```javascript
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

1. Change `package.JSON` scripts to include our start script that heroku will execute
    * This tells heroku what to script to run when starting our app
    * Delete `"test": "echo \"Error: no test specified\" && exit 1"` key value pair
    * Insert `"start": "node src/app.js"`
        * the Key `start` tells Heroku this is the start script it should execute
        * the value tells heroku that `src/app.js` is the file we want to run first using the `node` command
    * this should look like below:
    ```json
    "scripts": {
        "start": "node src/app.js"
    },
    ```
    > fun fact: these scripts aren't limited to heroku, we can use them from our command line too
    > we could start our app from terminal
    > use command line arg: `npm run script_to_run_name` to run 

    * Heroku will use the exact same command to run our app from their servers
        * `npm run start`

2. Next make sure the app server is listening to Heroku's dynamic enviroment variable PORT
    * On local machine you can use any **PORT** value you want, 3000 is industry default standard
    * But Heroku will provide their own **PORT** number/value which we have to use when our app is running on heroku
    * This port value is dynamic (changes) (not static), ergo not one number and cannot be hardcoded into project
    * It is provided to our app via an enviroment variable (a key-value pair set at OS level)
    * to support this change:
        1. Go to file where you are listening for port (in our case `src/app.js`)
        2. Add a constant PORT to capture heroku's PORT enviroment variable: 
            * `const port = process.env.PORT` 
            * `env` is an object where we can access enviroment variables, heroku sets port env var
            * so this sets port equal to enviroment PORT variable value provided by heroku dynamically
        3. Make sure to use it in the `app.listen(port)` function

3. Fix all URLs and fetches
    * in our case in the client side app.js
    * line: `fetch('http://localhost:3000/weather?address=' + encodeURIComponent(location) ).then((response)=>{`
    * problem is that when heroku runs this, it will try to access local host from heroku server domain and crash
    * Simply delete `http://localhost:3000` to get:
    * `fetch(/weather?address=...` , thanks to forward slash, this fetch will append this to the current domain
    * In the case of running locally it will use local domain and port and vice versa for heroku

## Deploy to Heroku

1. With command line `cd` into the project repo's root directory folder
2. Run command: `git push remote_name branch_name` or `git push heroku master`
    * normally `git push` defaults to our github master
    * to change the remote we push to, follow the `push` argument with:
    * the remote to push to name, and the branch to push to name
    * in our case: `git push heroku master`

If this is the first deployment it will install dependecies (npm modules) for app, then it gets our process kicked off.
This will make our app viewable.

If this is the first time we deploy to this heroku remote git repo it should end the print with:
```bash
remote: Verifying deploy... done.
To https://git.heroku.com/thinking-ape-weather-app.git
 * [new branch]      master -> master
```
We can now go to our link to check out or website.


## Adding/Testing new features before deploying them
Always test locally before deploying to heroku or other production server enviroment.
* This avoids deploying a broken/buggy version that will affect users.
* Test locally with either of three commands:
    1. `node src/app.js`
    2. `nodemon src/app.js -e hbs,js,css` this one is useful for quick iterations, the 'e' flag tells us what files to refresh server on 'save'
    3. `npm run start`
* to push to github `git push` = `git push origin master` where origin is the remote name of our github repo.
* to deploy/push to heroku: `git push heroku master` allowing users to access latest changes on live webapp on heroku

## Add command scripts to package.JSON scripts to make worflow faster
* dev: `nodemon src/app.js -e hbs,js,css`
* run it on cmd line with: `npm run dev`
* Catch: global modules (nodemon installed globally)
    * problem w/ global modules is that they are not local dependencies
    * it's best to install locally so that anyone can use your code
    * install all global dependencies locally
    * this helps apps work out of the box
    * solution: uninstall nodemon and other global dependencies
    * install them locally
    * cml arg: `npm uninstall -g global_dependency` -g flag targets globally installed npm modules
    * install locally: `npm i npm_module_name --save-dev` the --save-dev flag allows us to list it as a dev dependency in our project. Dev dependencies are dependencies you need only when running local development, meaning these don't get installed on the production enviroment like heroku. This saves heroku time and memory space.
    * package.JSON scripts work w/ local dependencies

## Resources
* [Heroku dev documentation](https://devcenter.heroku.com/)
* Compare domain providers: https://www.domcomp.com/ 