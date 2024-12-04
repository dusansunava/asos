import { Router } from "express";
import { 
    createPlan, 
    getPlans, 
    getPlanById, 
    updatePlan, 
    deletePlan 
} from "@/controllers/plan/controller";
import verifyJWT from "@/middleware/verifyJWT";

export default (router: Router) => {
    router.post("/training-plans", verifyJWT, createPlan); // Vytvorenie plánu
    router.get("/training-plans", verifyJWT, getPlans);    // Získanie všetkých plánov
    router.get("/training-plans/:id", verifyJWT, getPlanById); // Získanie plánu podľa ID
    router.put("/training-plans/:id", verifyJWT, updatePlan);  // Aktualizácia plánu
    router.delete("/training-plans/:id", verifyJWT, deletePlan); // Odstránenie plánu
};
