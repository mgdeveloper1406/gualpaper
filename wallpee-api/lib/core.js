var bcrypt = require('bcrypt-nodejs')

const validateTokenUser = (user) => {
	if (user === null) {
		throw new Error("Token is required");
	} else if (user == false) {
		throw new Error("Invalid auth token");
	} else {
		return user;
	}
}

//
const comparePassword = (password, userPassword) => {
	return bcrypt.compareSync(password.toString(), userPassword);
}

exports.validateTokenUser = validateTokenUser;
exports.comparePassword = comparePassword;