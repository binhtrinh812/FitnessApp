const {MongoClient} = require('mongodb');

const client = new MongoClient(process.env.MONGODB_URI);

const connectDB = async () => {
  try {
    await client.connect();
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = {client, connectDB};
