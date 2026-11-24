// ===== NAVIGATION =====
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    
    // Active section highlighting
    const sections = document.querySelectorAll('section[id], header[id]');
    const scrollY = window.scrollY + 100;
    
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-menu a[href="#${id}"]`);
        
        if (link) {
            if (scrollY >= top && scrollY < top + height) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        }
    });
});

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu on link click
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ===== QUIZ =====
const questions = [
    {
        question: "Jaki jest ogólny wzór wodorotlenków?",
        options: ["M₂O", "M(OH)ₙ", "HₙX", "MₙO"],
        correct: 1,
        explanation: "Wodorotlenki mają ogólny wzór M(OH)ₙ, gdzie M to metal, a n jego wartościowość."
    },
    {
        question: "Który z poniższych związków jest mocną zasadą?",
        options: ["Fe(OH)₃", "Cu(OH)₂", "NaOH", "Al(OH)₃"],
        correct: 2,
        explanation: "NaOH (wodorotlenek sodu) to mocna zasada – dobrze rozpuszczalna i całkowicie zdysocjowana."
    },
    {
        question: "Który wodorotlenek jest amfoteryczny?",
        options: ["KOH", "Ca(OH)₂", "Al(OH)₃", "Ba(OH)₂"],
        correct: 2,
        explanation: "Al(OH)₃ reaguje zarówno z kwasami, jak i z mocnymi zasadami – jest amfoteryczny."
    },
    {
        question: "Co powstaje w reakcji NaOH + HCl?",
        options: ["NaCl + H₂", "NaCl + H₂O", "Na₂O + HCl", "NaH + Cl₂"],
        correct: 1,
        explanation: "To klasyczna reakcja zobojętniania: zasada + kwas → sól + woda."
    },
    {
        question: "Jak nazywa się zwyczajowo Ca(OH)₂?",
        options: ["Soda kaustyczna", "Wapno gaszone", "Mleko magnezjowe", "Potas żrący"],
        correct: 1,
        explanation: "Ca(OH)₂ to wapno gaszone (wapno hydratyzowane), otrzymywane przez gaszenie wapna palonego wodą."
    },
    {
        question: "Który osad ma charakterystyczną niebieską barwę?",
        options: ["Fe(OH)₃", "Al(OH)₃", "Cu(OH)₂", "Zn(OH)₂"],
        correct: 2,
        explanation: "Cu(OH)₂ tworzy charakterystyczny niebieski, galaretowaty osad."
    },
    {
        question: "Jak otrzymuje się wodorotlenki metali aktywnych?",
        options: [
            "Reakcja metalu z kwasem",
            "Reakcja metalu lub tlenku metalu z wodą",
            "Reakcja soli z tlenkiem",
            "Elektroliza kwasu"
        ],
        correct: 1,
        explanation: "Metale aktywne (I i II grupa) reagują z wodą, a ich tlenki również dają wodorotlenki."
    },
    {
        question: "Co dzieje się z Al(OH)₃ w nadmiarze NaOH?",
        options: [
            "Pozostaje osadem",
            "Rozpuszcza się tworząc hydroksokompleks",
            "Wydziela gaz",
            "Ulega redukcji"
        ],
        correct: 1,
        explanation: "Al(OH)₃ + NaOH → Na[Al(OH)₄] – powstaje rozpuszczalny tetrahydroksoglinian sodu."
    },
    {
        question: "Dlaczego roztwory zasad mają odczyn zasadowy?",
        options: [
            "Zawierają jony H⁺",
            "Zawierają jony OH⁻",
            "Zawierają jony metalu",
            "Nie dysocjują"
        ],
        correct: 1,
        explanation: "Jony OH⁻ (wodorotlenkowe) odpowiadają za odczyn zasadowy roztworu (pH > 7)."
    },
    {
        question: "Który wodorotlenek stosuje się do wykrywania CO₂?",
        options: ["NaOH", "KOH", "Ca(OH)₂", "Mg(OH)₂"],
        correct: 2,
        explanation: "Woda wapienna (roztwór Ca(OH)₂) mętnieje pod wpływem CO₂ z powodu wytrącenia CaCO₃."
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const quizQuestion = document.getElementById('quizQuestion');
const quizOptions = document.getElementById('quizOptions');
const quizFeedback = document.getElementById('quizFeedback');
const nextBtn = document.getElementById('nextBtn');
const restartBtn = document.getElementById('restartBtn');
const quizScore = document.getElementById('quizScore');
const progressBar = document.getElementById('progressBar');

function loadQuestion() {
    answered = false;
    const q = questions[currentQuestion];
    
    quizQuestion.innerHTML = `
        <span class="q-number">Pytanie ${currentQuestion + 1} z ${questions.length}</span>
        <h3>${q.question}</h3>
    `;
    
    quizOptions.innerHTML = q.options.map((opt, i) => 
        `<button class="quiz-option" data-index="${i}">${opt}</button>`
    ).join('');
    
    quizFeedback.textContent = '';
    quizFeedback.className = 'quiz-feedback';
    nextBtn.style.display = 'none';
    restartBtn.style.display = 'none';
    quizScore.style.display = 'none';
    
    progressBar.style.width = `${((currentQuestion) / questions.length) * 100}%`;
    
    document.querySelectorAll('.quiz-option').forEach(btn => {
        btn.addEventListener('click', handleAnswer);
    });
}

function handleAnswer(e) {
    if (answered) return;
    answered = true;
    
    const selected = parseInt(e.target.dataset.index);
    const q = questions[currentQuestion];
    const buttons = document.querySelectorAll('.quiz-option');
    
    buttons.forEach(btn => {
        btn.disabled = true;
        const idx = parseInt(btn.dataset.index);
        if (idx === q.correct) {
            btn.classList.add('correct');
        } else if (idx === selected) {
            btn.classList.add('wrong');
        }
    });
    
    if (selected === q.correct) {
        score++;
        quizFeedback.textContent = '✓ Poprawnie! ' + q.explanation;
        quizFeedback.className = 'quiz-feedback correct';
    } else {
        quizFeedback.textContent = '✗ Niepoprawnie. ' + q.explanation;
        quizFeedback.className = 'quiz-feedback wrong';
    }
    
    if (currentQuestion < questions.length - 1) {
        nextBtn.style.display = 'inline-flex';
    } else {
        showScore();
    }
}

function showScore() {
    progressBar.style.width = '100%';
    quizScore.style.display = 'block';
    nextBtn.style.display = 'none';
    
    const percentage = Math.round((score / questions.length) * 100);
    let message = '';
    if (percentage >= 90) message = 'Doskonale! Jesteś ekspertem od wodorotlenków! 🏆';
    else if (percentage >= 70) message = 'Bardzo dobrze! Masz solidną wiedzę. 💪';
    else if (percentage >= 50) message = 'Nieźle, ale warto jeszcze powtórzyć materiał. 📚';
    else message = 'Warto wrócić do materiału i spróbować ponownie. 🔬';
    
    quizScore.innerHTML = `
        <div class="score-circle">${score}/${questions.length}</div>
        <h3>${percentage}%</h3>
        <p>${message}</p>
    `;
    restartBtn.style.display = 'inline-flex';
}

nextBtn.addEventListener('click', () => {
    currentQuestion++;
    loadQuestion();
});

restartBtn.addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    loadQuestion();
});

// Init quiz
loadQuestion();

// ===== SMOOTH REVEAL ON SCROLL =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.card, .method-card, .example-card, .app-card, .fact-card, .safety-card, .reaction-block').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});
