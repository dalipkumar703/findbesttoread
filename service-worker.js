// import { hostURL } from "./constant";
const hostURL = 'http://localhost:3000'
importScripts('acho.js');
const query = { active: true, currentWindow: true };
console.log("heello")
// chrome.tabs.query(query, (tabs) => {
//     chrome.tabs.sendMessage(tabs[0].id, {
//         tabTitle: tabs[0].title
//     });
// });
// chrome.commands.onCommand.addListener(function (command) {
//     switch (command) {
//         case 'bark':
//             barkTitle();
//             break;
//         default:
//             console.log(`Command ${command} not found`);
//     }
// });

// function barkTitle() {
   
// }
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'login') {
        console.log("login",request)
        // flip_user_status(true, request.payload)
            fetch(`${hostURL}/login`, {method: 'POST',headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
               body: JSON.stringify(request.payload)}).then(res=>res.json())
            .then(res => {
                if (res.status === 'success'){
                    chrome.storage.local.set({ userStatus: true, userInfo: {email: request.payload.email, isVerified: res.isVerified} }, function (response) {
                        if (chrome.runtime.lastError) resolve('fail');
    
                        // user_signed_in = true;
                        sendResponse(res);
                    })
                } else {
                    sendResponse({error: true, res})
                }
                })
            .catch(err => console.log(err));
        return true;
    } else if (request.message === 'logout') {
        // flip_user_status(false, null)
        fetch(`${hostURL}/logout`, {method: 'POST',headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
           body: JSON.stringify(request.payload)}).then(res=>res.json())
        .then(res => {
            if (res.status === 'success'){
                chrome.storage.local.set({ userStatus: false, userInfo: {} }, function (response) {
                    if (chrome.runtime.lastError) resolve('fail');
        
                    // user_signed_in = false;
                    sendResponse(res);
                })
            } else {

            }
            })
        .catch(err => console.log(err))    
            
        // Promise.resolve()
        //     .then(res => sendResponse(res))
        //     .catch(err => console.log(err));
        return true;
    } 
})