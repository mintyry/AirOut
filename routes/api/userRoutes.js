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

router.post('/', async (req, res) => {
    console.log(User);
    console.log('we got the post route');
    try {
        console.log('we gonna create');
        const user = await User.create(req.body);
        console.log('we in the middle');
        res.json(user);
        console.log('we created');
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;