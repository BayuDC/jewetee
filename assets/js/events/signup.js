import $ from 'cash-dom';

$('#form-signup').on('submit', async function (e) {
    e.preventDefault();

    $('#form-signup button').text('Sign up...');
    $(this.name).next().text('');
    $(this.email).next().text('');
    $(this.password).next().text('');

    const name = this.name.value;
    const email = this.email.value;
    const password = this.password.value;

    try {
        const res = await fetch('/signup', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
        });
        const data = await res.json();

        if (!res.ok) throw data.err;

        window.location = '/home';
    } catch (err) {
        $(this.name).next().text(err.name);
        $(this.email).next().text(err.email);
        $(this.password).next().text(err.password);
    } finally {
        $('#form-signup button').text('Sign up');
    }
});
