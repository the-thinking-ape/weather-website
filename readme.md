# How to Deploy to Heroku

## Intro
Unlike github, withe Heroku we can interact w/ the entire website with command-line (cml) if we want to.

Download/install heroku for cml [here](https://devcenter.heroku.com/articles/heroku-cli)

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

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

1. Change `package.JSON` scripts to include our start script that heroku will execute
    * Delete `"test": "echo \"Error: no test specified\" && exit 1"` key value pair
    * Insert `"start": "node src/app.js"`
        * the Key start tells Heroku this is the start script it should execute
        * the value tells heroku that `src/app.js` is the file we want to run first using the `node` command
    * this should like below:
```json
 "scripts": {
    "start": "node src/app.js"
  },
```



## Resources
* [Heroku dev documentation](https://devcenter.heroku.com/)