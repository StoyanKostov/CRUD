const path = require('path'),
	DB = require(path.join(process.cwd(), 'data')),
	VALIDATION = require(path.join('..', 'validation')),
	USER_MODEL = Object.create(null, {
		registerUser: {
			value: (newUser) => {
				return new Promise( (resolve, reject) => {
					if (!VALIDATION.isValidString(newUser.forename)) {
						reject('Please enter forename!');
					}
					if (!VALIDATION.isValidString(newUser.surname)) {
						reject('Please enter surname!');
					}
					if (!VALIDATION.isValidEmail(newUser.email)) {
						reject('Please enter email!');
					}

					newUser.created = new Date();
					DB.insert(newUser, (err, id) => {
						if( err !== null ){
							reject('User creation failed');
						}

						resolve(id);
					});
				});
			}
		},
		getUserById: {
			value: (params) => {
				return new Promise((resolve, reject) => {
					if (!VALIDATION.isDefined(params.id)) {
						reject('Please enter user Id!');
					}

					DB.fetch(params.id, (err, user) => {
						if( err !== null ){
							reject('User read failed');
						}

						resolve(user);
					});
				});
			}
		},
		updateUserById: {
			value: (params) => {
				return new Promise((resolve, reject) => {
					if (!VALIDATION.isDefined(params.id)) {
						reject('Please enter user Id!');
					}

					DB.update(params, (err, id) => {
						if( err !== null ){
							reject('User update failed');
						}

						resolve(id);
					});
				});
			}
		},
		deleteUserById: {
			value: (params) => {
				return new Promise((resolve, reject) => {
					if (!VALIDATION.isDefined(params.id)) {
						reject('Please enter user Id!');
					}

					DB.remove(params, (err, id) => {
						if( err !== null ){
							reject('User update failed');
						}

						resolve(id);
					});
				});
			}
		}
	});

module.exports = USER_MODEL;