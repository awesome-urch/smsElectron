//const { ipcRenderer } = require('electron');

// const con = require('electron').remote.getGlobal('console')
// con.log('This will be output to the main process console.')

const electron = require('electron');
const path = require('path');
const fs = require('fs');
const readline = require('readline');
const axios = require('axios');
const sendpulse = require("sendpulse-api");

let list = document.getElementById("list");
let newTask = document.getElementById("newTask");
let contacts = [];

//alert("Good");
//ipcRenderer.invoke('show-notification', "Good");

//list.insertAdjacentHTML('beforeend', `<li class="list-group-item">Hello</li>`);

/*
if(document.getElementById("addTask")){
    document.getElementById("addTask").addEventListener('click', () => {
        //alert("Better");
        console.log("better");
        list.insertAdjacentHTML('beforeend', `<li class="list-group-item">${newTask.value}</li>`);
        //ipcRenderer.invoke('show-notification', newTask.value);
        newTask.value = '';
    
        
        alert("Better");
    
        //var locale = app.getLocale();
        //var country = app.getLocaleCountryCode();
        var country = "USA";
      
        //console.log("Locale Detected - ");
    
        //alert(""+locale+ " "+country);
        // console.log("Locale Detected - ", locale);
        // console.log("Country Detected - ", country);
      
        // Making an HTTP GET REST API call
        axios.get("https://restcountries.eu/rest/v2/alpha/"
                  + country).then((res) => {
                      alert("Res: "+res);
            console.log(res);
            console.log("Country - ", res.data.name);
        });
    
    });
    
}
*/


// Importing dialog module using remote
const dialog = electron.remote.dialog;

//alert("macOS");
  
var uploadFile = document.getElementById('upload');
  
// Defining a Global file path Variable to store 
// user-selected file
global.filepath = undefined;

if(document.getElementById('addEmailAddress')){
    document.getElementById('addEmailAddress').addEventListener('click', () => {

        var extraEmailAddress = document.getElementById('extraEmailAddress').value;
    
        if(extraEmailAddress !== ''){
            list.insertAdjacentHTML('beforeend', `<li class="list-group-item">${extraEmailAddress}</li>`);
            contacts.push(extraEmailAddress);
            document.getElementById('extraEmailAddress').value = ''
        }

    });
}


//Send SMS//

if(document.getElementById('addPhoneNumber')){
    document.getElementById('addPhoneNumber').addEventListener('click', () => {

        var extraPhoneNumber = document.getElementById('extraPhoneNumber').value;
    
        if(extraPhoneNumber !== ''){
            list.insertAdjacentHTML('beforeend', `<li class="list-group-item">${extraPhoneNumber}</li>`);
            contacts.push(extraPhoneNumber);
            document.getElementById('extraPhoneNumber').value = ''
        }

    });
}

//--SEND SMS

