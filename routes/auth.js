const { Router } = require('express');
const auth = require('../controllers/auth');
const router = Router();

router.get('/login', (req, res) => res.render('auth/login', { layout: 'layouts/auth' }));
router.get('/signup', (req, res) => res.render('auth/signup', { layout: 'layouts/auth' }));

router.post('/login', auth.login);
router.post('/signup', auth.signup);
router.get('/logout', auth.logout);

module.exports = router;
