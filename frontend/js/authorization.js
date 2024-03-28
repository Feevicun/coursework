// Select elements
const loginTab = document.getElementById('loginTab');
const registerTab = document.getElementById('registerTab');
const loginForm = document.querySelector('.login-form');
const registerForm = document.querySelector('.register-form');
const bar = document.querySelector('.bar');
const userRoleSelect = document.getElementById('userRole');
const registerName = document.getElementById('registerName');
const registerEmail = document.getElementById('registerEmail');
const registerPassword = document.getElementById('registerPassword');
const loginEmail = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPassword');

// Function to switch to the login form
function switchToLogin() {
    loginTab.classList.add('active');
    registerTab.classList.remove('active');
    loginForm.classList.add('active');
    registerForm.classList.remove('active');
    bar.style.left = '0%';
}

// Function to switch to the registration form
function switchToRegister() {
    registerTab.classList.add('active');
    loginTab.classList.remove('active');
    registerForm.classList.add('active');
    loginForm.classList.remove('active');
    bar.style.left = '50%';
}

// Function to handle user role selection
function handleUserRoleChange() {
    const selectedRole = userRoleSelect.value;
    console.log('Selected User Role:', selectedRole);
}

userRoleSelect.addEventListener('change', handleUserRoleChange);

// Function to send a request using Fetch
async function sendRequest(url, data) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Request failed with status: ' + response.status);
        }

        return response;
    } catch (error) {
        console.error('Error during request:', error);
        throw error;
    }
}



async function handleRegisterSubmit() {
    const name = registerName.value;
    const email = registerEmail.value;
    const password = registerPassword.value;
    const role = userRoleSelect.value;

    if (!email.endsWith('lnu.edu.ua')) {
        alert('Дозволено реєстрацію тільки для адрес lnu.edu.ua');
        
        return;
    }

    if (role !== 'teacher' && role !== 'student') {
        alert('Invalid role. Must be "teacher" or "student".');
        return;
    }

    try {
        const checkEmailResponse = await fetch('/checkEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        if (checkEmailResponse.ok) {
            const emailExistsResponse = await checkEmailResponse.json();
            if (emailExistsResponse.exists) {
                alert('Email address is already registered. Please use a different email.');
                return;
            }
        }

        const registerURL = '/register';

        const response = await sendRequest(registerURL, { name, email, password, role });

        if (response.ok) {
            console.log('Registration successful');
            if (role === 'teacher') {
                window.location.href = '/poster.html';
            } else {
                window.location.href = '/registration.html';
            }
        } else {
            console.error('Registration failed');
        }
    } catch (error) {
        console.error('Error during registration request:', error);
    }
}


// Add an event listener for the registration submission
const registerSubmit = document.getElementById('registerSubmit');
registerSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    handleRegisterSubmit();
});

// Add event listeners for switching between forms
loginTab.addEventListener('click', switchToLogin);
registerTab.addEventListener('click', switchToRegister);

// Отримуємо посилання на HTML-елемент, де буде відображатися повідомлення про помилку
const errorElement = document.getElementById('error-message');

// Під час натискання кнопки "Зареєструватись"
registerSubmit.addEventListener('click', async (e) => {
    e.preventDefault();
    errorElement.textContent = ''; // Очищення попереднього повідомлення про помилку

    // Отримуємо значення введених даних
    const name = registerName.value;
    const email = registerEmail.value;
    const password = registerPassword.value;
    const role = userRoleSelect.value;

    try {
        // Відправляємо запит на сервер для реєстрації
        const response = await sendRequest('/register', { name, email, password, role });

        if (response.ok) {
            console.log('Registration successful');
            // Виконуємо дії для успішної реєстрації, наприклад, перенаправлення користувача
            if (role === 'teacher') {
                window.location.href = '/poster.html';
            } else {
                window.location.href = '/registration.html';
            }
        } else {
            const errorResponse = await response.json();
            if (errorResponse.error === 'Email address is already registered.') {
                errorElement.textContent = 'Email address is already registered. Please use a different email.';
            }
        }
    } catch (error) {
        console.error('Error during registration request:', error);
        errorElement.textContent = 'Registration failed. Please try again later.';
    }
});

// Function to handle user login
async function handleLoginSubmit() {
    const email = loginEmail.value;
    const password = loginPassword.value;
    const role = userRoleSelect.value;

    if (!email.endsWith('lnu.edu.ua')) {
        alert('Дозволено логін тільки для адрес lnu.edu.ua');
        return;
    }

    try {
        const response = await sendRequest('/login', { email, password, role });

        if (response.ok) {
            console.log('Login successful');
            if (role === 'teacher') {
                // Якщо користувач є викладачем, перенаправити його на сторінку викладача
                window.location.href = '/poster.html';
            } else {
                // В іншому випадку перенаправити на сторінку студента
                window.location.href = '/registration.html';
            }
        } else {
            const errorResponse = await response.json();
            if (errorResponse.error === 'User not found') {
                alert('User not found. Please check your credentials or register.');
            } else if (errorResponse.error === 'Invalid credentials') {
                alert('Invalid credentials. Please check your email and password.');
            } else {
                console.error('Login failed');
            }
        }
    } catch (error) {
        console.error('Error during login request:', error);
    }
}


// Add an event listener for the login submission
const loginSubmit = document.getElementById('loginSubmit');
loginSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    handleLoginSubmit();
});
