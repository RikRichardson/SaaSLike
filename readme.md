ATTENTION: module uses React + material-ui => JS must be built before building war.
REQUIREMENTS:

REACT:

before build
1. install Node (https://nodejs.org/en/), 'npm' will be installed with it

To process javaScript sources to working code
1. run gradle's task 'buildLogin'
2. run gradle's task 'buildClientApp'

Tasks will be executed before packaging code to .war-archive.

Build process for JS is not complete, will be automated. now some handy manipulations are necessary.
Sources for IU stored in 'client-server\src\main\js\src\app\login'. Compiled scripts stored in
client-server\src\main\webapp\js\build. JSPs use it in path for script.

Task 'buildLogin' executes 'npm install' and 'npm run-script build-scripts' with configuration build-scripts.
To get result login.js with less size we can change build.gragle to run 'npm run-script build-scripts-product'.

SPRING I18N:

messages_xx.properties use UTF-8. Whitespaces within keys must be excaped with \ (Ex.: My\ key=It's string with my key).
The same messages sources are used for JS and server side (see MessagesController and messages.jsp).
 
 Gradle tasks:
 copyClasses, copyLibs, copyLocales are used to setup application for tomcat started outside of IDE. My settings for application context:
 <Context path="/wp" reloadable="false" 
 	docBase="D:\work\winpay\ws\winpay\client-server\src\main\webapp">
 	<Logger className="org.apache.catalina.logger.SystemOutLogger" verbosity="4" timestamp="true"/>
 </Context>
 

 installAppWebpack - executes 'npm install' in catalog with JS sources;
 