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

async function addUser(username,email,name,surname,hashedPassword) {   //da implementare adduser con controllo per username e email gia usate
  try {
    await db.query(
      "INSERT INTO users (username, name, surname, email, password) VALUES ($1, $2, $3, $4, $5)",
      [username, name, surname, email, hashedPassword]
    );
    return "success"
  } catch (err) {
    if (err.code==="23505"){
      return "notUnique"
    }else if (err.code==="22021"){
      return "unvalidChar"
    }else if (err.code==="22001"){
      return "tooLong"
    }
    
  }
}


module.exports = {
 getUserLoginData,
 addUser
};