import nextConnect from 'next-connect';
import { handleDeleteRequest, handleGetRequest, handlePostRequest, handlePutRequest } from './crud';

const handler = nextConnect();
const collectionName = "items";

handler.get(async (req, res) => handleGetRequest(collectionName, req, res));
handler.post(async (req, res) => handlePostRequest(collectionName, req, res));
handler.put(async (req, res) => handlePutRequest(collectionName, req, res));
handler.delete(async (req, res) => handleDeleteRequest(collectionName, req, res));

export default handler;
