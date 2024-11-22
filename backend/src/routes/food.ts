import { getSimilarFoods, getUserFoods, getSuggestionRequest, getFoodInfoRequest, postUserFood } from "@/controllers/food/controller";
import verifyJWT from "@/middleware/verifyJWT";
import { Router } from "express";

export default (router: Router) => {
  router.get("/food", verifyJWT, getUserFoods);
  router.post("/food", verifyJWT, postUserFood);
  router.post("/food/similar", verifyJWT, getSimilarFoods);
  router.post("/spoonacular/foodSuggestion", verifyJWT, getSuggestionRequest);
  router.post("/spoonacular/foodInfo", verifyJWT, getFoodInfoRequest);
}