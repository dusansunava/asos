import {
  deletePortfolio,
  getUserPortfolios,
  updatePortfolio,
  createPortfolio,
  portfolioDeposit,
  getUserPortfolio,
  getPortfolioAssetsPaginated,
  getPortfolioWithAssetAmount,
  getPortfoliosWithAssetAmount,
  getPortfolioAssetsHistory,
} from "@/controllers/portfolio/controller";
import { Router } from "express";
import validate from "@/middleware/validate";
import {
  CreatePortfolioSchema,
  PortfolioDepositSchema,
  UpdatePortfolioSchema,
} from "@/controllers/portfolio/schema";
import verifyJWT from "@/middleware/verifyJWT";

export default (router: Router) => {
  router.get("/portfolios", verifyJWT, getUserPortfolios);
  router.post(
    "/portfolios/:id/assets/paginated",
    verifyJWT,
    getPortfolioAssetsPaginated
  );
  router.post(
    "/portfolios",
    verifyJWT,
    validate(CreatePortfolioSchema),
    createPortfolio
  );
  router.put(
    "/portfolios/:id",
    verifyJWT,
    validate(UpdatePortfolioSchema),
    updatePortfolio
  );
  router.delete("/portfolios/:id", verifyJWT, deletePortfolio);
  router.put(
    "/portfolios/:id/deposit",
    verifyJWT,
    validate(PortfolioDepositSchema),
    portfolioDeposit
  );
  router.get("/portfolios/:id", verifyJWT, getUserPortfolio);
  router.get(
    "/portfolios/:portfolioId/assets/:assetId",
    verifyJWT,
    getPortfolioWithAssetAmount
  );
  router.get(
    "/portfolios/assets/:assetId/amount",
    verifyJWT,
    getPortfoliosWithAssetAmount
  );
  router.post(
    "/portfolios/:id/history",
    verifyJWT,
    getPortfolioAssetsHistory
  );
};