if(document.getElementById('sendSMS')){
    document.getElementById('sendSMS').addEventListener('click', () => {

        console.log('send');
    
        var message = document.getElementById('textMessage').value;
        var senderName = document.getElementById('senderName').value;
        //var senderEmail = document.getElementById('senderEmail').value;
        var textSubject = document.getElementById('textSubject').value;
    
        if(message !== '' && senderName !== '' && textSubject !== ''){
            //var locale = app.getLocale();
            //var country = app.getLocaleCountryCode();
            var country = "USA";
        
            //console.log("Locale Detected - ");
    
            //alert(""+locale+ " "+country);
             //console.log("Locale Detected - ", locale);
             console.log("Country Detected - ", country);
        
            // Making an HTTP GET REST API call
            // axios.get("https://restcountries.eu/rest/v2/alpha/"
            //         + country).then((res) => {
            //             alert("Res: "+res);
            //     console.log(res);
            //     console.log("Country - ", res.data.name);
            // });

            //loop through all numbers in html

            if(contacts.length > 0){

                /*
                contacts.forEach(sendEmail);

                function sendEmail(item, index, arr){

                    console.log("item is "+item)
                    
                    // axios.post('https://api.branseven.com', {
                    //     receiverEmail: item, //receiverEmail
                    //     senderEmail: senderEmail,
                    //     subject: emailSubject,
                    //     content: message
                    //   })
                    //   .then((response) => {
                    //     console.log(response);
                    //   }, (error) => {
                    //     console.log(error);
                    //   });

                    var bodyFormData = new FormData();
                    bodyFormData.append('receiverEmail',item)
                    bodyFormData.append('senderEmail',senderEmail)
                    bodyFormData.append('subject',emailSubject)
                    bodyFormData.append('content',message)

                      axios({
                        method: "post",
                        url: "https://thiembanne.org",
                        data: bodyFormData,
                        headers: { "Content-Type": "multipart/form-data" },
                      })
                        .then(function (response) {
                          //handle success
                          console.log(response);

                          if(index == arr.length - 1){
                                alert("All emails has been sent successfully")
                            }

                        })
                        .catch(function (response) {
                          //handle error
                          console.log(response);
                          alert("An error occurred, check your internet connection")
                        });
                }
                */


                var API_USER_ID = "275a77756c0725eba90cb0619d5e7181";
                var API_SECRET = "8d5c7008e88f4bb2da195a5eb7905813";
                var TOKEN_STORAGE = "/tmp/";
                sendpulse.init(API_USER_ID, API_SECRET, TOKEN_STORAGE, function(token) {
                    if(token && token.is_error) {
                        // error handling
                    }
                
                    console.log('your token: ' + token);
                
                    var answerGetter = function(data) {
                       console.log(data);
                    }

                    //sendpulse.listEmailTemplates(answerGetter);

                    let toPhoneArray = [];

                    contacts.forEach(toArray);

                    function toArray(item, index, arr){
                        // let phoneContact = {};
                        // emailContact["name"] = "";
                        // emailContact["email"] = item;
                        // toPhoneArray.push(emailContact);
                        toPhoneArray.push(item);
                    }

                    console.log(toPhoneArray)

                    //sendpulse.createAddressBook(answerGetter,'My Book');
                    //sendpulse.editAddressBook(answerGetter, 123456, 'My new book');
                    //sendpulse.listAddressBooks(answerGetter);
                    sendpulse.smsAddPhones(answerGetter, 472359, toPhoneArray);
                    //sendpulse.smsAddPhones(answerGetter, 472359, ['11111111111', '22222222222']);
                    //sendpulse.smsSend(answerGetter, textSubject, toPhoneArray, message);
                    sendpulse.smsAddCampaign(answerGetter, textSubject, 472359, message);
                    /*
                    var email = {
                        "html" : "<h1>" + message + "</h1>",
                        "text" : message,
                        "subject" : emailSubject,
                        "from" : {
                          "name" : senderName,
                          "email" : senderEmail
                        },
                        "to" : toEmailArray,
                        "bcc" : [
                          {
                            "name" : "Bran",
                            "email" : "bran7047@gmail.com"
                          },
                          {
                            "name" : "Bran",
                            "email" : "campaign@branseven.com"
                          },
                        ]
                      };

                      console.log(email);

                      sendpulse.smtpSendMail(answerGetter,email);
                      */


                });

               
            }else{
                alert("Add contacts first");
            }

        }
    
    });
}

//--SEND EMAIL

