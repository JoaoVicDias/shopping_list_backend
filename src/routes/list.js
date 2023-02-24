const express = require('express');
const { check } = require('express-validator');

const listControllers = require('../controllers/list');

const route = express.Router();

route.get('/', listControllers.onGetAllLists);
route.get('/:id', listControllers.onGetListById);
route.post('/', [check('name').trim().notEmpty().isLength({ min: 2 })], listControllers.onCreateList);
route.patch('/:id', [check('name').trim().notEmpty().isLength({ min: 2 })], listControllers.onUpdateList);
route.delete('/:id', listControllers.onDeleteList);

route.post(
  '/add-item/:id',
  [
    check('name').trim().notEmpty(),
    check('brand').trim(),
    check('amount').trim().notEmpty().isNumeric(),
    check('price').trim().notEmpty().isFloat(),
  ],
  listControllers.onAddItem,
);
route.post(
  '/remove-item/:id',
  [check('id').trim().notEmpty()],
  listControllers.onRemoveItem,
);

module.exports = route;
