import $ from 'cash-dom';

$('#form-signup').on('submit', async function (e) {
    e.preventDefault();
    $('#form-signup button').text('Sign up...');

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

        if (res.ok) window.location = '/home';
    } catch (err) {
        console.log(err);
    } finally {
        $('#form-signup button').text('Sign up');
    }
});
