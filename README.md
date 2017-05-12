        #AngularJs_Project_Starter Web -Skeleton
        #
        #This is an AngularJS 1.* Web application managed by Packaged Tools
        #
        #Developers Guide
        #
            npm uninstall gulp (to remove any form of gulp on your system and then do)
            npm install -g gulp (for global installation of gulp then open the project root folder and then do)
            npm install (to start up and setup the project for development and then do).
            bower install (to set up the project for development web dependencies, then do)
            gulp serve or npm start (You will see the local running of the app at localhost:8000/#/, copy the link and paste in browser)
        #
        #Install Bower Dependencies You might need
        #on project root folder, open a CLI and type:
            bower install --save <dependency-name-here-without-brace>
        #
        #For already bower install dependency/ies,
            type bower install
        #
        #Install Node Module Dependencies You might need
        #on project root folder, open a CLI and type:
            npm install --save <dependency-name-here-without-brace>
        
        #For already node module install dependency/ies,
            type npm install
        #
        #
        #Run in webstorm or PHPStorm
        #
        #
        #From the tool bar select Run then
        #Click on Edit Configuration
        #
        #click on the ‘+’ , then select ‘gulp’
        #under tasks select or type ‘serve’ and then
        #‘Save’
        #
        #Then you can simply click on the run on your webstorm/phpstorm to start the application on your browser.
        #
        #
        #Run on CLI
            Just type ‘gulp serve’ or 'npm start' and then open your browser and copy paste the link you see to start up the app.
        
        #Create Compiled, compressed and uglify app version.
        #
            Type ‘gulp build’, this is create a build version automatically for production
        
        #Run Production Version in browser
        #
            Type ‘gulp launchBuild’
        #
        #This is start up the app on port 8001 with url localhost:8001/#/
        #
        #Authors:
        #Please kindly add your names and emails to the package.json and bower.json file where there is author. this is for only front end developers.
        #
        #File and Code Commentary:
        #Every source code and functions written should be documented and individual name signature should be at the start of the commentary of each file created to enable future maintenance and tracking.
        #
        #Cloning:
        #Every developers who cloned the front end development should created a new branch and do npm install and then bower install.
        #
        #ApiHandler:
        #This is the handler that will help in creating request to fro the app to the backend apis. sample of usage can be found in index.js in views folder.
        #
        #Project Structure with MVC Pattern:
        
                AngularJs_Project_Starter-frontend
                    app
        
                       images
                    	image-files
        
                   scripts
                    folders (This folders must match view folders so that every controller created as a bind view)
        
                styles (all css created)
        
                views
                    folders (This folders must match scripts folders so that every view created as a bind controller)
                    index.html (app Landing page)
        
            app.js (app root js file)
            app.css (app root css file)
            index.html (app index page that serve as a view for all pages)
        
         gulpfile.js (code compression, launch app, build production version script)
         bower.json (script that load all dependencies installed)
         package.json (script that load all npm dependencies installed)
        
        and all other files are important but you can decide to check file usage before deleting some of the files in shared folders but you will surely find them useful.