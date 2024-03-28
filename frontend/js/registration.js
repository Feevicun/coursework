users =[];
// Sample data for groups, departments, and teachers
const courseData = {
    1: {
        groups: ['ФЕІ-11с', 'ФЕІ-12с', 'ФЕІ-13с', 'ФЕІ-14с', 'ФЕІ-15с', 'ФЕІ-16с'],
        departments: ['System design', 'Radio physics and computer technologies', 'Radioelectronic and computer systems', 'Optoelectronics and information technologies'],
        teachers: {
            'System design': ['БУГРІЙ О.М.', 'КОМАН Б.П.', 'ПАВЛИШЕНКО Б.М.', 'АНОХІН В.Є.', 'ГЕРА О.Б.', 'ЛЯШКЕВИЧ В.Я.', 'СТАХІРА Р.Й.', 'ТКАЧЕНКО О.М.', 'ГУСАК О.В.', 'КАСЬКУН О.Д.', 'КРАСІЙ В.В.', 'КУЛИК П.Р.', 'ЛОГІН В.Б.', 'ЛОЗИНСЬКИЙ В.М.', 'МИСЮК Р.В.', 'ПАРУБОЧІЙ В.О.'],
            'Radio physics and computer technologies': ['ХВИЩУН І.О.', 'ВЕЛЬГОШ С.Р.', 'ЗЛОБІН Г.Г.', 'КАТЕРНЯК І.Б.', 'КУШНІР О.О.', 'РАБИК В.Г.', 'ДЗІКОВСЬКИЙ В.Є.', 'ЛЕВУШ П.Н.', 'РИКОВСЬКИЙ П.А.', 'ШЕВЧУК В.Д.', 'ШМИГЕЛЬСЬКИЙ Я.А.'],
            'Radioelectronic and computer systems': ['ОЛЕНИЧ І.Б.', 'БОЙКО Я.В.', 'СОКОЛОВСЬКИЙ Б.С.', 'ФЛЮНТ О.Є.', 'ПАВЛИК М.Р.', 'СІНЬКЕВИЧ О.О.', 'ФУТЕЙ О.В.', 'ГУРА В.Т.'],
            'Optoelectronics and information technologies': ['КУШНІР О.С.', 'СВЕЛЕБА С.А.', 'ГРАБОВСЬКИЙ В.А.', 'КОРЧАК Ю.М.', 'ФУРГАЛА Ю.М.', 'ГОРОН Б.І.', 'ФЕДОРОВИЧ І.С.'],
        },
    },
    2: {
        groups: ['ФЕІ-21с', 'ФЕІ-22с', 'ФЕІ-23с', 'ФЕІ-24с', 'ФЕІ-25с', 'ФЕІ-26с'],
        departments: ['System design', 'Radio physics and computer technologies', 'Radioelectronic and computer systems', 'Optoelectronics and information technologies'],
        teachers: {
            'System design': ['БУГРІЙ О.М.', 'КОМАН Б.П.', 'ПАВЛИШЕНКО Б.М.', 'АНОХІН В.Є.', 'ГЕРА О.Б.', 'ЛЯШКЕВИЧ В.Я.', 'СТАХІРА Р.Й.', 'ТКАЧЕНКО О.М.', 'ГУСАК О.В.', 'КАСЬКУН О.Д.', 'КРАСІЙ В.В.', 'КУЛИК П.Р.', 'ЛОГІН В.Б.', 'ЛОЗИНСЬКИЙ В.М.', 'МИСЮК Р.В.', 'ПАРУБОЧІЙ В.О.'],
            'Radio physics and computer technologies': ['ХВИЩУН І.О.', 'ВЕЛЬГОШ С.Р.', 'ЗЛОБІН Г.Г.', 'КАТЕРНЯК І.Б.', 'КУШНІР О.О.', 'РАБИК В.Г.', 'ДЗІКОВСЬКИЙ В.Є.', 'ЛЕВУШ П.Н.', 'РИКОВСЬКИЙ П.А.', 'ШЕВЧУК В.Д.', 'ШМИГЕЛЬСЬКИЙ Я.А.'],
            'Radioelectronic and computer systems': ['ОЛЕНИЧ І.Б.', 'БОЙКО Я.В.', 'СОКОЛОВСЬКИЙ Б.С.', 'ФЛЮНТ О.Є.', 'ПАВЛИК М.Р.', 'СІНЬКЕВИЧ О.О.', 'ФУТЕЙ О.В.', 'ГУРА В.Т.'],
            'Optoelectronics and information technologies': ['КУШНІР О.С.', 'СВЕЛЕБА С.А.', 'ГРАБОВСЬКИЙ В.А.', 'КОРЧАК Ю.М.', 'ФУРГАЛА Ю.М.', 'ГОРОН Б.І.', 'ФЕДОРОВИЧ І.С.'],
        },
    },
    3: {
        groups: ['ФЕІ-31с', 'ФЕІ-32с', 'ФЕІ-33с', 'ФЕІ-34с'],
        departments: ['System design', 'Radio physics and computer technologies', 'Radioelectronic and computer systems', 'Optoelectronics and information technologies'],
        teachers: {
            'System design': ['БУГРІЙ О.М.', 'КОМАН Б.П.', 'ПАВЛИШЕНКО Б.М.', 'АНОХІН В.Є.', 'ГЕРА О.Б.', 'ЛЯШКЕВИЧ В.Я.', 'СТАХІРА Р.Й.', 'ТКАЧЕНКО О.М.', 'ГУСАК О.В.', 'КАСЬКУН О.Д.', 'КРАСІЙ В.В.', 'КУЛИК П.Р.', 'ЛОГІН В.Б.', 'ЛОЗИНСЬКИЙ В.М.', 'МИСЮК Р.В.', 'ПАРУБОЧІЙ В.О.'],
            'Radio physics and computer technologies': ['ХВИЩУН І.О.', 'ВЕЛЬГОШ С.Р.', 'ЗЛОБІН Г.Г.', 'КАТЕРНЯК І.Б.', 'КУШНІР О.О.', 'РАБИК В.Г.', 'ДЗІКОВСЬКИЙ В.Є.', 'ЛЕВУШ П.Н.', 'РИКОВСЬКИЙ П.А.', 'ШЕВЧУК В.Д.', 'ШМИГЕЛЬСЬКИЙ Я.А.'],
            'Radioelectronic and computer systems': ['ОЛЕНИЧ І.Б.', 'БОЙКО Я.В.', 'СОКОЛОВСЬКИЙ Б.С.', 'ФЛЮНТ О.Є.', 'ПАВЛИК М.Р.', 'СІНЬКЕВИЧ О.О.', 'ФУТЕЙ О.В.', 'ГУРА В.Т.'],
            'Optoelectronics and information technologies': ['КУШНІР О.С.', 'СВЕЛЕБА С.А.', 'ГРАБОВСЬКИЙ В.А.', 'КОРЧАК Ю.М.', 'ФУРГАЛА Ю.М.', 'ГОРОН Б.І.', 'ФЕДОРОВИЧ І.С.'],
        },
    },
    4: {
        groups: ['ФЕІ-41с', 'ФЕІ-42с', 'ФЕІ-43с', 'ФЕІ-44с'],
        departments: ['System design', 'Radio physics and computer technologies', 'Radioelectronic and computer systems', 'Optoelectronics and information technologies'],
        teachers: {
            'System design': ['БУГРІЙ О.М.', 'КОМАН Б.П.', 'ПАВЛИШЕНКО Б.М.', 'АНОХІН В.Є.', 'ГЕРА О.Б.', 'ЛЯШКЕВИЧ В.Я.', 'СТАХІРА Р.Й.', 'ТКАЧЕНКО О.М.', 'ГУСАК О.В.', 'КАСЬКУН О.Д.', 'КРАСІЙ В.В.', 'КУЛИК П.Р.', 'ЛОГІН В.Б.', 'ЛОЗИНСЬКИЙ В.М.', 'МИСЮК Р.В.', 'ПАРУБОЧІЙ В.О.'],
            'Radio physics and computer technologies': ['ХВИЩУН І.О.', 'ВЕЛЬГОШ С.Р.', 'ЗЛОБІН Г.Г.', 'КАТЕРНЯК І.Б.', 'КУШНІР О.О.', 'РАБИК В.Г.', 'ДЗІКОВСЬКИЙ В.Є.', 'ЛЕВУШ П.Н.', 'РИКОВСЬКИЙ П.А.', 'ШЕВЧУК В.Д.', 'ШМИГЕЛЬСЬКИЙ Я.А.'],
            'Radioelectronic and computer systems': ['ОЛЕНИЧ І.Б.', 'БОЙКО Я.В.', 'СОКОЛОВСЬКИЙ Б.С.', 'ФЛЮНТ О.Є.', 'ПАВЛИК М.Р.', 'СІНЬКЕВИЧ О.О.', 'ФУТЕЙ О.В.', 'ГУРА В.Т.'],
            'Optoelectronics and information technologies': ['КУШНІР О.С.', 'СВЕЛЕБА С.А.', 'ГРАБОВСЬКИЙ В.А.', 'КОРЧАК Ю.М.', 'ФУРГАЛА Ю.М.', 'ГОРОН Б.І.', 'ФЕДОРОВИЧ І.С.'],
        },
    },
};

