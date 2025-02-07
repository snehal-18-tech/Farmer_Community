// Function to register a user
function registerUser() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const userData = { username, email, password };

    fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message); 
        if (data.success) { 
            window.location.href = 'login.html'; 
        }
    })
    .catch(error => {
        console.error('Error registering user:', error);
    });
}

// Function to load user name after login
function loadUserName() {
    const accountName = document.getElementById('accountName');
    const userName = localStorage.getItem('userName'); 

    if (userName) {
        accountName.innerText = userName;  
    } else {
        accountName.innerText = "Guest";  
    }
}

// Function to log the user out
function logout() {
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    localStorage.removeItem('token');  
    window.location.href = 'login.html';
}

// Function to post a question
function postQuestion() {
    const questionContent = document.getElementById('questionContent').value;
    const authorId = localStorage.getItem('userId');  // Ensure userId is in localStorage

    // Validate that both content and authorId are available
    if (!questionContent || !authorId) {
        alert('Please enter a question and make sure you are logged in.');
        return;
    }

    const questionData = {
        author: authorId, // Matches the backend field
        content: questionContent,
        category: 'General'  // Add or change category if needed
    };

    console.log('Sending question data:', questionData);  // Debugging log

    fetch('http://localhost:5000/api/community/post-question', { // Check URL
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(questionData)
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(data => {
                throw new Error(data.message || 'Failed to post question');
            });
        }
        return response.json();
    })
    .then(data => {
        alert(data.message);
        document.getElementById('questionContent').value = '';  // Clear the textarea
        fetchQuestions();  // Reload questions
    })
    .catch(error => {
        console.error('Error posting question:', error);
        alert('Error posting question: ' + error.message);
    });
}


// Function to fetch and display questions
function fetchQuestions() {
    fetch('http://localhost:5000/api/community/questions')
    .then(response => response.json())
    .then(questions => {
        console.log(questions);  // Debugging line
        const questionList = document.getElementById('questions');
        questionList.innerHTML = ''; 

        questions.forEach(question => {
            const listItem = document.createElement('li');
            listItem.setAttribute('data-question-id', question._id);

            // Check if author is defined and has a username
            const authorUsername = question.author && question.author.username ? question.author.username : 'Unknown Author';

            listItem.innerHTML = `
                <div class="question-header">
                    <i class="fa fa-arrow-down toggle-arrow" aria-hidden="true" onclick="toggleAnswers('${question._id}')"></i> 
                    <strong>${authorUsername}</strong>: ${question.content}
                    <button onclick="postAnswer('${question._id}')">Reply</button>
                </div>
                <div class="answers-section" id="answers-${question._id}" style="display: none;">
                    <!-- Answers will be dynamically added here -->
                </div>
            `;

            questionList.appendChild(listItem);
        });
    })
    .catch(error => {
        console.error('Error fetching questions:', error);
        // Optionally, display an error message in the UI
        const questionList = document.getElementById('questions');
        questionList.innerHTML = '<p>Error loading questions. Please try again later.</p>';
    });
}

function toggleAnswers(questionId) {
    const answersSection = document.getElementById(`answers-${questionId}`);
    const arrowIcon = document.querySelector(`[onclick="toggleAnswers('${questionId}')"]`);

    if (answersSection.style.display === 'none') {
        answersSection.style.display = 'block'; 
        arrowIcon.classList.remove('fa-arrow-down');
        arrowIcon.classList.add('fa-arrow-up');
        fetchAnswers(questionId); 
    } else {
        answersSection.style.display = 'none'; 
        arrowIcon.classList.remove('fa-arrow-up');
        arrowIcon.classList.add('fa-arrow-down');
    }
}

function toggleLoginLogout() {
    const loginLogoutLink = document.querySelector('nav ul a[href="#"]');
    const userId = localStorage.getItem('userId');

    if (userId) {
        loginLogoutLink.textContent = 'Logout'; 
        loginLogoutLink.setAttribute('onclick', 'logout()');
    } else {
        loginLogoutLink.textContent = 'Login'; 
        loginLogoutLink.setAttribute('href', 'login.html');
    }
}

function fetchAnswers(questionId) {
    fetch(`http://localhost:5000/api/community/answers/${questionId}`)
    .then(response => response.json())
    .then(answers => {
        const answersSection = document.getElementById(`answers-${questionId}`);
        answersSection.innerHTML = ''; // Clear existing answers

        if (!Array.isArray(answers)) {
            console.error('Expected an array of answers but received:', answers);
            answersSection.innerHTML = '<p>Unable to load answers. Please try again later.</p>';
            return;
        }

        if (answers.length === 0) {
            answersSection.innerHTML = '<p>No answers yet.</p>';
        } else {
            answers.forEach(answer => {
                const answerItem = document.createElement('div');
                answerItem.classList.add('answer-item');
                answerItem.innerHTML = `
                    <i class="fa fa-arrow-right" aria-hidden="true"></i>
                    <span>${answer.author.username}: ${answer.content}</span>
                `;
                answersSection.appendChild(answerItem);
            });
        }
    })
    .catch(error => {
        console.error('Error fetching answers:', error);
    });
}


function postAnswer(questionId) {
    const answerContent = prompt('Enter your answer:'); 

    if (!answerContent) {
        alert('Please enter an answer');
        return;
    }

    const answerData = {
        authorId: localStorage.getItem('userId'), 
        questionId: questionId,
        content: answerContent
    };

    fetch('http://localhost:5000/api/community/post-answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(answerData)
    })
    .then(response => response.json())
    .then(data => {
        alert('Answer posted successfully!');
        fetchQuestions(); 
    })
    .catch(error => {
        console.error('Error posting answer:', error);
    });
}

// Automatically load user info and fetch questions when the page loads
window.onload = function() {
    loadUserName();
    toggleLoginLogout();
    fetchQuestions();
};
// Function to redirect to the specified page
function redirectToPage(pageName) {
    // Assuming the pages are in the same directory as the current HTML file
    window.location.href = pageName; 
}

