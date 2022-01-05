import $ from 'cash-dom';

$('#form-login').on('submit', async function (e) {
    e.preventDefault();

    $('#form-login button').text('Log in...');
    $(this.email).next().text('');
    $(this.password).next().text('');

    const email = this.email.value;
    const password = this.password.value;

    try {
        const res = await fetch('/login', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (!res.ok) throw data.err;

        window.location = '/home';
    } catch (err) {
        $(this.email).next().text(err.email);
        $(this.password).next().text(err.password);
    } finally {
        $('#form-login button').text('Log in');
    }
});
