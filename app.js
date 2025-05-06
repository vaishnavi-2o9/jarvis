const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

function speak(text) {
    const text_speak = new SpeechSynthesisUtterance(text);

    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;

    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    var day = new Date();
    var hour = day.getHours();

    if (hour >= 0 && hour < 12) {
        speak("Good Morning Boss...");
    } else if (hour >= 12 && hour < 17) {
        speak("Good Afternoon Master...");
    } else {
        speak("Good Evening Sir...");
    }
}

window.addEventListener('load', () => {
    speak("Initializing JARVIS...");
    wishMe();
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());
};

btn.addEventListener('click', () => {
    content.textContent = "Listening...";
    recognition.start();
});

function takeCommand(message) {
    if (message.includes('hey') || message.includes('hello')) {
        speak("Hello Sir, How May I Help You?");
    } else if (message.includes("open google")) {
        window.open("https://www.google.com/", "_blank");
        speak("Opening Google...");
    } else if (message.includes("open youtube")) {
        window.open("https://www.youtube.com/", "_blank");
        speak("Opening Youtube...");
    } else if (message.includes('time')) {
        const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        const finalText = "The current time is " + time;
        speak(finalText);
    } else if (message.includes('date')) {
        const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" });
        const finalText = "Today's date is " + date;
        speak(finalText);
    } else if (message.includes('calculator')) {
        window.open('Calculator:///');
        const finalText = "Opening Calculator";
        speak(finalText);
    } else if (message.includes("open Whatsapp")) {
        window.open("https://web.whatsapp.com/", "_blank");
        speak("Opening Whatsapp...");
    } else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        speak("I'm not sure, but I can try to find the answer for you.");
    } else if (message.includes('weather')) {
        const city = "London"; // Replace with the user's location
        fetch(`http://localhost:5000/weather?city=${city}`)
            .then(response => response.json())
            .then(weather_data => speak_weather(weather_data));
    } else if (message.includes('news')) {
        const topic = "technology"; // Replace with the user's topic of interest
        fetch(`http://localhost:5000/news?topic=${topic}`)
            .then(response => response.json())
            .then(news_data => speak_news(news_data));
    } else if (message.includes('joke')) {
        speak("Here's a joke for you: Why don't scientists trust atoms? Because they make up everything!");
    } else if (message.includes('add to do')) {
        const task = message.replace('add to do ', '');
        fetch(`http://localhost:5000/add_task?task=${task}`)
            .then(response => response.json())
            .then(() => speak(`Added "${task}" to your to-do list.`));
    } else if (message.includes('remove to do')) {
        const index = message.replace('remove to do ', '');
        fetch(`http://localhost:5000/remove_task?index=${index}`)
            .then(response => response.json())
            .then(() => speak(`Removed task from your to-do list.`));
    } else if (message.includes('what is my to do list')) {
        fetch(`http://localhost:5000/get_tasks`)
            .then(response => response.json())
            .then(tasks => speak_tasks(tasks));
    } else if (message.includes('calculate')) {
        const mathRegex = /\b(what is|calculate|what's)\s*(\d+)\s*([+*/-])\s*(\d+)/i;
        const match = message.match(mathRegex);
        if (match) {
            const num1 = parseFloat(match[2]);
            const operator = match[3];
            const num2 = parseFloat(match[4]);
            let result;
            switch (operator) {
                case '+':
                    result = num1;
            }
        }
    }
}