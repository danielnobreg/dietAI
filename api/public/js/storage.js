export function loadHistory() {
    const data  = localStorage.getItem('dietai_history');

    if (!data) return [];

    try {
        return JSON.parse(data);
    } catch (err) {
        console.log('Corrupted History:', err);
        localStorage.removeItem('dietai_history');
        return [];
    }
}

export function saveHistory(history) {
    localStorage.setItem('dietai_history', JSON.stringify(history));
}

export function addToHistory(prompt, answer) {
    const history = loadHistory();

    history.unshift({
        id: Date.now(),
        date: new Date().toLocaleString('pt-BR'),
        prompt,
        answer
    });

    if (history.length > 50) history = history.slice(0, 50);

    saveHistory(history);
}

export function clearHistory() {
    localStorage.removeItem('dietai_history');
}