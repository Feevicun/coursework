require('./db')
const users = []; 
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const flash = require('express-flash');
const session = require('express-session');
const bcrypt = require('bcrypt');
const http = require('http'); 

const User = require('./models/UserSchema');
const Student = require('./models/StudentSchema');
const Teacher = require('./models/TeacherSchema');
const LoginEvent = require('./models/LoginEventSchema');

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server); 
const port = process.env.PORT || 4000;

// middlewares
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
app.use(bodyParser.json());
app.use(flash());
app.use(express.static(path.join(__dirname, 'frontend')));
app.use('/css', express.static(path.join(__dirname, 'frontend', 'css')));
app.use('/js', express.static(path.join(__dirname, 'frontend', 'js')));


// html pages
app.get('/authorization', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'authorization.html'));
});

app.get('/loading', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'loading.html'));
});

app.get('/registration', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'registration.html'));
});

app.get('/delete', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'forger-password.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'loading.html'));
});


// endpoints
app.post('/registration', async (req, res) => {
    try {
        const { surname, firstName, course, group, department, teacher } = req.body;

        const newStudent = new Student({
            firstName,
            surname,
            course,
            group,
            department,
            teacher
        });

        await newStudent.save();

        res.status(200).json({ message: 'Student registration successful' });
    } catch (error) {
        console.error('Student registration error:', error);
        res.status(500).json({ error: 'Student registration failed. Please try again later.' });
    }
});

app.get('/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.json({ students });
    } catch (error) {
        console.error('Error fetching students:', error);

        res.status(500).json({ error: 'Error fetching students.' });
    }
});

app.post('/delete-account', async (req, res) => {
    const { email, role } = req.body;

    const collection = role === 'teacher' ? Teacher : User;

    try {
        const result = await collection.deleteOne({ email });

        if (result.deletedCount === 0) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        res.json({ message: 'User account has been successfully deleted.' });
    } catch (error) {
        console.error('Error deleting user account:', error);
        res.status(500).json({ error: 'Error deleting user account. Please try again later.' });
    }
});

app.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body;

    if (role !== 'teacher' && role !== 'student') {
        res.status(400).json({ error: 'Invalid role. Must be "teacher" or "student".' });
        return;
    }
    if (role === 'teacher' && !email.endsWith('@lnu.edu.ua')) {
        res.status(400).json({ error: 'Invalid email address. You can only register with an @lnu.edu.ua email address.' });
        return;
    }
    try {
        const existingUser = await (role === 'teacher' ? Teacher : User).findOne({ email });

        if (existingUser) {
            res.status(400).json({ error: 'Email address is already registered.' });
            return;
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        if (role === 'teacher') {
            const newTeacher = new Teacher({
                name,
                email,
                password: hashedPassword,
                role,
            });

            await newTeacher.save();
            console.log('Teacher registered successfully:', newTeacher);
        } else {

            if (!email.endsWith('@lnu.edu.ua')) {
                res.status(400).json({ error: 'Invalid email address for students. You can only register with an @students.lnu.edu.ua email address.' });
                return;
            }
            const newStudent = new User({
                name,
                email,
                password: hashedPassword,
            });

            await newStudent.save();

            const { firstName, surname, course, group, department, teacher } = req.body;

            const newPoster = new Student({ firstName, surname, course, group, department, teacher });
            await newPoster.save();
            console.log('Student registered successfully:', newStudent);
        }
        res.status(200).json({ message: 'Registration Successful' });
    } catch (error) {
        console.error('Registration failed:', error);
        res.status(500).json({ error: 'Registration failed. Please try again later.' });
    }
});

app.post('/login', async (req, res) => {
    const { email, password, role } = req.body;

    try {
        let user;

        if (role === 'student') {
            user = await User.findOne({ email });
        } else if (role === 'teacher') {
            user = await Teacher.findOne({ email });
        } else {
            res.status(400).json({ error: 'Invalid role. Must be "teacher" or "student".' });
            return;
        }

        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        const loginEvent = new LoginEvent({ userId: user._id });
        await loginEvent.save();

        if (role === 'student') {
            res.status(200).json({ message: 'Student login successful' });
        } else if (role === 'teacher') {
            res.status(200).json({ message: 'Teacher login successful' });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
});

app.delete('/students/:id', async (req, res) => {
    const studentId = req.params.id;

    try {
        await Student.findByIdAndDelete(studentId).exec();
    
        res.status(200).json({ message: 'Student has been successfully deleted' });
    } catch (error) {
        console.error('Error deleting student:', error);
        res.status(500).json({ error: 'Error deleting student. Please try again later.' });
    }
});

// Socket.io handling
io.sockets.on('connection', function (socket) {
    socket.on('login', function (nickname) {
        if (users.indexOf(nickname) > -1) {
            socket.emit('nickExisted');
        } else {
            socket.nickname = nickname;
            users.push(nickname);
            socket.emit('loginSuccess');
            io.sockets.emit('system', nickname, users.length, 'login');
        }
    });

    socket.on('disconnect', function () {
        if (socket.nickname != null) {
            users.splice(users.indexOf(socket.nickname), 1);
            socket.broadcast.emit('system', socket.nickname, users.length, 'logout');
        }
    });

    socket.on('postMsg', function (msg, color) {
        socket.broadcast.emit('newMsg', socket.nickname, msg, color);
    });

    socket.on('img', function (imgData, color) {
        socket.broadcast.emit('newImg', socket.nickname, imgData, color);
    });
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
