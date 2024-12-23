import { db } from "@/db/connection";
import { PaginationRequest } from "@/db/schema";
import user from "@/routes/user";

const getExerciseById = async (id: string) => {
    return db.exercise.findUnique({
      where: {
        id,
      }
    });
  };

  const getExerciseByName = async (name: string) => {
    return db.exercise.findUnique({
      where: {
        name,
      },
    });
  };
  
  const getExercisesByPage = async (request: PaginationRequest, userId: string, amount: string) => {
    const pageIndex = request.pagination.pageIndex;
    const pageSize = request.pagination.pageSize;
    const sorting = request.sorting[0];
    const searching = request.search as { name: string; };

    let whereClause: any = {};

    if(amount == "owned") {
      whereClause = {
        owner_id: userId
    };
    }

    const paginatedExercises = await db.exercise.findMany({
      where: {
        ...whereClause,
            AND: [{
              name: {
                contains: searching?.name ? searching.name : "",
                mode: "insensitive",
              },
          }],
      },
      orderBy: {
        [sorting.id]: sorting.desc ? "desc" : "asc",
      },
      take: pageSize,
      skip: pageIndex === 0 ? pageIndex : pageIndex * pageSize,
    });

    const totalItems = await db.exercise.count({
      where: {
        name: {
          contains: searching?.name ? searching.name : "",
          mode: "insensitive",
        },
      },
    });
  
    return {
      totalItems: totalItems,
      currentPage: pageIndex,
      totalPages: Math.ceil(totalItems / pageSize),
      data: paginatedExercises,
    };
  };

export default { getExercisesByPage, getExerciseById, getExerciseByName }
