
let findarr= []
    let url = window.location.pathname
    console.log("url",url)
    url.split('-').map((item)=>{
        if(item.includes('/')){
           findarr.push( item.includes('/') ? item.split('/'): '')
        } else{
            findarr.push(item)
        }
    })
    console.log("arr",findarr)
    const filterarr = findarr.flat().filter((data)=>data !== '' && !data.match(/[0-9]/))
    console.log(filterarr)
    const result = []
    Promise.all([fetch('https://rainforestwrapper.netlify.app/.netlify/functions/api/replacer').then(res=>res.json()),fetch('https://rainforestwrapper.netlify.app/.netlify/functions/api/omitter').then(res=>res.json()) ]).then(data=>{
        const replacer = data[0]
        const omitter = data[1]
        const omitterKeys = omitter[0].omitterKeys
        console.log("replacer",replacer)
        console.log("replacer",omitter)
        document.querySelectorAll('a').forEach((item)=>{
            // if(item.pathname.includes(filterarr)){
            // res.push(item.href)   
            // }
           
            let isExist = false
            filterarr.forEach(key=>{
                console.log("item",item.pathname)
                if (omitterKeys.includes(key)){
                    return;
                }
                const replacerArr = Object.keys(replacer[0])
                if (Array.isArray(replacerArr) && replacerArr.includes(key)){
                    const newKey = replacer[key]
                    const id = item.pathname.indexOf(newKey)
                    result.push(item.href)
                    isExist = true
                } else if(item.pathname.includes(key) && !isExist){
                    const id = item.pathname.indexOf(key)
                    result.push(item.href)
                    isExist = true
                }
            })
        })
        console.log('data',result)
    })

   // Listen for messages from the popup.
chrome.runtime.onMessage.addListener((msg, sender, response) => {
    // First, validate the message's structure.
    if ((msg.from === 'popup')) {
      // Collect the necessary data. 
      // (For your specific requirements `document.querySelectorAll(...)`
      //  should be equivalent to jquery's `$(...)`.)
    //       const newDiv = document.createElement("div");
    // result.forEach((item)=>{
    //     const newContent = document.createTextNode(item);
    
    //     // add the text node to the newly created div
    //     newDiv.appendChild(newContent);
    // })
  
      // Directly respond to the sender (popup), 
      // through the specified callback.
      response(result);
    }
  });
    //  create a new div element
   
    //  // and give it some content
     
    
    //  // add the newly created element and its content into the DOM
    //  const currentDiv = document.getElementById("emailVerify");
    //  document.body.insertBefore(newDiv, currentDiv);


