const router = require('express').Router();

const { getThoughts, getOneThought, airOutThought, updateThought, deleteThought, addReaction } = require('../../controllers/thoughtController');

//handling all thoughts, creating thought
router.route('/').get(getThoughts).post(airOutThought);
//handling single thoughts
router.route('/:thoughtId').get(getOneThought).put(updateThought).delete(deleteThought);
//handling reactions
router.route('/:thoughtId/reactions').post(addReaction);

module.exports = router;