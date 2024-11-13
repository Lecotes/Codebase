import express from "express";
import MaterialsController from "../controllers/Materials.js";
const router = express.Router();

router.get("/materials", MaterialsController.getMaterials);
router.get("/material/:materialId", MaterialsController.getMaterialBYId);
router.post("/material/create", MaterialsController.createMaterial);
router.patch(
  "/material/update/:materialId",
  MaterialsController.updateMaterials
);
router.delete(
  "/material/delete/:materialId",
  MaterialsController.deleteMaterials
);

export default router;
