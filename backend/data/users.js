import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true
  },
  {
    name: "Yashasvi Jain",
    email: "yashasvi@example.com",
    password: bcrypt.hashSync("123456", 10)
  },
  {
    name: "Scooby Doo",
    email: "scooby@example.com",
    password: bcrypt.hashSync("123456", 10)
  }
];

export default users;
