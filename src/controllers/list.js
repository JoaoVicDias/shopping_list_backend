const { validationResult } = require('express-validator');

const BadDevNoCoffe = require('../errors/badDevNoCoffe');
const ErrorWithResponse = require('../errors/errorWithResponse');
const InvalidFields = require('../errors/InvalidFields');

const List = require('../models/list');
const Item = require('../models/item');

const onGetAllLists = async (req, res, next) => {
  let lists;
  try {
    lists = await List.find().populate('itens');
  } catch (error) {
    return next(new BadDevNoCoffe());
  }

  return res.json(lists);
};

const onGetListById = async (req, res, next) => {
  let list;
  try {
    list = await List.findById(req.params.id).populate('itens');
  } catch (error) {
    return next(new BadDevNoCoffe());
  }

  return res.json(list);
};

const onCreateList = async (req, res, next) => {
  const erros = validationResult(req);
  if (!erros.isEmpty()) return next(new InvalidFields());

  let existingListByName;

  const list = new List(req.body);

  try {
    existingListByName = await List.findOne({ name: req.body.name });

    if (existingListByName) {
      return next(new ErrorWithResponse('Já existe uma lista com esse nome, por favor use outro', 422));
    }
    await list.save();
  } catch (error) {
    return next(new BadDevNoCoffe());
  }

  return res.json(list);
};

const onDeleteList = async (req, res, next) => {
  try {
    const list = await List.findById(req.params.id);

    await Item.deleteMany({ _id: { $in: list.itens } });
    await list.delete();
  } catch (error) {
    return next(new BadDevNoCoffe());
  }

  return res.json();
};

const onUpdateList = async (req, res, next) => {
  const erros = validationResult(req);
  if (!erros.isEmpty()) return next(new InvalidFields());
  let list;
  try {
    list = await List.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
  } catch (error) {
    return next(new BadDevNoCoffe());
  }

  return res.json(list);
};

const onAddItem = async (req, res, next) => {
  const erros = validationResult(req);
  if (!erros.isEmpty()) return next(new InvalidFields());
  let list;
  try {
    const newItem = new Item(req.body);

    list = await List.findById(req.params.id).populate('itens');

    list.itens.push(newItem);

    await newItem.save();
    await list.save();
  } catch (error) {
    return next(new BadDevNoCoffe());
  }

  return res.json(list);
};

const onRemoveItem = async (req, res, next) => {
  const erros = validationResult(req);
  if (!erros.isEmpty()) return next(new InvalidFields());

  const { id } = req.body;
  let list;
  try {
    const item = await Item.findById(id);
    list = await List.findById(req.params.id).populate('itens');

    list.itens.pull({ _id: id });

    await list.save();
    await item.delete();
  } catch (error) {
    return next(new BadDevNoCoffe());
  }

  return res.json(list);
};

module.exports = {
  onGetAllLists, onCreateList, onGetListById, onDeleteList, onUpdateList, onAddItem, onRemoveItem,
};
