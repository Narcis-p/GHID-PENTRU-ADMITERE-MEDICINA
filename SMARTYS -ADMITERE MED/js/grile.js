document.addEventListener('DOMContentLoaded', function() {
    
    const activeUser = localStorage.getItem('activeUser');
    const grileContainer = document.getElementById('grile-container');
    const authMessage = document.getElementById('auth-message');

    if (!activeUser) {
        grileContainer.style.display = 'none';
        authMessage.style.display = 'flex';
        
        
        sessionStorage.setItem("redirectAfterLogin", window.location.href);
        return;
    } else {
        grileContainer.style.display = 'block';
        authMessage.style.display = 'none';
    }

    const questionsDatabase = {
        "nervos": [
            {
                id: "n1",
                question: "Care dintre următoarele structuri aparține sistemului nervos central?",
                options: [
                    { text: "Nervul optic", correct: false },
                    { text: "Măduva spinării", correct: true },
                    { text: "Ganglionii spinali", correct: false },
                    { text: "Nervul sciatic", correct: false }
                ],
                explanation: "Măduva spinării face parte din sistemul nervos central, împreună cu creierul.",
                university: "umfcd",
                year: "2023",
                difficulty: "easy"
            },
            {
                id: "n2",
                question: "Care structură face parte din diencefal?",
                options: [
                    { text: "Talamus", correct: true },
                    { text: "Cerebel", correct: false },
                    { text: "Punte", correct: false },
                    { text: "Medulă", correct: false }
                ],
                explanation: "Diencefalul include talamusul, hipotalamusul și epitelamusul.",
                university: "umfcd",
                year: "2023",
                difficulty: "medium"
            },
            {
                id: "n3",
                question: "Ce tip de neuron este responsabil de transmisia semnalelor către mușchi?",
                options: [
                    { text: "Neuron senzitiv", correct: false },
                    { text: "Neuron motor", correct: true },
                    { text: "Interneuron", correct: false },
                    { text: "Neuron bipolat", correct: false }
                ],
                explanation: "Neuronii motori transmit impulsuri de la SNC către organele efectoare.",
                university: "umfiasi",
                year: "2022",
                difficulty: "easy"
            },
            {
                id: "n4",
                question: "Care dintre următoarele este o funcție a sistemului nervos simpatic?",
                options: [
                    { text: "Dilatarea pupilelor", correct: true },
                    { text: "Stimularea digestiei", correct: false },
                    { text: "Scăderea frecvenței cardiace", correct: false },
                    { text: "Vasoconstricție", correct: false }
                ],
                explanation: "Sistemul simpatic pregătește organismul pentru situații de stres (răspuns 'luptă sau fugi').",
                university: "umfcluj",
                year: "2021",
                difficulty: "hard"
            },
            {
                id: "n5",
                question: "Unde are loc sinteza neurotransmițătorilor?",
                options: [
                    { text: "Axon", correct: false },
                    { text: "Terminal sinaptic", correct: false },
                    { text: "Corp celular neuronal", correct: true },
                    { text: "Nucleu celular", correct: false }
                ],
                explanation: "Neurotransmițătorii sunt sintetizați în soma și transportați de-a lungul axonului.",
                university: "umfcv",
                year: "2020",
                difficulty: "medium"
            }
        ],
        "osos": [
            {
                id: "o1",
                question: "Care este rolul principal al oaselor lungi?",
                options: [
                    { text: "Producția celulelor sangvine", correct: true },
                    { text: "Protecția organelor interne", correct: false },
                    { text: "Depozitarea grăsimilor", correct: false },
                    { text: "Producția de enzime digestive", correct: false }
                ],
                explanation: "Oasele lungi conțin măduva osoasă roșie, responsabilă de hematopoeză (producția celulelor sangvine).",
                university: "umfcluj",
                year: "2022",
                difficulty: "medium"
            },
            {
                id: "o2",
                question: "Care dintre următoarele este un exemplu de os scurt?",
                options: [
                    { text: "Femurul", correct: false },
                    { text: "Oasele carpiene", correct: true },
                    { text: "Sternul", correct: false },
                    { text: "Omoplatul", correct: false }
                ],
                explanation: "Oasele scurte au formă cubică și se găsesc în zonele cu mobilitate redusă, cum ar fi carpienele în încheietura mâinii.",
                university: "umfcd",
                year: "2023",
                difficulty: "hard"
            },
            {
                id: "o3",
                question: "Care oase formează scheletul craniului?",
                options: [
                    { text: "Oasele parietale și occipital", correct: true },
                    { text: "Oasele metacarpiene", correct: false },
                    { text: "Sternum și coaste", correct: false },
                    { text: "Oasele tarsiene", correct: false }
                ],
                explanation: "Craniul este format din oase parietale, occipital, frontal, temporale etc.",
                university: "umfcluj",
                year: "2021",
                difficulty: "medium"
            },
            {
                id: "o4",
                question: "Ce tip de articulație este cotul?",
                options: [
                    { text: "Sinovială", correct: true },
                    { text: "Fibroasă", correct: false },
                    { text: "Cartilaginoasă", correct: false },
                    { text: "Sutură", correct: false }
                ],
                explanation: "Articulațiile sinoviale permit mișcări ample, ca în cazul cotului.",
                university: "umfiasi",
                year: "2020",
                difficulty: "hard"
            }
        ],
        "alcatuire": [
            {
                id: "a1",
                question: "Care este funcția principală a țesutului muscular?",
                options: [
                    { text: "Producția de anticorpi", correct: false },
                    { text: "Transportul oxigenului", correct: false },
                    { text: "Contractia și producerea mișcării", correct: true },
                    { text: "Depozitarea calciului", correct: false }
                ],
                explanation: "Țesutul muscular este specializat în contracție, permițând mișcarea scheletului și a organelor interne.",
                university: "umfiasi",
                year: "2021",
                difficulty: "easy"
            },
            {
                id: "a2",
                question: "Câte tipuri de celule fundamentale există în corpul uman?",
                options: [
                    { text: "4 tipuri: epiteliale, musculare, nervoase, conjunctive", correct: false },
                    { text: "Peste 200 de tipuri", correct: true },
                    { text: "12 tipuri principale", correct: false },
                    { text: "2 tipuri: procariote și eucariote", correct: false }
                ],
                explanation: "Corpul uman conține peste 200 de tipuri de celule specializate, fiecare cu structură și funcție specifică.",
                university: "umfcv",
                year: "2020",
                difficulty: "hard"
            },
            {
                id: "a3",
                question: "Ce țesut are rol în termoreglare?",
                options: [
                    { text: "Țesutul adipos", correct: true },
                    { text: "Țesutul osos", correct: false },
                    { text: "Țesutul muscular", correct: false },
                    { text: "Țesutul nervos", correct: false }
                ],
                explanation: "Țesutul adipos izolează termic și stochează energie.",
                university: "umfcv",
                year: "2023",
                difficulty: "easy"
            }
        ],
        "digestiv": [
            {
                id: "d1",
                question: "Care este rolul principal al stomacului în digestie?",
                options: [
                    { text: "Absorbția apei", correct: false },
                    { text: "Digestia mecanică prin contracții musculare", correct: true },
                    { text: "Producția de bilă", correct: false },
                    { text: "Sinteza vitaminelor B", correct: false }
                ],
                explanation: "Stomacul realizează digestia mecanică prin peristaltism și digestia chimică prin acid clorhidric și pepsine.",
                university: "umftgm",
                year: "2023",
                difficulty: "medium"
            },
            {
                id: "d2",
                question: "Care este cel mai lung segment al intestinului subțire?",
                options: [
                    { text: "Duodenul", correct: false },
                    { text: "Ileonul", correct: false },
                    { text: "Jejunul", correct: true },
                    { text: "Colonul", correct: false }
                ],
                explanation: "Jejunul reprezintă aproximativ 40% din lungimea totală a intestinului subțire, fiind principalul loc de absorbție a nutrienților.",
                university: "umfcd",
                year: "2021",
                difficulty: "hard"
            },
            {
                id: "d3",
                question: "Unde se produce amilaza pancreatică?",
                options: [
                    { text: "Pancreas", correct: true },
                    { text: "Ficat", correct: false },
                    { text: "Vesiculă biliară", correct: false },
                    { text: "Stomac", correct: false }
                ],
                explanation: "Amilaza este secretată de pancreas în duoden.",
                university: "umftgm",
                year: "2022",
                difficulty: "medium"
            }
        ],
        "respirator": [
            {
                id: "r1",
                question: "Ce structură previne intrarea alimentelor în trahee?",
                options: [
                    { text: "Epiglotă", correct: true },
                    { text: "Uvulă", correct: false },
                    { text: "Sinusuri nazale", correct: false },
                    { text: "Bronhiole", correct: false }
                ],
                explanation: "Epiglota este un clapet cartilaginos care se închide în timpul înghițirii pentru a proteja căile respiratorii.",
                university: "umfiasi",
                year: "2022",
                difficulty: "easy"
            },
            {
                id: "r2",
                question: "Care este presiunea parțială a oxigenului în alveole?",
                options: [
                    { text: "40 mmHg", correct: false },
                    { text: "100 mmHg", correct: true },
                    { text: "75 mmHg", correct: false },
                    { text: "120 mmHg", correct: false }
                ],
                explanation: "În alveole, pO2 este de ~100 mmHg datorită schimburilor gazoase cu sângele venos.",
                university: "umfcluj",
                year: "2020",
                difficulty: "hard"
            },
            {
                id: "r3",
                question: "Ce stimulează centrul respirator din bulbul rahidian?",
                options: [
                    { text: "Creșterea CO₂ sanguin", correct: true },
                    { text: "Scăderea O₂", correct: false },
                    { text: "Presiunea arterială", correct: false },
                    { text: "Nivelul de glucoză", correct: false }
                ],
                explanation: "Nivelul ridicat de CO₂ este principalul stimul pentru respirație.",
                university: "umfcd",
                year: "2021",
                difficulty: "hard"
            }
        ],
        "chimie": [
            {
                id: "c1",
                question: "Care este formula generală a alcanilor?",
                options: [
                    { text: "CₙH₂ₙ", correct: false },
                    { text: "CₙH₂ₙ₊₂", correct: true },
                    { text: "CₙH₂ₙ₋₂", correct: false },
                    { text: "CₙH₂ₙ₋₆", correct: false }
                ],
                explanation: "Alcanii sunt hidrocarburi saturate cu formula generală CₙH₂ₙ₊₂ (n ≥ 1).",
                university: "umfcv",
                year: "2023",
                difficulty: "easy"
            },
            {
                id: "c2",
                question: "Ce tip de reacție este caracteristic arenelor?",
                options: [
                    { text: "Adiție electrofilă", correct: false },
                    { text: "Substituție electrofilă", correct: true },
                    { text: "Adiție nucleofilă", correct: false },
                    { text: "Eliminare", correct: false }
                ],
                explanation: "Arenele participă predominant în reacții de substituție electrofilă datorită sistemului conjugat π.",
                university: "umfcd",
                year: "2022",
                difficulty: "medium"
            },
            {
                id: "c3",
                question: "Ce structură prezintă benzenul?",
                options: [
                    { text: "Geometrie plană cu legături simple și duble localizate", correct: false },
                    { text: "Structură tetraedrică", correct: false },
                    { text: "Sistem conjugat cu electroni delocalizați", correct: true },
                    { text: "Lanț deschis cu duble conjugate", correct: false }
                ],
                explanation: "Benzenul are un sistem aromatic cu 6 electroni π delocalizați în inel, conform teoriei lui Kekulé.",
                university: "umfiasi",
                year: "2021",
                difficulty: "hard"
            },
            {
                id: "c4",
                question: "Care este produsul principal la arderea completă a propanului?",
                options: [
                    { text: "CO₂ și H₂O", correct: true },
                    { text: "CO și H₂O", correct: false },
                    { text: "C și O₂", correct: false },
                    { text: "CH₃COOH", correct: false }
                ],
                explanation: "Arderea completă a alcanilor produce dioxid de carbon și apă.",
                university: "umfiasi",
                year: "2023",
                difficulty: "easy"
            }
        ]
    };

    
    const quizContainer = document.getElementById('quiz-container');
    const resultsContainer = document.getElementById('results-container');
    const scoreDisplay = document.getElementById('score-display');
    const progressBar = document.getElementById('progress-bar');
    const feedbackContainer = document.getElementById('feedback');
    const restartBtn = document.getElementById('restart-btn');
    const chapterFilter = document.getElementById('chapter-filter');
    const universityFilter = document.getElementById('university-filter');
    const yearFilter = document.getElementById('year-filter');

    
    let currentQuestions = [];
    let currentQuestionIndex = 0;
    let userAnswers = [];
    let score = 0;

    
    initQuiz();

    
    chapterFilter.addEventListener('change', initQuiz);
    universityFilter.addEventListener('change', initQuiz);
    yearFilter.addEventListener('change', initQuiz);
    restartBtn.addEventListener('click', initQuiz);

    
    function initQuiz() {
        currentQuestions = [];
        currentQuestionIndex = 0;
        userAnswers = [];
        score = 0;

        resultsContainer.style.display = 'none';
        quizContainer.style.display = 'block';
        quizContainer.innerHTML = `
            <div class="loading">
                <div class="spinner"></div>
                <p>Se încarcă întrebările...</p>
            </div>
        `;

        setTimeout(() => {
            loadQuestions();
            displayQuestion();
        }, 800);
    }

    function loadQuestions() {
        const selectedChapter = chapterFilter.value;
        const selectedUniversity = universityFilter.value;
        const selectedYear = yearFilter.value;

        let filteredQuestions = [];

        if (selectedChapter === 'all') {
            for (const chapter in questionsDatabase) {
                filteredQuestions = filteredQuestions.concat(
                    questionsDatabase[chapter].filter(q => 
                        (selectedUniversity === 'all' || q.university === selectedUniversity) &&
                        (selectedYear === 'all' || q.year === selectedYear)
                    )
                );
            }
        } else if (questionsDatabase[selectedChapter]) {
            filteredQuestions = questionsDatabase[selectedChapter].filter(q => 
                (selectedUniversity === 'all' || q.university === selectedUniversity) &&
                (selectedYear === 'all' || q.year === selectedYear)
            );
        }

        currentQuestions = shuffleArray(filteredQuestions).slice(0, 10);
        userAnswers = new Array(currentQuestions.length).fill(null);

        if (currentQuestions.length === 0) {
            quizContainer.innerHTML = `
                <div class="no-questions">
                    <i class="fas fa-exclamation-circle"></i>
                    <h3>Nu s-au găsit întrebări</h3>
                    <p>Încearcă să schimbi criteriile de filtrare</p>
                </div>
            `;
        }
    }

    function displayQuestion() {
        if (currentQuestions.length === 0) return;

        const question = currentQuestions[currentQuestionIndex];
        const letters = ['A', 'B', 'C', 'D'];

        let questionHTML = `
            <div class="question-card">
                <div class="question-header">
                    <h3 class="question-text">${currentQuestionIndex + 1}. ${question.question}</h3>
                    <div class="question-meta">
                        <span>${getUniversityName(question.university)} ${question.year}</span>
                    </div>
                </div>
                <div class="options-container" id="options-container">
        `;

        question.options.forEach((option, index) => {
            let optionClass = '';
            if (userAnswers[currentQuestionIndex] !== null) {
                if (userAnswers[currentQuestionIndex] === index) {
                    optionClass = option.correct ? 'correct' : 'incorrect';
                } else if (option.correct) {
                    optionClass = 'correct';
                }
            } else if (userAnswers[currentQuestionIndex] === index) {
                optionClass = 'selected';
            }
            
            questionHTML += `
                <button class="option-btn ${optionClass}" data-index="${index}">
                    <span class="option-letter">${letters[index]}</span>
                    ${option.text}
                </button>
            `;
        });

        questionHTML += `
                </div>
                <div class="navigation-btns">
                    <button class="nav-btn" id="prev-btn" ${currentQuestionIndex === 0 ? 'disabled' : ''}>
                        <i class="fas fa-arrow-left"></i> Întrebarea anterioară
                    </button>
                    ${
                        currentQuestionIndex === currentQuestions.length - 1 
                        ? '<button class="nav-btn submit-btn" id="submit-btn"><i class="fas fa-check-circle"></i> Finalizează testul</button>'
                        : '<button class="nav-btn" id="next-btn">Următoarea întrebare <i class="fas fa-arrow-right"></i></button>'
                    }
                </div>
            </div>
        `;

        quizContainer.innerHTML = questionHTML;

        
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                if (userAnswers[currentQuestionIndex] === null) {
                    userAnswers[currentQuestionIndex] = parseInt(btn.dataset.index);
                    displayQuestion();
                }
            });
        });

        
        document.getElementById('prev-btn')?.addEventListener('click', goToPreviousQuestion);
        document.getElementById('next-btn')?.addEventListener('click', goToNextQuestion);
        document.getElementById('submit-btn')?.addEventListener('click', showResults);
    }

    function goToPreviousQuestion() {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            displayQuestion();
        }
    }

    function goToNextQuestion() {
        if (currentQuestionIndex < currentQuestions.length - 1) {
            currentQuestionIndex++;
            displayQuestion();
        }
    }

    function showResults() {
        score = currentQuestions.reduce((acc, question, index) => {
            return acc + (userAnswers[index] !== null && question.options[userAnswers[index]].correct ? 1 : 0);
        }, 0);

        const percentage = Math.round((score / currentQuestions.length) * 100);

        quizContainer.style.display = 'none';
        resultsContainer.style.display = 'block';

        scoreDisplay.textContent = `${score} / ${currentQuestions.length} (${percentage}%)`;
        progressBar.style.width = `${percentage}%`;

        feedbackContainer.innerHTML = '';
        currentQuestions.forEach((question, index) => {
            const userAnswerIndex = userAnswers[index];
            const isCorrect = userAnswerIndex !== null && question.options[userAnswerIndex].correct;
            const correctAnswerIndex = question.options.findIndex(opt => opt.correct);

            const feedbackItem = document.createElement('div');
            feedbackItem.className = 'feedback-item';
            feedbackItem.innerHTML = `
                <div class="feedback-question">${index + 1}. ${question.question}</div>
                <div class="feedback-answer">Răspunsul tău: ${
                    userAnswerIndex !== null 
                    ? `<strong>${String.fromCharCode(65 + userAnswerIndex)}. ${question.options[userAnswerIndex].text}</strong>`
                    : '<em>Nerăspuns</em>'
                }</div>
                <div class="feedback-answer">Răspuns corect: <strong>${String.fromCharCode(65 + correctAnswerIndex)}. ${question.options[correctAnswerIndex].text}</strong></div>
                ${!isCorrect && userAnswerIndex !== null ? `
                    <div class="feedback-explanation">
                        <strong>Explicație:</strong> ${question.explanation}
                    </div>
                ` : ''}
                <div class="feedback-meta">Sursa: ${question.university} ${question.year}</div>
            `;
            feedbackContainer.appendChild(feedbackItem);
        });

        saveProgress(score, currentQuestions.length, chapterFilter.value);
        resultsContainer.scrollIntoView({ behavior: 'smooth' });
    }

    function saveProgress(score, totalQuestions, chapter) {
        const userResults = JSON.parse(localStorage.getItem('userResults') || {});
        if (!userResults[activeUser]) {
            userResults[activeUser] = {
                testsCompleted: 0,
                totalScore: 0,
                questionHistory: [],
                testHistory: []
            };
        }

        const testResult = {
            date: new Date().toISOString(),
            score,
            totalQuestions,
            percentage: Math.round((score / totalQuestions) * 100),
            chapter
        };

        userResults[activeUser].testsCompleted++;
        userResults[activeUser].totalScore += testResult.percentage;
        userResults[activeUser].testHistory.unshift(testResult);
        
        localStorage.setItem('userResults', JSON.stringify(userResults));
    }

    function shuffleArray(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }

    function getUniversityName(university) {
        const universities = {
            "umfcd": "UMFCD",
            "umfiasi": "UMF Iași",
            "umfcluj": "UMF Cluj",
            "umftgm": "UMF TGM",
            "umfcv": "UMF Craiova"
        };
        return universities[university] || university;
    }
});