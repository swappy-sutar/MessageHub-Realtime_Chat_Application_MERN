import JWT from "jsonwebtoken";

const generateToken = (payload, res) => {
  const token = JWT.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "2d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days
    sameSite: "strict", // CSRF protection
    secure: process.env.NODE_ENV === "production", // Set to true in production
  });

  return token;
};

export { generateToken };
