const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const app = express();
const port = process.env.PORT || 5000;
const mongoUrl = process.env.MONGO_URL;
const dbName = process.env.MONGO_DB || 'parking';

app.use(cors());
app.use(express.json());

let client;
let usersCollection;
let mongoServer;

async function connectToMongo() {
  if (client) return;

  const mongoUri = mongoUrl || (await createEmbeddedMongo());
  client = new MongoClient(mongoUri);
  await client.connect();
  const db = client.db(dbName);
  usersCollection = db.collection('users');
  await usersCollection.createIndex({ username: 1 }, { unique: true });
}

async function createEmbeddedMongo() {
  mongoServer = await MongoMemoryServer.create();
  return mongoServer.getUri();
}

app.post('/api/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Please fill in all fields.' });
    }

    await connectToMongo();
    const existingUser = await usersCollection.findOne({ username });

    if (existingUser) {
      return res.status(409).json({ message: 'Username already exists.' });
    }

    await usersCollection.insertOne({ username, password });
    return res.status(201).json({ message: 'Registration successful. Please sign in.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error while registering.' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Please fill in all fields.' });
    }

    await connectToMongo();
    const user = await usersCollection.findOne({ username, password });

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }

    return res.json({ message: 'Login successful.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error while logging in.' });
  }
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

process.on('SIGINT', async () => {
  if (client) {
    await client.close();
  }

  if (mongoServer) {
    await mongoServer.stop();
  }

  process.exit(0);
});
