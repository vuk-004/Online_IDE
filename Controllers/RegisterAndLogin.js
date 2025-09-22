const path = require("path");
const User = require(path.join(__dirname, "..", "DB", "UserSchema.js"));
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require("dotenv").config();

const Register_user = async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    try {
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            codes: [] 
        });

        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
        res.status(200).cookie('jwt', token, { maxAge: 1800000 }).json({ msg: "User created", status: 200 }).end();
    } catch (err) {
        if (err.code === 11000) {
            res.json({ msg: "User already exists", status: 422 }).end();
        } else {
            res.json({ msg: "Unexpected error", status: 500 }).end();
        }
        console.log(err);
    }
};

const Login_user = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ msg: "User does not exist", status: 404 }).end();
        }

        if (!(await bcrypt.compare(password, user.password))) {
            return res.json({ msg: "Wrong password", status: 401 }).end();
        }

        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
        res.cookie("jwt", token, { maxAge: 1800000 }).json({ msg: "OK", status: 200 }).end();
    } catch (err) {
        console.log(err);
        res.json({ msg: err, status: 500 }).end();
    }
};

const Get_user= async (req, res) => {
    const jsonwt = req.cookies.jwt;
    if (!jsonwt) return res.json({ status: 404, msg: "Not logged in" });

    const { id } = jwt.verify(jsonwt, process.env.SECRET_KEY);
    const user = await User.findById(id);
    if (!user) return res.json({ status: 404, msg: "User not found" });

    res.json({ status: 200, username: user.name });
};


module.exports = {
    Register_user,
    Login_user,
    Get_user
};
