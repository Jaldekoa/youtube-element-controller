document.addEventListener('DOMContentLoaded', () => {
    const toggles = ['primary', 'secondary', 'secondary-inner', 'chat-container', 'related'];
    
    chrome.storage.local.get(toggles, (result) => {
      toggles.forEach(id => {
        const checkbox = document.getElementById(id);
        checkbox.checked = result[id] || false;
      });
    });
  
    toggles.forEach(id => {
      document.getElementById(id).addEventListener('change', (e) => {
        chrome.storage.local.set({ [id]: e.target.checked });
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
          chrome.tabs.sendMessage(tabs[0].id, { 
            type: 'toggleUpdate',
            id: id,
            hidden: e.target.checked
          });
        });
      });
    });
  });