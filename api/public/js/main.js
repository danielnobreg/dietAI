import { loadHistory, addToHistory, clearHistory } from './storage.js';

const button = document.getElementById("send");
const prompt_input = document.getElementById("prompt");
const result = document.getElementById("result");

renderHistory();

button.addEventListener("click", async () => {
    const user_prompt = prompt_input.value.trim();

    if (!user_prompt) {
        result.textContent = "Type something before calculating...";
        return;
    }

    button.disabled = true;
    button.textContent = "Calculating...";
    result.textContent = "Processing...";

    try {
        const response = await fetch("http://localhost:3000/api/dietai", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ user_prompt })
        });

        if (!response.ok) {
            result.textContent = "Error in API: " + response.status;
            return;
        }

        const data = await response.json();
        result.textContent = data.answer;
        
        addToHistory(user_prompt, data.answer);
        renderHistory();
        
    } catch (err) {
        console.error(err);
        result.textContent = "Error in the conection: " + err.message;
    } finally {
        button.disabled = false;
        button.textContent = "Calculate";
    }
});

function renderHistory() {
    const history = loadHistory();
    const historyDiv = document.getElementById('history');
    
    if (!historyDiv) return;
    
    if (history.length === 0) {
        historyDiv.innerHTML = '<p>Theres no consultation</p>';
        return;
    }
    
    historyDiv.innerHTML = history.map(item => `
        <div class="history-item">
            <div>${item.date}</div>
            <div><strong>${item.prompt}</strong></div>
            <div>${item.answer.substring(0, 100)}...</div>
        </div>
    `).join('');
}