const router = require('express').Router();

const { User } = require ('../../models')

router.get('/', async (req,res) => {
    try {
        const result = await User.find({});
        res.status(200).json(result);
    } catch (error) {
        console.log('Could not get all users');
        res.status(500).json({message: 'could not get all users'});
    }
});

module.exports = router;