const totalStudents = 140;

const totalDepartments = Object.keys(courseData).length;

const studentsPerDepartment = Math.floor(totalStudents / totalDepartments);
let studentsPerTeacher;

let availableSeatsInDepartments = {};
let availableSeatsInTeachers = {};

let teachersPerStudentWithinDepartment;

const updateFreeSeatsCount = (elementId, category, name) => {
    const element = document.getElementById(elementId);

    if (category === 'department' && name) {
        const relevantNumber = availableSeatsInDepartments[name];
    
        element.textContent = `Free Seats: ${relevantNumber ?? studentsPerDepartment ?? 0}`;
    } else if (category === 'teacher' && name) {
        element.textContent = `Free Seats: ${availableSeatsInTeachers[name] ?? teachersPerStudentWithinDepartment ?? 0}`;
    }
}

const updateAvailableDepartments = async () => {
    const res = await fetch('/students', { cache: "no-cache" });

    const allStudents = (await res.json()).students || [];
    
    console.log(allStudents);

    availableSeatsInDepartments = {};

    for (const student of allStudents) {
        if (!student.department) continue;

        // Update department available seats
        if (typeof availableSeatsInDepartments[student.department] === 'undefined') {
            availableSeatsInDepartments[student.department] = studentsPerDepartment - 1;
        } else {
            availableSeatsInDepartments[student.department] -= 1;
        }
    }
}

