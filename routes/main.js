const { Router } = require('express');
const { getUserInfo, protected } = require('../utils/mw-auth');
const router = Router();

router.use(getUserInfo);

router.get('/', (req, res) => res.render('index'));
router.get('/home', protected, (req, res) => res.render('home'));

module.exports = router;