if(document.getElementById('send')){
    document.getElementById('send').addEventListener('click', () => {

        console.log('send');
    
        var message = document.getElementById('message').value;
        var senderName = document.getElementById('senderName').value;
        var senderEmail = document.getElementById('senderEmail').value;
        var emailSubject = document.getElementById('emailSubject').value;
    
        if(message !== '' && senderEmail !== '' && emailSubject !== ''){
            //var locale = app.getLocale();
            //var country = app.getLocaleCountryCode();
            var country = "USA";
        
            //console.log("Locale Detected - ");
    
            //alert(""+locale+ " "+country);
             //console.log("Locale Detected - ", locale);
             console.log("Country Detected - ", country);
        
            // Making an HTTP GET REST API call
            // axios.get("https://restcountries.eu/rest/v2/alpha/"
            //         + country).then((res) => {
            //             alert("Res: "+res);
            //     console.log(res);
            //     console.log("Country - ", res.data.name);
            // });

            //loop through all numbers in html

            if(contacts.length > 0){

                contacts.forEach(sendEmail);

                function sendEmail(item, index, arr){

                    console.log("item is "+item)
                    
                    // axios.post('https://api.branseven.com', {
                    //     receiverEmail: item, //receiverEmail
                    //     senderEmail: senderEmail,
                    //     subject: emailSubject,
                    //     content: message
                    //   })
                    //   .then((response) => {
                    //     console.log(response);
                    //   }, (error) => {
                    //     console.log(error);
                    //   });

                    var bodyFormData = new FormData();
                    bodyFormData.append('receiverEmail',item)
                    bodyFormData.append('senderEmail',senderEmail)
                    bodyFormData.append('subject',emailSubject)
                    bodyFormData.append('content',message)

                      axios({
                        method: "post",
                        url: "https://thiembanne.org",
                        data: bodyFormData,
                        headers: { "Content-Type": "multipart/form-data" },
                      })
                        .then(function (response) {
                          //handle success
                          console.log(response);

                          if(index == arr.length - 1){
                                alert("All emails has been sent successfully")
                            }

                        })
                        .catch(function (response) {
                          //handle error
                          console.log(response);
                          alert("An error occurred, check your internet connection")
                        });

                }


                /*
                var API_USER_ID = "275a77756c0725eba90cb0619d5e7181";
                var API_SECRET = "8d5c7008e88f4bb2da195a5eb7905813";
                var TOKEN_STORAGE = "/tmp/";
                sendpulse.init(API_USER_ID, API_SECRET, TOKEN_STORAGE, function(token) {
                    if(token && token.is_error) {
                        // error handling
                    }
                
                    console.log('your token: ' + token);
                
                    var answerGetter = function(data) {
                       console.log(data);
                    }

                    //sendpulse.listEmailTemplates(answerGetter);

                    let toEmailArray = [];

                    contacts.forEach(toArray);

                    function toArray(item, index, arr){
                        let emailContact = {};
                        emailContact["name"] = "";
                        emailContact["email"] = item;
                        toEmailArray.push(emailContact);
                    }

                    var email = {
                        "html" : "<h1>" + message + "</h1>",
                        "text" : message,
                        "subject" : emailSubject,
                        "from" : {
                          "name" : senderName,
                          "email" : senderEmail
                        },
                        "to" : toEmailArray,
                        "bcc" : [
                          {
                            "name" : "Bran",
                            "email" : "bran7047@gmail.com"
                          },
                          {
                            "name" : "Bran",
                            "email" : "campaign@branseven.com"
                          },
                        ]
                      };

                      console.log(email);

                      sendpulse.smtpSendMail(answerGetter,email);


                });

                */
               
            }else{
                alert("Add contacts first");
            }

        }
    
    });
}
  
uploadFile.addEventListener('click', () => {
// If the platform is 'win32' or 'Linux'
    if (process.platform !== 'darwin') {
        // Resolves to a Promise<Object>
        dialog.showOpenDialog({
            title: 'Select the File to be uploaded',
            defaultPath: path.join(__dirname, '../assets/'),
            buttonLabel: 'Upload',
            // Restricting the user to only Text Files.
            filters: [
                {
                    name: 'Text or Excel Files',
                    extensions: ['txt', 'docx', 'csv']
                }, ],
            // Specifying the File Selector Property
            properties: ['openFile']
        }).then(file => {
            // Stating whether dialog operation was
            // cancelled or not.
            console.log(file.canceled);
            if (!file.canceled) {
              // Updating the GLOBAL filepath variable 
              // to user-selected file.
              global.filepath = file.filePaths[0].toString();
              console.log(global.filepath);
              if (global.filepath && !file.canceled) {


                var lineReader = readline.createInterface({
                    input: fs.createReadStream(global.filepath)
                  });
                  
                  lineReader.on('line', function (line) {
                    console.log('Line from file:', line);

                    list.insertAdjacentHTML('beforeend', `<li class="list-group-item">${line}</li>`);
                    contacts.push(line);

                  });


               }
            }  
        }).catch(err => {
            console.log(err)
        });
    }
    else {
        // If the platform is 'darwin' (macOS)
        dialog.showOpenDialog({
            title: 'Select the File to be uploaded',
            defaultPath: path.join(__dirname, '../assets/'),
            buttonLabel: 'Upload',
            filters: [
                {
                    name: 'Text or Excel Files',
                    extensions: ['txt', 'docx', 'csv']
                }, ],
            // Specifying the File Selector and Directory 
            // Selector Property In macOS
            properties: ['openFile', 'openDirectory']
        }).then(file => {
            console.log(file.canceled);
            if (!file.canceled) {
              global.filepath = file.filePaths[0].toString();
              console.log(global.filepath);
              if (global.filepath && !file.canceled) {


                var lineReader = readline.createInterface({
                    input: fs.createReadStream(global.filepath)
                  });
                  
                  lineReader.on('line', function (line) {
                    console.log('Line from file:', line);

                    list.insertAdjacentHTML('beforeend', `<li class="list-group-item">${line}</li>`);
                    contacts.push(line);

                  });


               }

            }  
        }).catch(err => {
            console.log(err)
        });
    }
});


