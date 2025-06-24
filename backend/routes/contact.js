const express = require('express')
const router = express.Router()

const {createContact, getAllContacts, updateStatus} = require('../controllers/contactController')

router.post('/', createContact)
router.get('/', getAllContacts)
router.put('/:id/status', updateStatus)

module.exports = router