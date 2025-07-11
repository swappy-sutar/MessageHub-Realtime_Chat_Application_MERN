import JWT from "jsonwebtoken";

const generateToken = (payload, res) => {
  const token = JWT.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "2d",
  });

  return token;
};

export { generateToken };