const updateAvailableTeachers = async () => {
    const res = await fetch('/students', { cache: "no-cache" });

    const allStudents = (await res.json()).students || [];

    availableSeatsInTeachers = {};

    for (const student of allStudents) {
        if (!student.teacher) continue;

        // Update department available seats
        if (typeof availableSeatsInTeachers[student.teacher] === 'undefined') {
            availableSeatsInTeachers[student.teacher] = teachersPerStudentWithinDepartment - 1;
        } else {
            availableSeatsInTeachers[student.teacher] -= 1;
        }
    }
}

updateAvailableDepartments();

async function sendRequest(url, data) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const jsonData = await response.json();
            console.log('Відповідь від серверу:', jsonData);
            alert('Реєстрація пройшла успішно!');

            updateAvailableDepartments();
            
            window.location.href = 'poster.html';
        } else {
            const errorResponse = await response.json();
            console.error('Помилка відповіді від сервера:', errorResponse);
            alert('Під час реєстрації сталася помилка: ' + errorResponse.error);
        }
    } catch (error) {
        console.error('Сталася помилка під час відправлення запиту:', error);
        alert('Під час реєстрації сталася помилка: ' + error.message);
    }
}

const checkAvailableSeats = () => {
    const teachersLeft = +document.getElementById('teacherSeats').textContent.replace ( /[^\d.]/g, '' );

    const departmentSeatsLeft = +document.getElementById('departmentSeats').textContent.replace ( /[^\d.]/g, '' );

    if (departmentSeatsLeft <= 0) {
        alert('Немає вільних місць на кафедрі');
        throw new Error('Немає вільних місць на кафедрі');
    }

    if (teachersLeft <= 0) {
        alert('Немає вільних місць у викладача');
        throw new Error('Немає вільних місць у викладача');
    }
};

const registrationForm = document.querySelector('form');

registrationForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    availableSeatsInDepartments = {};
    availableSeatsInTeachers = {};

    // Отримання значень полів форми
    const surname = document.querySelector('input[name="surname"]').value;
    const firstName = document.querySelector('input[name="firstName"]').value;
    const course = document.querySelector('select[name="course"]').value;
    const group = document.querySelector('select[name="group"]').value;
    const department = document.querySelector('select[name="department"]').value;
    const teacher = document.querySelector('select[name="teacher"]').value;

    // Створення об'єкта formData
    const formData = {
        surname,
        firstName,
        course,
        group,
        department,
        teacher
    };

    try {
        checkAvailableSeats();

        await sendRequest('/registration', formData);
    } catch (error) {
        console.error('Помилка під час реєстрації:', error);
    }
});

