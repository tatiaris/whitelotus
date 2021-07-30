import { ObjectID } from 'mongodb';
import { deleteOneObject, findOneObject, getAllObjects, insertOneObject, updateOneObject } from './helper';

const collectionObjextTypeMap = {
  items: 'Item'
};

export const handleGetRequest = async (collection, req, res) => {
  let responseObject = { success: false, message: 'Invalid GET Request' };
  const objectType = collectionObjextTypeMap[collection];
  try {
    if (req.query.amount == 'all') {
      const collectionData = await getAllObjects(collection);
      responseObject = { success: true, message: `${objectType} successfully fetched!`, content: collectionData };
    } else if (req.query.amount == 'single') {
      const objectUID = req.query.uid;
      const objectData = await findOneObject(collection, { _id: ObjectID(objectUID) });
      responseObject = { success: true, message: `${objectType} successfully fetched!`, content: objectData };
    }
  } catch (error) {
    console.log(error);
    responseObject = {
      success: false,
      message: `${objectType} could not be fetched.`
    };
  }
  res.json(responseObject);
};

export const handlePostRequest = async (collection, req, res) => {
  let responseObject = { success: false, message: 'Invalid POST Request' };
  const newObject = req.body.newObject;
  const objectType = collectionObjextTypeMap[collection];
  try {
    await insertOneObject(collection, newObject);
    responseObject = {
      success: true,
      message: `${objectType} successfully added to database!`
    };
  } catch (error) {
    console.log(error);
    responseObject = {
      success: false,
      message: `${objectType} could not be added to database.`
    };
  }
  res.json(responseObject);
};

export const handlePutRequest = async (collection, req, res) => {
  let responseObject = { success: false, message: 'Invalid PUT Request' };
  const updatedObject = req.body.updatedObject;
  const objectType = collectionObjextTypeMap[collection];
  try {
    const objectUID = updatedObject._id;
    delete updatedObject._id;
    await updateOneObject(collection, { _id: ObjectID(objectUID) }, updatedObject);
    responseObject = {
      success: true,
      message: `${objectType} successfully updated!`
    };
  } catch (error) {
    console.log(error);
    responseObject = {
      success: false,
      message: `${objectType} could not be updated.`
    };
  }
  res.json(responseObject);
};

export const handleDeleteRequest = async (collection, req, res) => {
  let responseObject = { success: false, message: 'Invalid DELETE Request' };
  const objectToBeDeletedUID = req.query.uid;
  const objectType = collectionObjextTypeMap[collection];
  try {
    await deleteOneObject(collection, { _id: ObjectID(objectToBeDeletedUID) });
    responseObject = {
      success: true,
      message: `${objectType} successfully deleted!`
    };
  } catch (error) {
    console.log(error);
    responseObject = {
      success: false,
      message: `${objectType} could not be deleted.`
    };
  }
  res.json(responseObject);
};
