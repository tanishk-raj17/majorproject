// test-cloud.js
require('dotenv').config();
const path = require('path');

try {
  const { cloudinary, storage } = require('./cloudinary'); // adjust path if cloudinary folder not at project root

  console.log('cwd ->', process.cwd());
  console.log('ENV CLOUD_NAME ->', process.env.CLOUD_NAME ? 'SET' : 'UNDEFINED');
  console.log('ENV CLOUD_API_KEY ->', process.env.CLOUD_API_KEY ? 'SET' : 'UNDEFINED');
  console.log('cloudinary ->', !!cloudinary ? 'LOADED' : 'MISSING');
  console.log('cloudinary.uploader ->', !!(cloudinary && cloudinary.uploader) ? 'EXISTS' : 'MISSING');
  console.log('storage ->', !!storage ? 'EXISTS' : 'MISSING');

  if (storage) {
    console.log('storage.constructor.name ->', storage.constructor && storage.constructor.name);
    // safe inspect common property if present
    if (storage.params) console.log('storage.params ->', storage.params);
  }
} catch (e) {
  console.error('TEST CLOUD ERROR ->', e && e.stack ? e.stack : e);
}
