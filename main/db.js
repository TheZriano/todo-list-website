const db = require("./postgresql");

async function getUserLoginData(username) {
    try {
      const res = await db.query("SELECT id, username, password FROM users WHERE username = $1", [username]);
      const user = res.rows[0];
      return user;
    } catch (err) {
      console.error('Errore durante la query:', err);
    }
}

async function addUser(id) {   //da implementare adduser con controllo per username e email gia usate
  try {
    const res = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    const user = res.rows[0];
    return user;
  } catch (err) {
    console.error('Errore durante la query:', err);
  }
}


module.exports = {
 getUserLoginData
};