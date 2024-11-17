import { pool } from "./database.js";
import materials from "../data/Materials.js";
import users from "../data/Users.js";
import groups from "../data/Groups.js";
import roles from "../data/Roles.js";
import user_groups from "../data/UserGroups.js";

const createUsersTable = async () => {
  const createTableQuery = `
            DROP TABLE IF EXISTS users CASCADE;

            CREATE TABLE IF NOT EXISTS users (
              id SERIAL PRIMARY KEY,
              name VARCHAR(255) NOT NULL,
              email VARCHAR(255) NOT NULL,
              password VARCHAR(255) NOT NULL,
              created_at TIMESTAMP DEFAULT NOW()
            )
        `;

  try {
    const res = await pool.query(createTableQuery);
    console.log("🎉 users table created successfully");
  } catch (err) {
    console.error("⚠️ error creating users table", err);
  }
};

const seedTableUsers = async () => {
  await createUsersTable();

  users.forEach((user) => {
    const insertQuery = {
      text: "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
    };

    const values = [user.name, user.email, user.password];

    pool.query(insertQuery, values, (err, res) => {
      if (err) {
        console.error("⚠️ error inserting users table", err);
        return;
      }

      console.log(`✅ ${user.name} added successfully`);
    });
  });
};

seedTableUsers();

const createGroupsTable = async () => {
  const createTableQuery = `
            DROP TABLE IF EXISTS groups CASCADE;

            CREATE TABLE IF NOT EXISTS groups (
              id SERIAL PRIMARY KEY,
              name VARCHAR(255) NOT NULL,
              description VARCHAR(255) NOT NULL,
              created_at TIMESTAMP DEFAULT NOW(),
              updated_at TIMESTAMP DEFAULT NOW()
            )
        `;

  try {
    const res = await pool.query(createTableQuery);
    console.log("🎉 groups table created successfully");
  } catch (err) {
    console.error("⚠️ error creating groups table", err);
  }
};

const seedTableGroups = async () => {
  await createGroupsTable();

  groups.forEach((group) => {
    const insertQuery = {
      text: "INSERT INTO groups (name, description) VALUES ($1, $2)",
    };

    const values = [group.name, group.description];

    pool.query(insertQuery, values, (err, res) => {
      if (err) {
        console.error("⚠️ error inserting groups table", err);
        return;
      }

      console.log(`✅ ${group.name} added successfully`);
    });
  });
};

seedTableGroups();

const createRolesTable = async () => {
  const createTableQuery = `
            DROP TABLE IF EXISTS roles CASCADE;

            CREATE TABLE IF NOT EXISTS roles (
              id SERIAL PRIMARY KEY,
              name VARCHAR(255) NOT NULL
            )
        `;

  try {
    const res = await pool.query(createTableQuery);
    console.log("🎉 roles table created successfully");
  } catch (err) {
    console.error("⚠️ error creating roles table", err);
  }
};

const seedTableRoles = async () => {
  await createRolesTable();

  roles.forEach((role) => {
    const insertQuery = {
      text: "INSERT INTO roles (name) VALUES ($1)",
    };

    const values = [role.name];

    pool.query(insertQuery, values, (err, res) => {
      if (err) {
        console.error("⚠️ error inserting roles table", err);
        return;
      }

      console.log(`✅ ${role.name} added successfully`);
    });
  });
};

seedTableRoles();

const createUserGroupTable = async () => {
  const createTableQuery = `
            DROP TABLE IF EXISTS user_group CASCADE;

            CREATE TABLE IF NOT EXISTS user_group (
              id SERIAL PRIMARY KEY,
              user_id INT NOT NULL,
              group_id INT NOT NULL,
              role_id INT NOT NULL,
              FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
              FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE,
              FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
            )
        `;

  try {
    const res = await pool.query(createTableQuery);
    console.log("🎉 user_group table created successfully");
  } catch (err) {
    console.error("⚠️ error creating user_group table", err);
  }
};

const seedTableUserGroup = async () => {
  await createUserGroupTable();

  user_groups.forEach((user_group) => {
    const insertQuery = {
      text: "INSERT INTO user_group (user_id, group_id, role_id) VALUES ($1, $2, $3)",
    };

    const values = [
      user_group.user_id,
      user_group.group_id,
      user_group.role_id,
    ];

    pool.query(insertQuery, values, (err, res) => {
      if (err) {
        console.error("⚠️ error inserting user_group table", err);
        return;
      }

      console.log(`✅ ${user_group.id} added successfully`);
    });
  });
};

seedTableUserGroup();

const createMaterialsTable = async () => {
  const createTableQuery = `
            DROP TABLE IF EXISTS materials CASCADE;

            CREATE TABLE IF NOT EXISTS materials (
              id SERIAL PRIMARY KEY,
              group_id INT NOT NULL,
              user_id INT NOT NULL,
              title VARCHAR(255) NOT NULL,
              content TEXT NOT NULL,
              created_at TIMESTAMP DEFAULT NOW(),
              updated_at TIMESTAMP DEFAULT NOW(),
              FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
              FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE
            )
        `;

  try {
    const res = await pool.query(createTableQuery);
    console.log("🎉 materials table created successfully");
  } catch (err) {
    console.error("⚠️ error creating materials table", err);
  }
};

const seedTableMaterials = async () => {
  await createMaterialsTable();

  materials.forEach((material) => {
    const insertQuery = {
      text: "INSERT INTO materials (group_id, user_id, title, content) VALUES ($1, $2, $3, $4)",
    };

    const values = [
      material.group_id,
      material.user_id,
      material.title,
      material.content,
    ];

    pool.query(insertQuery, values, (err, res) => {
      if (err) {
        console.error("⚠️ error inserting materials table", err);
        return;
      }

      console.log(`✅ ${material.title} added successfully`);
    });
  });
};

seedTableMaterials();
