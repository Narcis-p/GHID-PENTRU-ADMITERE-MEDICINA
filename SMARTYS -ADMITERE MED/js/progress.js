document.addEventListener('DOMContentLoaded', function() {
    const activeUser = localStorage.getItem('activeUser');
    if (!activeUser) {
        alert('Pentru a vedea progresul, te rugăm să te autentifici.');
        window.location.href = 'Smartys-login.html';
        return;
    }
    const userResults = JSON.parse(localStorage.getItem('userResults') || '{}');
    const userData = userResults[activeUser] || {
        testsCompleted: 0,
        totalScore: 0,
        questionHistory: [],
        testHistory: []
    };

    document.getElementById('totalTests').textContent = userData.testsCompleted;

    const averageScore = userData.testsCompleted > 0
        ? Math.round(userData.totalScore / userData.testsCompleted)
        : 0;
    document.getElementById('averageScore').textContent = `${averageScore}%`;

    const ctx = document.getElementById('progressChart').getContext('2d');
    const labels = userData.testHistory.map((test, index) => `Test ${userData.testHistory.length - index}`);
    const data = userData.testHistory.map(test => test.percentage);

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Scor (%)',
                data: data,
                borderColor: '#cb7fab',
                backgroundColor: 'rgba(203, 127, 171, 0.1)',
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });

    const historyList = document.getElementById('historyList');
    if (userData.testHistory.length > 0) {
        historyList.innerHTML = '';
        userData.testHistory.forEach(test => {
            const testDate = new Date(test.date).toLocaleDateString();
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            historyItem.innerHTML = `
                <div class="history-date">${testDate}</div>
                <div class="history-score">${test.percentage}%</div>
                <div class="history-details">${test.score}/${test.totalQuestions} corecte</div>
            `;
            historyList.appendChild(historyItem);
        });
    } else {
        historyList.innerHTML = '<p class="no-history">Nu ai finalizat încă niciun test.</p>';
    }
});