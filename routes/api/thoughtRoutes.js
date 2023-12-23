const router = require('express').Router();

// can delete this once route code blocks are in controllers
const { Thought } = require ('../../models');

const { getThoughts, getOneThought, airOutThought } = require('../../controllers/thoughtController');

router.route('/').get(getThoughts).post(airOutThought);
router.route('/:thoughtId').get(getOneThought);

module.exports = router;