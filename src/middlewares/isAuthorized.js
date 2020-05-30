const jwt = require(`jsonwebtoken`);

const isAuthorized = (req, res, next) => {
	const token = req.headers[`x-access-token`];
	const msg = {
		auth: false,
		message: `No token provided.`,
	};
	if (!token) res.status(500).send(msg);
	jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
		const msg = {
			auth: false,
			message: `Failed to authenticate token.`,
		};
		if (err) res.status(500).send(msg);
		next();
	});
};

export default isAuthorized;
