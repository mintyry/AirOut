const router = require('express').Router();

const { getThoughts, getOneThought, airOutThought, updateThought, deleteThought, addReaction, deleteReaction } = require('../../controllers/thoughtController');

//handling all thoughts, creating thought
router.route('/').get(getThoughts).post(airOutThought);
//handling single thoughts
router.route('/:thoughtId').get(getOneThought).put(updateThought).delete(deleteThought);
//handling reactions
router.route('/:thoughtId/reactions').post(addReaction).delete(deleteReaction);

module.exports = router;