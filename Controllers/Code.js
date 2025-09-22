const path = require("path");
const User = require(path.join(__dirname, "..", "DB", "UserSchema.js"));
const jwt = require('jsonwebtoken');

const Save_code = async (req, res) => {
    try {
        const { lang, code, filename } = req.body;
        const jsonwt = req.cookies.jwt;
        if (!jsonwt) return res.json({ msg: "Please login or register to save code", status: 404 });

        const { id } = jwt.verify(jsonwt, process.env.SECRET_KEY);
        const user = await User.findById(id);
        if (!user) return res.json({ msg: "User not found", status: 404 });

        const existingCode = user.codes.find(c => c.filename === filename);
        if (existingCode) {
            return res.json({ 
                msg: "A file with this name already exists", 
                status: 409,
            });
        } else {
            user.codes.push({ filename, lang, content: code });
        }

        await user.save();
        res.json({ msg: "Code saved successfully", status: 200 });
    } catch (err) {
        console.error(err);
        res.json({ msg: err.message || err, status: 500 });
    }
};


const Load_code = async (req, res) => {
    try {
        const { filename } = req.body;
        const jsonwt = req.cookies.jwt;
        if (!jsonwt) return res.json({ msg: "Please login", status: 404 });

        const { id } = jwt.verify(jsonwt, process.env.SECRET_KEY);
        const user = await User.findById(id);
        if (!user) return res.json({ msg: "User not found", status: 404 });

        const codeDoc = user.codes.find(c => c.filename === filename);
        if (!codeDoc) return res.json({ msg: "No code found", status: 204 });
 
        const langModes = { "C++": "ace/mode/c_cpp", "C": "ace/mode/c_cpp", "Java": "ace/mode/java", "Python": "ace/mode/python" };
        const langMode = langModes[codeDoc.lang] || "ace/mode/plain_text";

        res.json({ code: codeDoc.content, langMode, status: 200 });
    } catch (err) {
        console.error(err);
        res.json({ msg: err.message || err, status: 500 });
    }
};

const List_files = async (req, res) => {
    try {
        const jsonwt = req.cookies.jwt;
        if (!jsonwt) return res.json({ msg: "Please login", status: 404 });

        const { id } = jwt.verify(jsonwt, process.env.SECRET_KEY);
        const user = await User.findById(id);
        if (!user) return res.json({ msg: "User not found", status: 404 });

        const files = user.codes.map(c => c.filename);
        res.json({ files, status: 200 });
    } catch (err) {
        console.error(err);
        res.json({ msg: err.message || err, status: 500 });
    }
};

module.exports = { Save_code, Load_code, List_files };