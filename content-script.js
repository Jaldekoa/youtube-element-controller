const elements = {
  primary: '#primary',
  secondary: '#secondary',
  secondaryInner: '#secondary-inner',
  chats: '#chat-container',
  related: '#related'
};

function updateElement(id, hidden) {
  const element = document.querySelector(elements[id]);
  if (element) {
    if (hidden) {
      element.setAttribute('hidden', 'true');
    } else {
      element.removeAttribute('hidden');
    }
  }
}

chrome.storage.local.get(Object.keys(elements), (result) => {
  Object.keys(elements).forEach(id => {
    updateElement(id, result[id]);
  });
});

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === 'toggleUpdate') {
    updateElement(message.id, message.hidden);
  }
});

const observer = new MutationObserver(() => {
  chrome.storage.local.get(Object.keys(elements), (result) => {
    Object.keys(elements).forEach(id => {
      updateElement(id, result[id]);
    });
  });
});

observer.observe(document.body, { childList: true, subtree: true });