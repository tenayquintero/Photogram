require("dotenv").config();

const getDB = require("./db");

const main = async () => {
  let connection;
  try {
    connection = await getDB();

    await connection.query(`DROP TABLE IF EXISTS  vote_comments`);
    await connection.query(`DROP TABLE IF EXISTS comments`);
    await connection.query(`DROP TABLE IF EXISTS comments`);
    await connection.query(`DROP TABLE IF EXISTS votes`);
    await connection.query(`DROP TABLE IF EXISTS publications`);
    await connection.query(`DROP TABLE IF EXISTS users`);

    console.log("...Creating tables");
    await connection.query(`
    CREATE TABLE users (
      id_user INT UNSIGNED NOT NULL AUTO_INCREMENT,
      role ENUM ("admin","normal") DEFAULT "normal",
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(250) NOT NULL,
      name VARCHAR(250),
      avatar VARCHAR(250),
      description VARCHAR(250),
      date_birth DATE,
      creation_date DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
      active BOOLEAN DEFAULT false,
      registration_code VARCHAR(250),
      last_up_password DATETIME,
      recover_code VARCHAR(250),
      deleted BOOLEAN DEFAULT false,
      CONSTRAINT users_pk PRIMARY KEY (id_user)
       );
        
        `);

    await connection.query(`
        CREATE TABLE publications(
          id_publication INT UNSIGNED AUTO_INCREMENT NOT NULL,
          id_user INT UNSIGNED NOT NULL,
          title VARCHAR(250),
          photo VARCHAR(250) NOT NULL,
          description VARCHAR(250),
          date_creation DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
          CONSTRAINT publication_pk PRIMARY KEY (id_publication),
          FOREIGN KEY (id_user) REFERENCES users (id_user)
        );
        `);
    await connection.query(`
        CREATE TABLE votes(
         id_vote INT UNSIGNED AUTO_INCREMENT NOT NULL,
         id_user INT UNSIGNED NOT NULL,
         id_publication INT UNSIGNED NOT NULL,
          vote TINYINT NOT NULL,
         CONSTRAINT votes_CK1 CHECK (vote IN (-1,1,2)),
         date_vote DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
         CONSTRAINT vote_key PRIMARY KEY (id_vote),
         FOREIGN KEY (id_user) REFERENCES users (id_user),
         FOREIGN KEY (id_publication) REFERENCES publications(id_publication)

        );
        `);
    await connection.query(`
        CREATE TABLE comments(
         id_comment INT UNSIGNED AUTO_INCREMENT NOT NULL,
         id_user INT UNSIGNED NOT NULL,
         id_publication INT UNSIGNED NOT NULL,
         date_comment DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
         CONSTRAINT comment_pk PRIMARY KEY (id_comment),
         FOREIGN  KEY (id_user) REFERENCES users(id_user),
         FOREIGN KEY (id_publication) REFERENCES publications(id_publication)
         
        );
        `);

    await connection.query(`
        CREATE TABLE vote_comments(
          id_vote_comment INT UNSIGNED AUTO_INCREMENT NOT NULL,
          id_user INT UNSIGNED NOT NULL,
          id_comment INT UNSIGNED NOT NULL,
          vote_comment TINYINT NOT NULL,
           CONSTRAINT votes_comment CHECK (vote_comment IN (-1,1,2)),
          CONSTRAINT comment_pk PRIMARY KEY (id_vote_comment),
          FOREIGN KEY (id_user) REFERENCES users(id_user),
          FOREIGN KEY (id_comment) REFERENCES comments(id_comment)
        );
        `);
    console.log("The tables has been creating successfully!!!");
  } catch (error) {
    console.log(error);
    throw new Error("Conection not possible");
  } finally {
    if (connection) {
      connection.release();
      process.exit();
    }
  }
};

main();
