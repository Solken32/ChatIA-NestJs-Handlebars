
const input = document.getElementById('input');
const messages = document.getElementById('messages');

function appendMessage(content, sender) {
    const div = document.createElement("div");
    div.className = `flex ${sender === 'user' ? 'items-start gap-3' : 'flex-row-reverse gap-3'}`

    // ícono-avatar
    const avatar = document.createElement("div");
    avatar.className = 'w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center flex-shrink-0';
    avatar.innerHTML = `
        <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
        </svg>
      `;

    // mensaje container
    const messageWrapper = document.createElement("div");
    messageWrapper.className = ` ${sender === 'user' ? '' : ''}`;

    const bubble = document.createElement("div");
    bubble.className = `rounded-lg p-3 shadow-sm border max-w-xs ${sender === 'user' ? 'bg-blue-600 text-white' : 'bg-white text-black'}`;
    bubble.innerHTML = `<p>${content}</p>`;


    //poner hora actual
    const now = new Date();
    const time = document.createElement("p");
    time.className = `text-xs text-gray-500 mt-1 ${sender === 'user' ? 'text-end' : ''}`;
    time.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    messageWrapper.appendChild(bubble);
    messageWrapper.appendChild(time);


    if (sender = "user") {
        div.classList.add("justify-end");
        div.innerHTML = ''; // Limpia todo
        div.appendChild(messageWrapper);
        div.appendChild(avatar); // avatar a la derecha
    } else {
        div.appendChild(avatar);
        div.appendChild(messageWrapper);
    }

    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
}

async function send() {
    const text = input.value.trim();
    if (!text) return;

    appendMessage(text, 'user');
    input.value = '';

    const res = await fetch('/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
    });

    const data = await res.json();
    console.log('Respuesta:', data);
    appendMessage(data.reply, 'bot');
    hablar(data.reply);
}

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') send();
});


function hablar(texto){
    const utterance= new SpeechSynthesisUtterance(texto);
    utterance.lang="es-ES";

    //Mostrar modal
    document.getElementById("vozModal").style.display="block";

    //ocultar al terminar 
    utterance.onend= () => {
        document.getElementById("vozModal").style.display="none";
    }

    // en caso de error
    utterance.onerror= () => {
        document.getElementById("vozModal").style.display="none";
    }
    speechSynthesis.speak(utterance);
}


function cancelarVoz(){
    speechSynthesis.cancel();
    document.getElementById("vozModal").style.display="none";
}