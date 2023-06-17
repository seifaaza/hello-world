const Users = require("../models/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const fetchUsers = async (req, res) => {
  const users = await Users.find();
  res.json({ users: users });
};

async function signup(req, res) {
  try{
    const {fullName, email, password} = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8)
    const users = await Users.create({fullName, email, password: hashedPassword});
    const exp = Date.now() + 1000 * 60 * 60 * 24;
    const token = jwt.sign({sub: users._id, exp}, process.env.SECRET)
  
  res.cookie("Authorization", token, {
    expires : new Date(exp),
    httpOnly : true,
    sameSite : "lax",
    secure : process.env.NODE_ENV === 'production',
  })
  res.json({ users: users })

  }
  catch(err){
    console.log(err);
    res.sendStatus(400)
  }
}

async function login(req, res) {
  try {
    const {email, password} = req.body;
    const user = await Users.findOne({email});
  if(!user) return res.sendStatus(401);
  
  const passwordMatch = bcrypt.compareSync(password, user.password);
  if(!passwordMatch) return res.sendStatus(401)
  
  const exp = Date.now() + 1000 * 60 * 60 * 24;
  const token = jwt.sign({sub: user._id, exp}, process.env.SECRET)
  
  res.cookie("Authorization", token, {
    expires : new Date(exp),
    httpOnly : true,
    sameSite : "lax",
    secure : process.env.NODE_ENV === 'production',
  })
  
  res.sendStatus(200)
}
catch(err){
  console.log(err);
  res.sendStatus(400)
}
}

function checkAuth(req, res) {
  try{
    res.sendStatus(200)
  } catch(err){
    return res.sendStatus(400)
  }
}

function logout(req, res) {
  try{
    res.clearCookie("Authorization");
    res.sendStatus(200)
  }catch(err){
    console.log(err);
    res.sendStatus(400)
  }
}


const deleteUser = async (req, res) => {
  const userId = req.params.id;

  await Users.findByIdAndDelete(userId);

  res.json({ success: "record deleted" });
};

module.exports = {
  deleteUser: deleteUser,
  fetchUsers: fetchUsers,
  signup: signup,
  checkAuth: checkAuth,
  login: login,
  logout: logout,
};
