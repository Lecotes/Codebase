import { pool } from "./database.js";
import materials from "../data/Materials.js";
import users from "../data/Users.js";
import groups from "../data/Groups.js";
import roles from "../data/Roles.js";
import user_groups from "../data/UserGroups.js";
import profile from "../data/Profile.js";
import followers from "../data/Followers.js";
import comments from "../data/Comments.js";

// Users table creation and seeding
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

    try {
      pool.query(insertQuery, values);
      console.log(`✅ ${user.name} added successfully`);
    } catch (err) {
      console.error("⚠️ error inserting user into users table", err);
    }
  });
};

// Profile table creation and seeding
const createProfileTable = async () => {
  const createTableQuery = `

    DROP TABLE IF EXISTS profile CASCADE;
    CREATE TABLE IF NOT EXISTS profile (
      id SERIAL PRIMARY KEY,
      user_id INT NOT NULL,
      bio VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW(),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `;

  try {
    await pool.query(createTableQuery);
    console.log("🎉 profile table created successfully");
  } catch (err) {
    console.error("⚠️ error creating profile table", err);
  }
};

const seedTableProfile = async () => {
  await createProfileTable();

  profile.forEach((prof) => {
    const insertQuery = {
      text: "INSERT INTO profile (user_id, bio) VALUES ($1, $2)",
    };

    const values = [prof.id, prof.bio];

    try {
      pool.query(insertQuery, values);
      console.log(`✅ ${prof.id} added successfully`);
    } catch (err) {
      console.error("⚠️ error inserting profile", err);
    }
  });
};

// Followers table creation and seeding
const createFollowersTable = async () => {
  const createTableQuery = `

    DROP TABLE IF EXISTS followers CASCADE;
    CREATE TABLE IF NOT EXISTS followers (
      id SERIAL PRIMARY KEY,
      profile_id INT NOT NULL,
      user_id INT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (profile_id) REFERENCES profile(id) ON DELETE CASCADE
    )
  `;

  try {
    await pool.query(createTableQuery);
    console.log("🎉 followers table created successfully");
  } catch (err) {
    console.error("⚠️ error creating followers table", err);
  }
};

const seedTableFollowers = async () => {
  await createFollowersTable();

  followers.forEach((follower) => {
    const insertQuery = {
      text: "INSERT INTO followers (profile_id, user_id) VALUES ($1, $2)",
    };

    const values = [follower.profile_id, follower.user_id];

    try {
      pool.query(insertQuery, values);
      console.log(`✅ ${follower.id} added successfully`);
    } catch (err) {
      console.error("⚠️ error inserting follower", err);
    }
  });
};

// Groups table creation and seeding
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
    await pool.query(createTableQuery);
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

    try {
      pool.query(insertQuery, values);
      console.log(`✅ ${group.name} added successfully`);
    } catch (err) {
      console.error("⚠️ error inserting group", err);
    }
  });
};

// // Roles table creation and seeding
const createRolesTable = async () => {
  const createTableQuery = `

    DROP TABLE IF EXISTS roles CASCADE;
    CREATE TABLE IF NOT EXISTS roles (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL
    )
  `;

  try {
    await pool.query(createTableQuery);
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

    try {
      pool.query(insertQuery, values);
      console.log(`✅ ${role.name} added successfully`);
    } catch (err) {
      console.error("⚠️ error inserting role", err);
    }
  });
};

// // User-Group table creation and seeding
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
    await pool.query(createTableQuery);
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

    try {
      pool.query(insertQuery, values);
      console.log(`✅ ${user_group.id} added successfully`);
    } catch (err) {
      console.error("⚠️ error inserting user_group", err);
    }
  });
};

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
    await pool.query(createTableQuery);
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

    try {
      pool.query(insertQuery, values);
      console.log(`✅ ${material.title} added successfully`);
    } catch (err) {
      console.error("⚠️ error inserting material", err);
    }
  });
};

// // Comments table creation and seeding
const createCommentsTable = async () => {
  const createTableQuery = `

    DROP TABLE IF EXISTS comments CASCADE;
    CREATE TABLE IF NOT EXISTS comments (
      id SERIAL PRIMARY KEY,
      material_id INT NOT NULL,
      user_id INT NOT NULL,
      content VARCHAR(255) NOT NULL,
      upvotes INT NOT NULL,
      downvotes INT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW(),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (material_id) REFERENCES materials(id) ON DELETE CASCADE
    )
  `;

  try {
    await pool.query(createTableQuery);
    console.log("🎉 comments table created successfully");
  } catch (err) {
    console.error("⚠️ error creating comments table", err);
  }
};

const seedTableComments = async () => {
  await createCommentsTable();

  comments.forEach((comment) => {
    const insertQuery = {
      text: "INSERT INTO comments (material_id, user_id, content, upvotes, downvotes) VALUES ($1, $2, $3, $4, $5)",
    };

    const values = [
      comment.material_id,
      comment.user_id,
      comment.content,
      comment.upvotes,
      comment.downvotes,
    ];

    try {
      pool.query(insertQuery, values);
      console.log(
        `✅ Comment for material ${comment.material_id} added successfully`
      );
    } catch (err) {
      console.error("⚠️ error inserting comment", err);
    }
  });
};

// 7. Run the entire seeding process
const seedDatabase = async () => {
  await seedTableUsers();
  await seedTableProfile();
  await seedTableFollowers();
  await seedTableGroups();
  await seedTableRoles();
  await seedTableUserGroup();
  await seedTableMaterials();
  await seedTableComments();
};

// Call the seeding process
seedDatabase().catch((err) => {
  console.error("⚠️ Error seeding database", err);
});
