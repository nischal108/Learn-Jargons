import { Client } from "pg";

const client = new Client({
  connectionString: "postgresql://postgres:mysecretpassword@localhost/postgres",
});



// async function createUsersTable() {
//   await client.connect();
//   const result = await client.query(`CREATE TABLE users1 (
//     id SERIAL PRIMARY KEY,
//     username VARCHAR(50) UNIQUE NOT NULL,
//     email VARCHAR(255) UNIQUE NOT NULL,
//     password VARCHAR(255) NOT NULL,
//     created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
//   )`);
//   console.log(result);
// }

// createUsersTable();

interface Users {
  username: string;
  email: string;
  password: string;
}

async function insertIntoUsers(user: Users) {
  const { username, email, password } = user;

  try {
    await client.connect();
    const result = await client.query(
      `INSERT INTO users1 (username, email, password) VALUES($1, $2, $3) RETURNING *`,
      [username, email, password]
    );
    console.log(result.rows[0]);
  } catch (err) {
    console.error('Error inserting into users:', err);
  } finally {
    await client.end(); 
  }
}

// insertIntoUsers({
//   username: "Nischal32",
//   email: "nishchal31@gmail.com",
//   password: "djkfsndkjf",
// });


async function sqlInjection(user: Users) {
    const { username, email, password } = user;
  
    try {
      await client.connect();
      const result = await client.query(
        `INSERT INTO users1 (username, email, password) VALUES('${username}', '${email}', '${password}')`,
      );
      console.log(result.rows[0]);
    } catch (err) {
      console.error('Error inserting into users:', err);
    } finally {
      await client.end(); 
    }
  }
  
  sqlInjection({
    username: "Nischal31",
    email: "';DELETE FROM users1 WHERE id=1;--",
    password: "djkfsndkjf",
  });
  