document.getElementById('delete-account-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const role = document.getElementById('role').value;

    try {
        const response = await fetch('/delete-account', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, role }),
        });

        if (response.status === 200) {
            // Handle success
            const successMessageContainer = document.getElementById('success-message');
            const errorMessageContainer = document.getElementById('error-message');
            
            // Hide the error message if it's currently displayed
            errorMessageContainer.style.display = 'none';

            const successMessageText = document.getElementById('success-message-text');
            successMessageText.textContent = 'Account has been successfully deleted.';

            // Display the success message
            successMessageContainer.style.display = 'block';

            // Optionally, clear the form or perform any other actions
            document.getElementById('email').value = '';
            document.getElementById('role').value = ''; // Clear the role input

        } else {
            // Handle errors
            const errorMessageContainer = document.getElementById('error-message');
            const successMessageContainer = document.getElementById('success-message');

            // Hide the success message if it's currently displayed
            successMessageContainer.style.display = 'none';

            const errorMessageText = document.getElementById('error-message-text');
            errorMessageText.textContent = 'Error deleting the account. Please try again.';

            // Display the error message
            errorMessageContainer.style.display = 'block';

            console.error('Error deleting the account.');
        }
    } catch (error) {
        // Handle network or other errors
        console.error('Error deleting the account:', error);
    }
});
