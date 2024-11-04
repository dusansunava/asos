import { TCreatePortfolio } from "@/controllers/portfolio/schema";
import { db } from "@/db/connection";

const getPortfolioByName = async (name: string) => {
  return db.portfolio.findUnique({
    where: {
      name,
    },
  });
};

export const getAllPortfolios = async () => {
  try {
    const users = await db.portfolio.findMany();

    return { success: true, data: users };
  } catch (err) {
    return { success: false, error: { server: err } };
  }
};

export const createPortfolio = async (request: TCreatePortfolio) => {
  try {
    var existingPortfolio = await getPortfolioByName(request.name);
    if (existingPortfolio) {
      return { success: false, error: { name: ["not unique"] } };
    }

    const newPortfolio = await db.portfolio.create({
      data: {
        name: request.name,
        owner_id: request.owner_id
      },
    });

    return {
      success: true,
      data: { name: newPortfolio.name, owner_id: request.owner_id },
    };
  } catch (err) {
    return { success: false, error: { server: err } };
  }
};

// TODO

// export const getUserPortfolios = async () => {
//   try {
//     const users = await db.portfolio.findMany();

//     return { success: true, data: users };
//   } catch (err) {
//     return { success: false, error: { server: err } };
//   }
// };