const chatBox = document.getElementById('chatBox');
const messageInput = document.getElementById('messageInput');
const loading = document.getElementById('loading');

let userMessages = [];
let assistantMessages = [];

function appendMessage(message, isUser) {
    if (message !== "") {
        const chatBox = document.getElementById('chatBox');
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

async function getAiResponse() {
    showLoading()
    const url = 'https://3244ah642yeuqn2tycde2rudbu0griyq.lambda-url.ap-northeast-2.on.aws/getResponse';
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
    getAiResponse();
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

  function showTerms(type) {
    const modal = document.getElementById('termsModal');
    const title = document.getElementById('termsTitle');
    const text = document.getElementById('termsText');

    if (type === 'privacy') {
        title.textContent = '개인정보보호약관';
        text.innerHTML = `
            <p>Mommy AI 개인 정보 처리 방침</p>
            <p>이 개인 정보 처리 방침은 Mommy AI(이하 "회사" 또는 "우리")가 수집, 사용, 보호하는 개인 정보에 대한 정책을 설명합니다. 회사는 사용자의 개인 정보를 보호하기 위해 최선을 다하며, 관련 법률과 규정을 준수합니다.</p>
            <p>수집하는 개인 정보:</p>
            <p>1.1 회사는 Mommy AI API 및 관련 서비스(이하 "서비스")의 이용과 관련하여 사용자로부터 다음과 같은 개인 정보를 수집할 수 있습니다:</p>
            <p>사용자 식별 정보: 이름, 이메일 주소 등</p>
            <p>로그 및 사용 기록: 서비스 이용 기록, IP 주소, 쿠키 정보, 브라우저 유형 등</p>
            <p>기타 정보: 서비스 개발 및 개선을 위한 추가 정보</p>
            <p>개인 정보의 사용 목적:</p>
            <p>2.1 회사는 수집한 개인 정보를 다음 목적으로 사용할 수 있습니다:</p>
            <p>서비스 제공 및 운영</p>
            <p>사용자 지원 및 응답</p>
            <p>서비스 개발 및 개선</p>
            <p>법적 요구사항 준수</p>
            <p>개인 정보의 보호:</p>
            <p>3.1 회사는 적절한 기술적, 물리적, 관리적 보호조치를 이용하여 수집한 개인 정보를 보호합니다.</p>
            <p>3.2 회사는 개인 정보를 제3자와 공유할 필요가 있는 경우, 관련 법률과 규정을 준수하며, 정보의 기밀성을 유지하기 위해 필요한 조치를 취합니다.</p>
            <p>개인 정보의 보관 기간:</p>
            <p>4.1 회사는 개인 정보를 수집한 목적이 달성되거나 법적 의무의 이행이 완료된 후에는 해당 정보를 삭제하거나 비식별화합니다.</p>
            <p>개인 정보 관리:</p>
            <p>5.1 사용자는 회사에게 자신의 개인 정보에 대한 열람, 수정, 삭제 요청을 할 수 있습니다. 자세한 내용은 회사의 개인 정보 처리 방침을 참조하시기 바랍니다.</p>
            <p>상기 개인 정보 처리 방침은 Mommy AI의 개인 정보 수집, 사용, 보호에 대한 정책을 설명합니다. 사용자는 서비스를 이용함으로써 이 개인 정보 처리 방침에 동의하는 것으로 간주됩니다.</p>
        `;
        modal.style.display = 'block';
    } else if (type === 'service') {
        title.textContent = '이용약관';
        text.innerHTML = `
            <p>이 이용 약관(이하 "약관")은 Mommy AI (이하 "회사" 또는 "우리")와 사용자(이하 "사용자" 또는 "당신") 간의 Mommy AI API 및 관련 서비스(이하 "서비스") 이용에 대한 규정을 설명합니다.</p>
            <p>이 약관은 사용자와 회사 간의 법적인 계약을 형성합니다. 서비스를 이용함으로써 사용자는 이 약관의 내용을 이해하고 동의한 것으로 간주됩니다.</p>
            <p>서비스 이용</p>
            <p>1.1 사용자는 Mommy AI에서 사용하는 ChatGPT OpenAPI를 통한 지식 전달 및 일반적인 대화를 위한 서비스를 이용할 수 있습니다.</p>
            <p>1.2 서비스의 사용은 사용자에게 정보 전달 및 채팅 기능을 제공하는 것에 국한되며, 의료 전문적인 조언이나 의료 진단, 의료 처방을 대체하지 않습니다.</p>
            <p>면책 조항</p>
            <p>2.1 회사는 서비스에서 제공하는 정보의 정확성, 완전성, 신뢰성에 대해 어떠한 보증도 제공하지 않습니다. 사용자는 서비스를 사용함으로써 발생한 어떠한 결과에 대해서도 회사에게 책임을 묻지 않습니다.</p>
            <p>2.2 사용자는 서비스를 사용함으로써 발생하는 모든 행위와 결과에 대해 전적으로 책임을 집니다.</p>
            <p>지적 재산권</p>
            <p>3.1 회사는 Mommy AI 소유권 및 지적 재산권을 보유합니다. 사용자는 제한적인 라이선스를 받아 서비스 이용에 제한 사항이 있을 수 있습니다.</p>
            <p>3.2 사용자는 회사의 지적 재산권을 침해하지 않아야 하며, 회사의 동의 없이 회사의 지적 재산권을 복제, 수정, 배포, 전송하거나 상업적으로 이용해서는 안 됩니다.</p>
            <p>상기 약관은 Mommy AI와 사용자 간의 법적인 계약을 형성합니다. 사용자가 서비스를 이용함으로써 이 약관의 내용에 동의하는 것으로 간주됩니다.</p>
        `;
        modal.style.display = 'block';
    }
}

function closeTerms() {
    const modal = document.getElementById('termsModal');
    modal.style.display = 'none';
}

window.addEventListener('load', addInitialMessage);

messageInput.addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        const message = messageInput.value.trim();
        if (message === '') {
            return;
        }
        appendMessage(message, true);
        messageInput.value = '';
        getAiResponse();
    }
});