const JWT = require("jsonwebtoken");

const generateToken = (user_id) => {
  const secret = process.env.JWT_SECRET;
  
  if (!secret) {
    console.error("JWT_SECRET is not set");
    throw new Error("JWT_SECRET is not set");
  }

  try {
    return JWT.sign(
      {
        user_id: user_id,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 1000 * 60, // changed to 1000 minutes
      },
      secret
    );
  } catch (error) {
    console.error("Error generating token:", error);
    throw error;
  }
};

module.exports = { generateToken };