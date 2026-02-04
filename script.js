  // Word Database
        const wordDatabase = {
            easy: [
                { word: 'HOUSE', hint: 'A place where people live' },
                { word: 'WATER', hint: 'Essential liquid for life' },
                { word: 'BREAD', hint: 'Common baked food' },
                { word: 'CHAIR', hint: 'Furniture for sitting' },
                { word: 'LIGHT', hint: 'Opposite of darkness' },
                { word: 'PHONE', hint: 'Device for calling' },
                { word: 'MUSIC', hint: 'Pleasant sounds arranged' },
                { word: 'FRIEND', hint: 'Close companion' },
                { word: 'SMILE', hint: 'Expression of happiness' },
                { word: 'HAPPY', hint: 'Feeling of joy' },
                { word: 'CLOUD', hint: 'White fluffy thing in sky' },
                { word: 'RIVER', hint: 'Flowing body of water' },
                { word: 'PLANT', hint: 'Living green organism' },
                { word: 'APPLE', hint: 'Popular red fruit' },
                { word: 'SLEEP', hint: 'Nightly rest period' }
            ],
            medium: [
                { word: 'COMPUTER', hint: 'Electronic thinking machine' },
                { word: 'KITCHEN', hint: 'Room for cooking' },
                { word: 'FREEDOM', hint: 'State of being free' },
                { word: 'JOURNEY', hint: 'Long trip or travel' },
                { word: 'LIBRARY', hint: 'Place with many books' },
                { word: 'THUNDER', hint: 'Loud sound after lightning' },
                { word: 'SCIENCE', hint: 'Systematic study of nature' },
                { word: 'COURAGE', hint: 'Bravery in danger' },
                { word: 'BALANCE', hint: 'State of equilibrium' },
                { word: 'STUDENT', hint: 'Person who learns' },
                { word: 'DIAMOND', hint: 'Precious gem stone' },
                { word: 'PROBLEM', hint: 'Difficult situation' },
                { word: 'VICTORY', hint: 'Success in competition' },
                { word: 'PICTURE', hint: 'Visual representation' },
                { word: 'DESTINY', hint: 'Predetermined future' }
            ],
            hard: [
                { word: 'ALGORITHM', hint: 'Step-by-step procedure' },
                { word: 'CHEMISTRY', hint: 'Science of substances' },
                { word: 'BUTTERFLY', hint: 'Insect with colorful wings' },
                { word: 'TELESCOPE', hint: 'Device to see distant objects' },
                { word: 'ADVENTURE', hint: 'Exciting experience' },
                { word: 'BOULEVARD', hint: 'Wide city street' },
                { word: 'CHALLENGE', hint: 'Difficult task' },
                { word: 'FANTASTIC', hint: 'Extremely good' },
                { word: 'KNOWLEDGE', hint: 'Information and skills' },
                { word: 'MAGNITUDE', hint: 'Great size or extent' },
                { word: 'NIGHTMARE', hint: 'Frightening dream' },
                { word: 'ORCHESTRA', hint: 'Large musical ensemble' },
                { word: 'PERSEVERE', hint: 'Continue despite difficulty' },
                { word: 'RASPBERRY', hint: 'Small red berry' },
                { word: 'THRESHOLD', hint: 'Point of entry' }
            ]
        };

        // Game State
        let gameState = {
            difficulty: 'medium',
            currentWord: null,
            currentHint: null,
            score: 0,
            level: 1,
            streak: 0,
            bestStreak: 0,
            timer: 30,
            timerInterval: null,
            isGameActive: false,
            totalAttempts: 0,
            correctAttempts: 0,
            hintUsed: false,
            usedWords: []
        };

        // DOM Elements
        const startScreen = document.getElementById('startScreen');
        const gameBoard = document.getElementById('gameBoard');
        const scrambledWordEl = document.getElementById('scrambledWord');
        const hintTextEl = document.getElementById('hintText');
        const wordInput = document.getElementById('wordInput');
        const submitBtn = document.getElementById('submitBtn');
        const hintBtn = document.getElementById('hintBtn');
        const skipBtn = document.getElementById('skipBtn');
        const feedbackMessage = document.getElementById('feedbackMessage');
        const progressBar = document.getElementById('progressBar');
        const scoreValue = document.getElementById('scoreValue');
        const levelValue = document.getElementById('levelValue');
        const streakValue = document.getElementById('streakValue');
        const timerValue = document.getElementById('timerValue');
        const gameOverModal = document.getElementById('gameOverModal');
        const playAgainBtn = document.getElementById('playAgainBtn');
        const difficultyBtns = document.querySelectorAll('.difficulty-btn');

        // Initialize Particles
        function createParticles() {
            const particlesContainer = document.getElementById('particles');
            for (let i = 0; i < 20; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
                particle.style.animationDelay = Math.random() * 5 + 's';
                particlesContainer.appendChild(particle);
            }
        }

        // Scramble Word
        function scrambleWord(word) {
            const arr = word.split('');
            for (let i = arr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
            const scrambled = arr.join('');
            // Ensure scrambled word is different from original
            return scrambled === word ? scrambleWord(word) : scrambled;
        }

        // Get Timer Duration Based on Difficulty
        function getTimerDuration() {
            const baseTime = {
                easy: 45,
                medium: 30,
                hard: 20
            };
            return baseTime[gameState.difficulty] - Math.floor(gameState.level / 3);
        }

        // Load New Word
        function loadNewWord() {
            const wordPool = wordDatabase[gameState.difficulty];
            let wordObj;
            
            // Get a word that hasn't been used yet
            const availableWords = wordPool.filter(w => !gameState.usedWords.includes(w.word));
            
            if (availableWords.length === 0) {
                gameState.usedWords = [];
                wordObj = wordPool[Math.floor(Math.random() * wordPool.length)];
            } else {
                wordObj = availableWords[Math.floor(Math.random() * availableWords.length)];
            }
            
            gameState.currentWord = wordObj.word;
            gameState.currentHint = wordObj.hint;
            gameState.usedWords.push(wordObj.word);
            gameState.hintUsed = false;
            
            const scrambled = scrambleWord(gameState.currentWord);
            scrambledWordEl.textContent = scrambled;
            scrambledWordEl.classList.add('shuffle-animation');
            setTimeout(() => scrambledWordEl.classList.remove('shuffle-animation'), 600);
            
            hintTextEl.textContent = '';
            wordInput.value = '';
            wordInput.focus();
            
            // Reset timer
            clearInterval(gameState.timerInterval);
            gameState.timer = getTimerDuration();
            timerValue.textContent = gameState.timer;
            updateProgressBar();
            startTimer();
        }

        // Start Timer
        function startTimer() {
            gameState.timerInterval = setInterval(() => {
                gameState.timer--;
                timerValue.textContent = gameState.timer;
                updateProgressBar();
                
                if (gameState.timer <= 10) {
                    progressBar.classList.add('warning');
                }
                
                if (gameState.timer <= 0) {
                    clearInterval(gameState.timerInterval);
                    handleTimeout();
                }
            }, 1000);
        }

        // Update Progress Bar
        function updateProgressBar() {
            const maxTime = getTimerDuration();
            const percentage = (gameState.timer / maxTime) * 100;
            progressBar.style.width = percentage + '%';
        }

        // Handle Timeout
        function handleTimeout() {
            gameState.streak = 0;
            gameState.totalAttempts++;
            showFeedback(`Time's up! The word was ${gameState.currentWord}`, 'error');
            setTimeout(() => {
                if (gameState.score > 0) {
                    loadNewWord();
                } else {
                    endGame();
                }
            }, 2000);
        }

        // Show Feedback
        function showFeedback(message, type) {
            feedbackMessage.textContent = message;
            feedbackMessage.className = 'feedback-message show ' + type;
            setTimeout(() => {
                feedbackMessage.classList.remove('show');
            }, 2000);
        }

        // Submit Answer
        function submitAnswer() {
            const userAnswer = wordInput.value.trim().toUpperCase();
            
            if (!userAnswer) {
                showFeedback('Please enter a word!', 'error');
                return;
            }
            
            gameState.totalAttempts++;
            
            if (userAnswer === gameState.currentWord) {
                // Correct Answer
                gameState.correctAttempts++;
                gameState.streak++;
                if (gameState.streak > gameState.bestStreak) {
                    gameState.bestStreak = gameState.streak;
                }
                
                let points = 10;
                if (gameState.streak >= 3) points += 5;
                if (gameState.timer > getTimerDuration() / 2) points += 5;
                if (!gameState.hintUsed) points += 5;
                
                gameState.score += points;
                gameState.level = Math.floor(gameState.score / 50) + 1;
                
                wordInput.classList.add('correct');
                setTimeout(() => wordInput.classList.remove('correct'), 600);
                
                showFeedback(`Correct! +${points} points`, 'success');
                updateStats();
                
                setTimeout(() => loadNewWord(), 1500);
            } else {
                // Wrong Answer
                gameState.streak = 0;
                gameState.score = Math.max(0, gameState.score - 5);
                
                wordInput.classList.add('incorrect');
                setTimeout(() => wordInput.classList.remove('incorrect'), 500);
                
                showFeedback('Incorrect! Try again or skip', 'error');
                updateStats();
            }
        }

        // Show Hint
        function showHint() {
            if (!gameState.hintUsed) {
                gameState.hintUsed = true;
                gameState.score = Math.max(0, gameState.score - 5);
                hintTextEl.textContent = `💡 ${gameState.currentHint}`;
                updateStats();
                showFeedback('Hint revealed! -5 points', 'error');
            }
        }

        // Skip Word
        function skipWord() {
            gameState.streak = 0;
            gameState.totalAttempts++;
            showFeedback(`Skipped! The word was ${gameState.currentWord}`, 'error');
            setTimeout(() => loadNewWord(), 1500);
        }

        // Update Stats Display
        function updateStats() {
            scoreValue.textContent = gameState.score;
            levelValue.textContent = gameState.level;
            streakValue.textContent = gameState.streak;
        }

        // Start Game
        function startGame() {
            gameState.isGameActive = true;
            gameState.score = 0;
            gameState.level = 1;
            gameState.streak = 0;
            gameState.bestStreak = 0;
            gameState.totalAttempts = 0;
            gameState.correctAttempts = 0;
            gameState.usedWords = [];
            
            startScreen.classList.add('hidden');
            gameBoard.classList.remove('hidden');
            
            updateStats();
            loadNewWord();
        }

        // End Game
        function endGame() {
            gameState.isGameActive = false;
            clearInterval(gameState.timerInterval);
            
            const accuracy = gameState.totalAttempts > 0 
                ? Math.round((gameState.correctAttempts / gameState.totalAttempts) * 100)
                : 0;
            
            document.getElementById('finalScore').textContent = gameState.score;
            document.getElementById('wordsSolved').textContent = gameState.correctAttempts;
            document.getElementById('bestStreak').textContent = gameState.bestStreak;
            document.getElementById('accuracy').textContent = accuracy + '%';
            
            gameOverModal.classList.add('show');
        }

        // Event Listeners
        difficultyBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                difficultyBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                gameState.difficulty = btn.dataset.difficulty;
                
                if (!gameState.isGameActive) {
                    startGame();
                }
            });
        });

        submitBtn.addEventListener('click', submitAnswer);
        hintBtn.addEventListener('click', showHint);
        skipBtn.addEventListener('click', skipWord);

        wordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                submitAnswer();
            }
        });

        playAgainBtn.addEventListener('click', () => {
            gameOverModal.classList.remove('show');
            startGame();
        });

        // Initialize
        createParticles();