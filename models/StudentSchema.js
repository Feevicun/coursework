const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
	firstName: String,
	surname: String,
	course: Number,
	group: String,
	department: String,
	teacher: String,
});

module.exports = mongoose.model('Student', studentSchema);