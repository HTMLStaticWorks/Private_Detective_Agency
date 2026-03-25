document.addEventListener('DOMContentLoaded', function() {
  const chatInput = document.querySelector('.chat-box + .input-group input');
  const chatBtn = document.querySelector('.chat-box + .input-group .btn');
  const chatBox = document.querySelector('.chat-box');

  if (chatBtn && chatInput) {
    chatBtn.addEventListener('click', () => {
      const msg = chatInput.value.trim();
      if (msg) {
        const msgDiv = document.createElement('div');
        // Use logical class message-user which handles margin-inline-start
        msgDiv.className = 'message message-user';
        msgDiv.innerHTML = `<p class="mb-0 small">${msg}</p>`;
        chatBox.appendChild(msgDiv);
        chatInput.value = '';
        chatBox.scrollTop = chatBox.scrollHeight;
      }
    });

    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') chatBtn.click();
    });
  }
});
