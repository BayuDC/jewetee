import $ from 'cash-dom';

$('#form-login').on('submit', async function (e) {
    e.preventDefault();

    $('#form-login button').text('Log in...');

    const email = this.email.value;
    const password = this.password.value;

    try {
        const res = await fetch('/login', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        console.log(data.user);
    } catch (err) {
        console.log(err);
    } finally {
        $('#form-login button').text('Log in');
    }
});
