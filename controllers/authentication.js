const jwt = require('jsonwebtoken'),
			crypto = require('crypto'),
			config = require('../config/main');
/************************************
	User auth using JWT and passport
	***********************************/


const passport = require('passport'),  
			User = require('../models.js').User,
			JwtStrategy = require('passport-jwt').Strategy,
			ExtractJwt = require('passport-jwt').ExtractJwt,
			LocalStrategy = require('passport-local');


const localOptions = { usernameField: 'email' };  


// Setting up local login strategy
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {  
	User.findOne({ email: email }, function(err, user) {
		if(err) { return done(err); }
		if(!user) { return done(null, false, { error: 'Your login details could not be verified. Please try again.' }); }

		user.comparePassword(password, function(err, isMatch) {
			if (err) { return done(err); }
			if (!isMatch) { return done(null, false, { error: "Your login details could not be verified. Please try again." }); }

			return done(null, user);
		});
	});
});

const jwtOptions = {  
	// Telling Passport to check authorization headers for JWT
	jwtFromRequest: ExtractJwt.fromAuthHeader(),
	// Telling Passport where to find the secret
	secretOrKey: "ThisIsATestKey"
};

// Setting up JWT login strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {  
	User.findById(payload._id, function(err, user) {
		if (err) { return done(err, false); }

		if (user) {
			done(null, user);
		} else {
			done(null, false);
		}
	});
});

passport.use(jwtLogin);  
passport.use(localLogin);  


/***************************************
	generating JSON Web Token
 **************************************/


function generateToken(user) {  
	return jwt.sign(user, config.secret, {
		expiresIn: 10080 // in seconds
	});
}



function setUserInfo(request) {  
	return {
		firstName: request.profile.firstName,
		lastName: request.profile.lastName,
		email: request.email,
		role: request.role
	};
}


//========================================
// Login Route
//========================================
exports.login = function(req, res, next) {

	let userInfo = setUserInfo(req.user);
	console.log(userInfo);

	res.status(200).json({
		token: 'JWT ' + generateToken(userInfo),
		user: userInfo
	});
}


//========================================
// Registration Route
//========================================
exports.register = function(req, res, next) {  
	// Check for registration errors
	const email = req.body.email;
	const firstName = req.body.firstName;
	const lastName = req.body.lastName;
	const password = req.body.password;

	// Return error if no email provided
	if (!email) {
		return res.status(422).send({ error: 'You must enter an email address.'});
	}

	// Return error if full name not provided
	if (!firstName || !lastName) {
		return res.status(422).send({ error: 'You must enter your full name.'});
	}

	// Return error if no password provided
	if (!password) {
		return res.status(422).send({ error: 'You must enter a password.' });
	}

	User.findOne({ email: email }, function(err, existingUser) {
		if (err) { return next(err); }

		// If user is not unique, return error
		if (existingUser) {
			return res.status(422).send({ error: 'That email address is already in use.' });
		}

		// If email is unique and password was provided, create account
		let user = new User({
			email: email,
				password: password,
				profile: { firstName: firstName, lastName: lastName }
		});

		user.save(function(err, user) {
			if (err) { return next(err); }

			// Subscribe member to Mailchimp list
			// mailchimp.subscribeToNewsletter(user.email);

			// Respond with JWT if user was created

			console.log(user);
			let userInfo = setUserInfo(user);
		

			res.status(201).json({
				token: 'JWT ' + generateToken(userInfo),
				user: userInfo
			});
		});
	});
}


//========================================
// Authorization Middleware
//========================================

// Role authorization check
exports.roleAuthorization = function(role) {  
	return function(req, res, next) {
		const user = req.user;

		User.findById(user._id, function(err, foundUser) {
			if (err) {
				res.status(422).json({ error: 'No user was found.' });
				return next(err);
			}

			// If user is found, check role.
			if (foundUser.role == role) {
				return next();
			}

			res.status(401).json({ error: 'You are not authorized to view this content.' });
			return next('Unauthorized');
		})
	}
}
//exports: roleAuthorization, login, register
