I) ########## MySQL Setup ##########
============================================

1) Update and Upgrade system using Command:

- `$ sudo apt-get update && apt-get upgrade -y`

-------------------------------
2) Install MySQL Client/Server using Command:
- `$ sudo apt-get install mysql-server mysql-client`
-------------------------------
3) Login into MySQL by using command:
- `$ sudo mysql -u root -p` \
A) Hit "enter" button\
b) set password by using query inside mysql:
- `$ ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root_nftmysql';`\
c) create database by using query:
- `$ create database 'nft_market';`\
d) exit mysql
-------------------------------
4) import .sql dump to this database by using command:
- `$ mysql -u username -p nft_market < nft_market.sql`\
a) Hit "enter" button\
b) Enter password which you created in step 3(b)

II) ########## Backend Setup ##########
============================================
1) install Node.js >=12.x
- `$ sudo apt install nodejs`
-------------------------------
2) install npm
- `$ sudo apt install npm`
- _if any error occurs use:_
- `$ sudo npm install -g n`
- `$ sudo n latest`\
and reboot system
-------------------------------
3) install nestjs
- `$ npm install -g @nestjs/cli`
-------------------------------
4) install yarn
- `$ npm install --global yarn`
-------------------------------
5) install pm2
- `$ npm install pm2 -g`
-------------------------------
6) clone Backend via Github or from Local system to the Server
-------------------------------
7) install node_modules via comand:
- `$ yarn install --ignore-engines`
-------------------------------
8) connect backend with MySQL database using below steps:\
a) move to project directory\
b) open ".env" file and put database host username password db_name inside it.
-------------------------------
9) start backend using command:
- `$ pm2 start dist/main.js`
-------------------------------
10) save process in pm2 logs using command:
- `$ pm2 save`
-------------------------------
11) save pm2 procesess in statups logs using command:
- `$ pm2 startup`

III) ####### Frontend & Nginx Setup #######
============================================

1) install Nginx commands:
- `$ sudo apt install nginx`
------------------------------
2) clone frontend via Github or from Local system to the Server
-------------------------------
3) install node_modules via comand:
- `$ apt-get install autoconf automake g++ libtool`
- `$ yarn install`
-------------------------------
4) connect backend with frontend using below steps:\
a) open "frontend/src/helper/config.js" inside this you fine "config" json. in this json you find key named "API_BASE_URL" put you backend Url in that key's value\
b) enable "openssl" module by using command:
- `$ export NODE_OPTIONS=--openssl-legacy-provider`\
c) save it and test it by using command :
- `$ npm run start`
-------------------------------
5) After succesfull Verification make Build of code using this command:
- `$ npm run build`
-------------------------------
6) Move all data from build folder to below mentioned Path:\
"/var/www/html/"
- `$ mv build/* /var/www/html/`
- `$ mv build/.* /var/www/html/`
-------------------------------

- Note:- Don't forget to move .htaccess file from build folder to "/var/www/html/"
-------------------------------

III) ####### Adding fields in MySQL Tables #######
============================================
 
###To add field in MySQL table so, you need to add that field in this project models 
example - we need to add "test_field" in "event_cards" table, so we follow bellow steps.
1) find the model file for "event_cards" in this case path is 
- `backend_1902/src/event/entities/event_card.entity.ts`
- open this file and add column
![](https://github.com/nhanth1012/BKS_Market/blob/main/screenshorts/models.png?raw=true)
- and also add field in event card dto, in this case path is:
- `backend_1902/src/event/dtos/evet_card.dto.ts`
- open file and add field like screenshot
- ![](https://github.com/nhanth1012/BKS_Market/blob/main/screenshorts/dtos.png?raw=true)
- reopen the models file named with event_card.entity.ts and add field inside "EventCardDto" Json
- ![](https://github.com/nhanth1012/BKS_Market/blob/main/screenshorts/EventCardDto.png?raw=true)
-------------------------------
2) Now need to migrate changes just use this command:
- `nest start`
-------------------------------
