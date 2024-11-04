import { Request, Response } from "express";
import { getAllPortfolios, createPortfolio } from "@/services/portfolio/service";

export const getAll = async (req: Request, res: Response) => {
  const result = await getAllPortfolios();
  console.log("portfolios");
  if (result.success) {
    result.data;
    return res.status(200).send({ portfolios: result.data });
  }
  return res.status(500).send(result.error);
};

export const create = async (req: Request, res: Response) => {
  const result = await createPortfolio(req.body);

  if (result.success) {
    return res.status(201).send(result.data);
  } else if (!result.success && result.error?.server) {
    return res.status(500).send(result.error);
  }
  return res.status(400).send(result.error);
};