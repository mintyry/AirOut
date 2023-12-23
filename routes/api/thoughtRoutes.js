const router = require('express').Router();

const { getThoughts, getOneThought, airOutThought, updateThought, deleteThought } = require('../../controllers/thoughtController');

router.route('/').get(getThoughts).post(airOutThought);
router.route('/:thoughtId').get(getOneThought).put(updateThought).delete(deleteThought);

module.exports = router;