import {db} from "@/db/connection";

export const findUserById = async (id: string) => {
  return db.user.findFirst({
    where: { id: { equals: id } },
  });
};
