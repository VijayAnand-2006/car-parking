const admins = [];

function createAdmin(payload) {
  return {
    id: Date.now().toString(),
    ...payload,
  };
}

function registerAdmin(req, res) {
  const { name, email, username, password } = req.body;

  if (!name || !email || !username || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const existingAdmin = admins.find(
    (admin) => admin.username === username || admin.email === email
  );

  if (existingAdmin) {
    return res.status(409).json({ message: 'Admin already exists.' });
  }

  const newAdmin = createAdmin({ name, email, username, password });
  admins.push(newAdmin);

  return res.status(201).json({
    message: 'Admin registered successfully.',
    admin: {
      id: newAdmin.id,
      name: newAdmin.name,
      email: newAdmin.email,
      username: newAdmin.username,
    },
  });
}

function loginAdmin(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  const admin = admins.find(
    (item) => item.username === username && item.password === password
  );

  if (!admin) {
    return res.status(401).json({ message: 'Invalid username or password.' });
  }

  return res.status(200).json({
    message: 'Login successful.',
    admin: {
      id: admin.id,
      name: admin.name,
      email: admin.email,
      username: admin.username,
    },
  });
}

function getAdminProfile(req, res) {
  const adminId = req.params.id;
  const admin = admins.find((item) => item.id === adminId);

  if (!admin) {
    return res.status(404).json({ message: 'Admin not found.' });
  }

  return res.status(200).json({
    admin: {
      id: admin.id,
      name: admin.name,
      email: admin.email,
      username: admin.username,
    },
  });
}

function getDashboard(req, res) {
  return res.status(200).json({
    message: 'Welcome to the admin dashboard.',
    stats: {
      totalAdmins: admins.length,
      status: 'active',
    },
  });
}

module.exports = {
  registerAdmin,
  loginAdmin,
  getAdminProfile,
  getDashboard,
};
