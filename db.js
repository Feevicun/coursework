const mongoose = require('mongoose');

async function connectWithRetry() {
	const mongoURI = 'mongodb+srv://Feevicun17:Vikander29@cluster0.ex9umg4.mongodb.net/';

	try {
			await mongoose.connect(mongoURI, {
					useNewUrlParser: true,
					useUnifiedTopology: true,
			});
			console.log('Connected to MongoDB');
	} catch (err) {
			console.error('Error connecting to MongoDB:', err.message);
			setTimeout(connectWithRetry, 5000);
	}
}

connectWithRetry();