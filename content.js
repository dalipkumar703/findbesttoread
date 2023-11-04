
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
    const result = { relevantList: []}
    Promise.all([fetch(`https://rainforestwrapper.netlify.app/.netlify/functions/api/replacer?url=${url}`).then(res=>res.json()),
    fetch(`https://rainforestwrapper.netlify.app/.netlify/functions/api/omitter?url=${url}`).then(res=>res.json()),
    fetch(`https://rainforestwrapper.netlify.app/.netlify/functions/api/suggestion?url=${url}`).then(res=>res.json()) ]).then(data=>{
        const replacer = data[0]
        const omitter = data[1]
        const suggestedArr = data[2]
        const omitterKeys = omitter[0].omitterKeys
        console.log("replacer",replacer)
        console.log("omm",omitter)
        //pages urls
        document.querySelectorAll('a').forEach((item)=>{
            let link = ''
            if (item.href.includes('#')|| item.href.includes('?')){
                
             link = item.href.substr(0, item.href.indexOf('#') > - 1 ? item.href.indexOf('#') :item.href.indexOf('?'))

            } else {
             link = item.href
            }
        
            if(link === window.location.href){
                return;
            }
            // if(item.pathname.includes(filterarr)){
            // res.push(item.href)   
            // }
            let count = 0;
            let isExist = false
            //spiltted url keys
            filterarr.forEach(key=>{
                // const suggestedArr = []
                console.log("item",item.pathname)
                if (omitterKeys.includes(key?.toLowerCase())){
                    return;
                }
                const replacerArr = Object.keys(replacer[0])
                if (Array.isArray(replacerArr) && replacerArr.includes(key?.toLowerCase())){
                    const newKey = replacer[key]
                    const id = item.pathname.includes(newKey)
                    if(id){
                    count++;
                        //url to display to user
                    // result.push(item.href)
                    isExist = true
                    }
                 
                } else if(item.pathname.includes(key?.toLowerCase())){
                    count++;
                    // result.push(item.href)
                } else {
                    const suggestionObj = suggestedArr.suggestionsKey
                    const filterSuggestionArr = suggestionObj[key] || []
                    console.log("suggestion arr",filterSuggestionArr)
                    const suggestionExistArr =    filterSuggestionArr.filter((suggestion)=>{
                        if (item.pathname.includes(suggestion)){
                                return true;
                        } else {
                            return false
                        }
                    })
                    if(suggestionExistArr.length > 1){
                        count++;
                        // result.push(item.href)
                    }
                }
            })
            if(count>0){
                // let link = ''
                // if (item.href.includes('#')|| item.href.includes('?')){
                    
                //  link = item.href.substr(0, item.href.indexOf('#') > - 1 ? item.href.indexOf('#') :item.href.indexOf('?'))

                // } else {
                //  link = item.href
                // }

                const isExist = result.relevantList.filter((matchItem)=> matchItem.link === link)
                if(!isExist.length){
                    if(item.href.includes('#')|| item.href.includes('?')){
                        console.log("new",link)
                       result.relevantList.push({link: link, matchingChar:count})
                    } else {
                       result.relevantList.push({link: item.href, matchingChar:count})
                    }
                   

                }
            }
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


