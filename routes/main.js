const { Router } = require('express');
const { getUserInfo } = require('../utils/mw-auth');
const router = Router();

router.use(getUserInfo);

router.get('/', (req, res) => res.render('index'));
router.get('/home', (req, res) => res.render('home'));

module.exports = router;
