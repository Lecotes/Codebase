import express from "express";
import MaterialsController from "../controllers/Materials.js";
const router = express.Router();

router.get("/materials", MaterialsController.getMaterials);
router.get("/material/:materialID", MaterialsController.getMaterialBYId);
router.post("/material/create", MaterialsController.createMaterial);
router.patch(
  "/material/update/:materialID",
  MaterialsController.updateMaterials
);
router.delete(
  "/material/delete/:materialId",
  MaterialsController.deleteMaterials
);

export default router;
