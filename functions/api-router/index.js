const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.database();

exports.api_router = functions.https.onRequest(async (req, res) => {
  const itemId = req.query.itemId || req.body.itemId;
  const itemData = req.body.data;

  switch (req.method) {
    case 'POST':
      // Create a new item
      const newItemRef = db.ref('items').push();
      await newItemRef.set(itemData);
      res.status(201).json({ message: 'Item created', itemId: newItemRef.key });
      break;

    case 'GET':
      // Read an item
      if (!itemId) {
        res.status(400).json({ error: 'Item ID is required' });
        return;
      }
      const itemSnapshot = await db.ref(`items/${itemId}`).once('value');
      if (!itemSnapshot.exists()) {
        res.status(404).json({ error: 'Item not found' });
        return;
      }
      res.status(200).json(itemSnapshot.val());
      break;

    case 'PUT':
      // Update an item
      if (!itemId) {
        res.status(400).json({ error: 'Item ID is required' });
        return;
      }
      await db.ref(`items/${itemId}`).update(itemData);
      res.status(200).json({ message: 'Item updated', itemId });
      break;

    case 'DELETE':
      // Delete an item
      if (!itemId) {
        res.status(400).json({ error: 'Item ID is required' });
        return;
      }
      await db.ref(`items/${itemId}`).remove();
      res.status(200).json({ message: 'Item deleted', itemId });
      break;

    default:
      res.status(405).json({ error: 'Method not allowed' });
      break;
  }
});