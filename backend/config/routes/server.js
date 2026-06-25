const express = require('express');
const cors = require('cors');
const adminRouter = require('./adminRouter');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/admin', adminRouter);

app.get('/', (req, res) => {
  res.send('Admin API is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
