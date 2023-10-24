
const setDOMInfo = info => {
  console.log("item",info)

      const newDiv = document.createElement("div");
    info.forEach((item)=>{
        // const newContent = document.createTextNode(item);
        const newContent = document.createElement('a');
      const linkText = document.createTextNode(item);
      newContent.appendChild(linkText);
      newContent.title = item;
      newContent.href = item;
      newContent.addEventListener('click', function(e) {
        window.open(item,'_tab')
        e.preventDefault()
        e.stopPropagation();
      });
    
        // add the text node to the newly created div
        newDiv.appendChild(newContent);
        const br = document.createElement("br");
        newDiv.appendChild(br)
    })
    const currentDiv = document.getElementById('links');
    const parent = document.getElementById('container');

    
    parent.insertBefore(newDiv, currentDiv.nextSibling);
    
  };
window.addEventListener('DOMContentLoaded', () => {
    // ...query for the active tab...
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, tabs => {
      // ...and send a request for the DOM info...
      chrome.tabs.sendMessage(
          tabs[0].id,
          {from: 'popup'},
          // ...also specifying a callback to be called 
          //    from the receiving end (content script).
          setDOMInfo);
    });
   
  });