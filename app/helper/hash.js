const bcrypt = require('bcrypt');

async function hashear(string) {
    return await bcrypt.hash(string, 10);
}

async function matchHash(password, hash) {
    return await bcrypt.compareSync(password, hash)
}

async function getToken() {
    const buffer = await crypto.randomBytes(32);
    return buffer.toString("hex");
}

module.exports = { hashear, matchHash, getToken };