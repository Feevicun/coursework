// Функція для отримання студентів з сервера
async function getStudents() {
    try {
        const response = await fetch('http://localhost:4000/students');
        if (!response.ok) {
            throw new Error('Помилка отримання даних');
        }
        const data = await response.json();
        return data.students;
    } catch (error) {
        console.error('Помилка отримання даних з сервера:', error);
        return [];
    }
}

// Функція для відображення студентів на сторінці
async function displayStudents() {
    try {
        const studentsData = await getStudents();
        const postersContainer = document.querySelector('.posters-container');
        postersContainer.innerHTML = ''; // Очищення контейнера перед відображенням нових постерів

        for (const student of studentsData) {
            const poster = createPoster(student, postersContainer);
            postersContainer.appendChild(poster);
        }
    } catch (error) {
        console.error('Помилка відображення студентів:', error);
    }
}

// Створення постера з інформацією про студента
function createPoster(student, postersContainer) {
    const poster = document.createElement('div');
    poster.classList.add('poster');
    poster.dataset.studentId = student._id; // Використовуйте правильний _id

    const deleteButtonContainer = document.createElement('div');
    deleteButtonContainer.className = 'delete-button-container';
    poster.appendChild(deleteButtonContainer);

    const deleteButton = document.createElement('div');
    deleteButton.className = 'delete-button';
    deleteButton.textContent = '×';
    deleteButtonContainer.appendChild(deleteButton);

    const name = document.createElement('h2');
    name.textContent = student.firstName + ' ' + student.surname;
    poster.appendChild(name);

    const details = document.createElement('div');
    details.classList.add('details');
    details.style.display = 'none';
    poster.appendChild(details);

    const course = document.createElement('p');
    course.textContent = 'Course: ' + student.course;
    details.appendChild(course);

    const group = document.createElement('p');
    group.textContent = 'Group: ' + student.group;
    details.appendChild(group);

    const department = document.createElement('p');
    department.textContent = 'Department: ' + student.department;
    details.appendChild(department);

    const teacher = document.createElement('p');
    teacher.textContent = 'Teacher: ' + student.teacher;
    details.appendChild(teacher);

    poster.addEventListener('click', () => {
        toggleInfo(details);
        poster.classList.toggle('expanded');
        document.body.classList.toggle('blurred');
        postersContainer.classList.toggle('blurred');
    });

    deleteButton.addEventListener('click', async () => {
        const studentId = student._id; // Використовуйте правильний _id

        try {
            const response = await fetch(`http://localhost:4000/students/${studentId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                poster.remove();
            } else {
                console.error('Помилка видалення студента');
            }
        } catch (error) {
            console.error('Помилка видалення студента:', error);
        }
    });

    return poster;
}

// Функція для перемикача відображення повної інформації
function toggleInfo(details) {
    if (details.style.display === 'none' || details.style.display === '') {
        details.style.display = 'block';
    } else {
        details.style.display = 'none';
    }
}

// Обробка пошуку за прізвищем
const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const posters = document.querySelectorAll('.poster');

    posters.forEach(poster => {
        const name = poster.querySelector('h2').textContent.toLowerCase();

        if (name.includes(searchTerm)) {
            poster.style.display = 'block';
        } else {
            poster.style.display = 'none';
        }
    });
});

// Закриття розгорнутих постерів при натисканні будь-де на сторінці
document.addEventListener('click', (event) => {
    if (!event.target.closest('.poster.expanded')) {
        const expandedPosters = document.querySelectorAll('.poster.expanded');
        expandedPosters.forEach((expandedPoster) => {
            const details = expandedPoster.querySelector('.details');
            toggleInfo(details);
            expandedPoster.classList.remove('expanded');
            document.body.classList.remove('blurred');
        });
    }
});

// Виклик функції для відображення студентів на сторінці
displayStudents();
