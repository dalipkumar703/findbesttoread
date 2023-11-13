
const setDOMInfo = info => {
  console.log("item",info)
      const filterList = info.relevantList.sort(function(a, b) {
        return a.matchingChar - b.matchingChar;
      });

      const newDiv = document.createElement("div");
      newDiv.class= "mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
      filterList.reverse().forEach((item)=>{
        // const newContent = document.createTextNode(item);
        const newContent = document.createElement('a');
      const linkText = document.createTextNode("Read More");
      newContent.appendChild(linkText);
      newContent.title = item.link;
      newContent.class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      newContent.href = item.link;
      newContent.style = 'color:blue'
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
      const textDesc = textArr[textArr.length - 1] ? textArr[textArr.length - 1].split('-').join(' ') :textArr[textArr.length - 2].split('-').join(' ')
      console.log("text",textDesc)
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