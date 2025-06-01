// Funkcje do obsługi czasu i daty
function updateClock() {
    const now = new Date();
    document.getElementById('current-time').textContent = now.toLocaleTimeString();
    document.getElementById('current-date').textContent = now.toLocaleDateString('pl-PL', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Licznik odwiedzin
function updateVisitCounter() {
    
    if (!sessionStorage.getItem('visitCounted')) {
        let visits = localStorage.getItem('pageVisits') || 0;
        visits = parseInt(visits) + 1;
        localStorage.setItem('pageVisits', visits);
        sessionStorage.setItem('visitCounted', 'true'); // Oznacz sesję
    }
    document.getElementById('visit-counter').textContent = localStorage.getItem('pageVisits') || 0;
}

// Czas spędzony na stronie
let totalSeconds = 0;
let timerInterval;

function startTimeCounter() {
    
    const savedTime = sessionStorage.getItem('timeSpent');
    if (savedTime) {
        totalSeconds = parseInt(savedTime);
        updateTimeDisplay();
    }

    timerInterval = setInterval(() => {
        totalSeconds++;
        sessionStorage.setItem('timeSpent', totalSeconds);
        updateTimeDisplay();
    }, 1000);
}

function updateTimeDisplay() {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    document.getElementById('time-spent').textContent = 
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}


window.addEventListener('DOMContentLoaded', function() {
    updateClock();
    setInterval(updateClock, 1000);
    
    updateVisitCounter();
    startTimeCounter();
});


window.addEventListener('beforeunload', () => {
    sessionStorage.setItem('timeSpent', totalSeconds);
});