const { Router } = require('express');
const router = Router();

router.get('/login', (req, res) => res.render('auth/login', { layout: 'layouts/auth' }));
router.get('/signup', (req, res) => res.render('auth/signup', { layout: 'layouts/auth' }));

module.exports = router;
