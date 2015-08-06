README for jhipster
==========================

**Dependencies :**

- Install Java from [the Oracle website](http://www.oracle.com/technetwork/java/javase/downloads/index.html).
- Install [Maven](http://maven.apache.org/)
- Install Git from [git-scm.com](http://git-scm.com/).
- Install Node.js from [the Node.js website](http://nodejs.org/). This will also install npm, which is the node package manager we are using in the next commands.
- Install [Bower](http://bower.io/) : `npm install -g bower`
- Install [Grunt](http://gruntjs.com/) : `npm install -g grunt-cli`

1) Clone git repository and go to that directory

    git clone https://github.com/fresnault/jhipster-chess-analysis.git
    cd jhipster-chess-analysis/

2) Install bower dependencies

    bower install
    
3) Install npm dependencies

    npm install
    
4) Configure your database `src/main/resources/config/application-dev.yml` and create a database named jhipster

5) Build and run your application with Maven. 

    mvn spring-boot:run
    
Available here : `http://localhost:8080/`

You can also run `grunt serve` if you wan't refresh your browser when a file change. Available here : `http://localhost:3000/`
