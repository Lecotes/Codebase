import { pool } from "./database.js";
import materials from "../data/Materials.js";
import "./dotenv.js";

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
              updated_at TIMESTAMP DEFAULT NOW()
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
