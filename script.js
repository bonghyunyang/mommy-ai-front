const chatBox = document.getElementById('chatBox');
const messageInput = document.getElementById('messageInput');
const loading = document.getElementById('loading');

let userMessages = [];
let assistantMessages = [];

function appendMessage(message, isUser) {
    if (message !== "") {
            const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(isUser ? 'user-message' : 'bot-message');

    const sentences = message.split('. ');
    const formattedSentences = sentences.map((sentence, index) => {
        const isLastSentence = index === sentences.length - 1;
        const sentenceWithPeriod = isLastSentence ? sentence : sentence + '.';
        return sentenceWithPeriod;
      });

    formattedSentences.forEach((sentence) => {
        const paragraph = document.createElement('p');
        paragraph.innerText = sentence;
        messageElement.appendChild(paragraph);
    });

    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;

    if (isUser) {
        userMessages.push(message);
    } else {
        assistantMessages.push(message);
    }
    }
}

async function getFortune() {
    showLoading()
    const url = 'http://localhost:3000/fortuneTell';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userMessages: userMessages,
                assistantMessages: assistantMessages,
            })
        });

        if (response.ok) {
            const data = await response.json();
            const assistantMessage = data.assistant;
            appendMessage(assistantMessage, false);
            hideLoading();
        } else {
            console.error('Request failed with status:', response.status);
            appendMessage('메세지를 가져오는데 실패했습니다. 관리자에게 문의해주세요.', false);
            hideLoading();

        }
    } catch (error) {
        console.error('Request failed with error:', error);
        appendMessage('메세지를 가져오는데 실패했습니다. 관리자에게 문의해주세요.', false);
        hideLoading();
    }
}

function sendMessage() {
    const message = messageInput.value;
    if (message.trim() === '') {
        alert('메세지를 입력해주세요!');
        return;
    }
    appendMessage(message, true);
    messageInput.value = '';
    getFortune();
}

function showLoading() {
    loading.style.display = 'block';
}

function hideLoading() {
    loading.style.display = 'none';
}

function addInitialMessage() {
    const chatBox = document.getElementById('chatBox');
  
    const initialMessage1 = document.createElement('div');
    initialMessage1.classList.add('message', 'initial-message');
    initialMessage1.innerText = '오늘도 아이와 행복한 시간 보내고 있죠?';
  
    setTimeout(function () {
      initialMessage1.classList.add('fade-in');
      chatBox.appendChild(initialMessage1);
      chatBox.scrollTop = chatBox.scrollHeight;
  
      const initialMessage2 = document.createElement('div');
      initialMessage2.classList.add('message', 'initial-message');
      initialMessage2.innerText = '궁금하신 내용이 있으면 말씀해주세요!';
  
      setTimeout(function () {
        initialMessage2.classList.add('fade-in');
        chatBox.appendChild(initialMessage2);
        chatBox.scrollTop = chatBox.scrollHeight;
      }, 1000);
    }, 500);
  }
  
window.addEventListener('load', addInitialMessage);

messageInput.addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        sendMessage();
    }
});