// Function to initialize dropdowns with filtering and search
function initializeDropdownWithFilterAndSearch(selectId, inputId, data) {
    const select = document.getElementById(selectId);
    const input = document.getElementById(inputId);

    input.addEventListener('input', () => {
        const inputValue = input.value.toLowerCase();
        select.innerHTML = '';

        // Add options that match the input value
        data.forEach(option => {
            if (option.toLowerCase().includes(inputValue)) {
                const optionElement = document.createElement('option');
                optionElement.value = option;
                optionElement.textContent = option;
                select.appendChild(optionElement);
            }
        });
    });

    select.addEventListener('change', () => {
        input.style.display = select.value === 'other' ? 'block' : 'none';
        if (select.value === 'other') {
            input.focus();
        }
    });
}

// Function to populate departments based on the selected course
function populateDepartments(courseId) {
    const departmentSelect = document.getElementById('department');
    const courseDataForSelectedCourse = courseData[courseId];

    departmentSelect.innerHTML = '';
    departmentSelect.innerHTML += '<option value="" disabled selected>Select Department</option>';
    departmentSelect.innerHTML += '<option value="other">Other</option>';

    courseDataForSelectedCourse.departments.forEach(department => {
        departmentSelect.innerHTML += `<option value="${department}">${department}</option>`;
    });
}
// Function to populate groups based on the selected course
function populateGroups(courseId) {
    const groupSelect = document.getElementById('group');
    const courseDataForSelectedCourse = courseData[courseId];

    groupSelect.innerHTML = '';
    groupSelect.innerHTML += '<option value="" disabled selected>Select Group</option>';
    groupSelect.innerHTML += '<option value="other">Other</option>';

    courseDataForSelectedCourse.groups.forEach(group => {
        groupSelect.innerHTML += `<option value="${group}">${group}</option>`;
    });
}

// Function to populate teachers based on the selected department
function populateTeachers(departmentName) {
    const teacherSelect = document.getElementById('teacher');
    const courseDataForSelectedCourse = courseData[document.getElementById('course').value];

    teacherSelect.innerHTML = '';
    teacherSelect.innerHTML += '<option value="" disabled selected>Select Teacher</option>';
    teacherSelect.innerHTML += '<option value="other">Other</option>';

    if (courseDataForSelectedCourse.teachers[departmentName]) {
        courseDataForSelectedCourse.teachers[departmentName].forEach(teacher => {
            teacherSelect.innerHTML += `<option value="${teacher}">${teacher}</option>`;
        });
    }
}

// Attach event listeners to initialize the dropdowns with filtering and search
initializeDropdownWithFilterAndSearch('groupInput', 'group', []);
initializeDropdownWithFilterAndSearch('departmentInput', 'department', []);
initializeDropdownWithFilterAndSearch('teacherInput', 'teacher', []);

// Attach event listener to populate departments based on the selected course
const courseSelect = document.getElementById('course');

courseSelect.addEventListener('change', () => {
    const selectedCourse = courseSelect.value;
    populateDepartments(selectedCourse);
    populateGroups(selectedCourse); // Populate groups
});

// Attach event listener to populate teachers based on the selected department
const departmentSelect = document.getElementById('department');

departmentSelect.addEventListener('change', () => {
    const selectedDepartment = departmentSelect.value;
    populateTeachers(selectedDepartment);

    // Calculate studentsPerTeacher based on the selected department
    const courseSelect = document.getElementById('course');
    const courseId = courseSelect.value;
    const teachersInDepartment = courseData[courseId].teachers[selectedDepartment].length;

    studentsPerTeacher = Math.floor(studentsPerDepartment / teachersInDepartment);

    teachersPerStudentWithinDepartment = studentsPerTeacher;

    document.getElementById('teacherSeats').textContent = `Free Seats: 0`;
    
    updateAvailableDepartments();
    updateFreeSeatsCount('departmentSeats', 'department', selectedDepartment);
});

const teacherSelect = document.getElementById('teacher');

teacherSelect.addEventListener('change', async (e) => {
    await updateAvailableTeachers();

    updateFreeSeatsCount('teacherSeats', 'teacher', e.target.value);
});