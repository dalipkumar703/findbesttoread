
const setDOMInfo = info => {
  console.log("item",info)
      const filterList = info.relevantList.sort(function(a, b) {
        return a.matchingChar - b.matchingChar;
      });

      const newDiv = document.createElement("div");
      filterList.reverse().forEach((item)=>{
        // const newContent = document.createTextNode(item);
        const newContent = document.createElement('a');
      const linkText = document.createTextNode(item.link);
      newContent.appendChild(linkText);
      newContent.title = item;
      newContent.href = item;
      newContent.addEventListener('click', function(e) {
        // window.open(item,'_tab')
        e.preventDefault()
        e.stopPropagation();
        let handle = window.open(item.link);
        handle.blur();
        window.focus();
        // window.open(item,'_blank','noopener')
      });
      const textArr = item.link.split('/')
      const textDesc = textArr.pop() ? textArr.pop().split('-').join(' ') :textArr[textArr.length - 1].split('-').join(' ')
      const upperCaseTextDesc = textDesc.charAt(0).toUpperCase() + textDesc.slice(1);
      const linkDesc = document.createTextNode(upperCaseTextDesc);
        // add the text node to the newly created div
        newDiv.appendChild(linkDesc)
        const br1 = document.createElement("br");
        newDiv.appendChild(br1)
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