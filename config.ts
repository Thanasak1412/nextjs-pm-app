// JWT
const SALT_ROUND = process.env.SALT_ROUND as string;
const JWT_SECRET = process.env.JWT_SECRET;
const COOKIE_NAME = process.env.COOKIE_NAME as string;

export { COOKIE_NAME, JWT_SECRET, SALT_ROUND };
