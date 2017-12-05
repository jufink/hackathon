#### Blockchain Hackathon - HHN WIN - Studium Generale

### Erste Version unserer DApp
![Alt text](/src/images/screen.png?raw=true "version1")

### Inbetriebnahme

### Dependencies
* npm
* nodejs
* testrpc
* truffle

## Project Setup

### Install Instructions (for Linux)

#### Install npm

    sudo apt install npm
    sudo npm install npm@latest -g
    npm -v

#### Install nodejs

    sudo npm cache clean -f
    sudo npm install -g n
    sudo n stable

#### Install testrpc

    sudo npm install -g ethereumjs-testrpc

#### truffle & example

    sudo npm install -g truffle

#### Install Chrome addon metamask

### Developer-tools needed to checkout:
* PyCharm Professional
* Intellij-Solidity Plugin (Install from within PyCharm)
    * install [Git](https://git-scm.com/downloads) if non-unix system

### How to checkout:
* Start PyCharm
    * Close all open projects if necessary
    * Add the path to the git binary in PyCharm if it isn't set already
* Select "Checkout from Version Control"
* Select Git
* Add path to Git repository and click "Test"
* Enter Git credentials
* If successful, click "Clone" to clone repository
* Open a terminal and start the development blockchain

### Start the Infrastructure

* Start testrpc:
```
testrpc
```
* Open another terminal to compile and migrate the Contract:
```
truffle compile
truffle migrate

```
* Open another terminal start the Webserver (make sure lite-server is installed):
```
npm run dev

```
Access application at:
```
http://localhost:3000
```
