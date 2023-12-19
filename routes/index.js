const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);
//middleware function in case a route that doesnt exist is hit
router.use((req,res) => {
    return res.send('Wrong route.');
});

module.exports = router;