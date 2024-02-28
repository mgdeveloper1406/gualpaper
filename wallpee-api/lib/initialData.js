var Users = require("../models/user");

const addInitData = async () => {
  const totalUsers = await Users.find().count()
  if (totalUsers === 0) {
    const userData = {
      username: "admin",
      email: "admin@admin.com",
      password: "admin123",
      profile: { name: 'admin' },
      role: 'admin'
    }

    //save the user and check for errors
    var user = new Users(userData);
		await user.save();
  }
}

exports.addInitData = addInitData;
