import { pool } from "../config/database.js";

const createMaterial = async (req, res) => {
  //function to save cars into database
  try {
    const { group_id, user_id, title, content } = req.body;
    const results = await pool.query(
      "INSERT INTO materials (group_id, user_id, title, content) VALUES ($1, $2, $3, $4)",
      [group_id, user_id, title, content]
    );
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(209).json({ error: error.message });
  }
};

const updateMaterials = async (req, res) => {
  //function to update cars into database
  try {
    const materialId = req.params.materialId;
    const { group_id, user_id, title, content } = req.body;
    const results = await pool.query(
      "UPDATE cars SET group_id = $1, user_id = $2, title = $3, content = $4 WHERE id = $5",
      [group_id, user_id, title, content, materialId] // Assuming you're passing the material id in the request parameters
    );
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(209).json({ error: error.message });
  }
};

const getMaterialBYId = async (req, res) => {
  //function to get material by id from database
  try {
    const materialId = req.params.materialId;

    const results = await pool.query(
      `SELECT
        materials.id,
        materials.group_id,
        materials.user_id,
        ) AS material_details
      FROM materials
      WHERE materials.id = $1`,
      [materialId]
    );

    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(209).json({ error: error.message });
  }
};

const getMaterials = async (req, res) => {
  //function to get materials from database
  try {
    const results = await pool.query(
      `SELECT
        materials.id,
        materials.group_id,
        materials.user_id,
        ) AS material_details
        FROM materials`
    );

    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(209).json({ error: error.message });
  }
};

const deleteMaterials = async (req, res) => {
  //function to get materials from database
  try {
    const materialId = parseInt(req.params.materialId);
    const results = await pool.query("DELETE FROM materials WHERE id = $1", [
      materialId,
    ]);
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(209).json({ error: error.message });
  }
};

export default {
  createMaterial,
  updateMaterials,
  deleteMaterials,
  getMaterialBYId,
  getMaterials,
};
