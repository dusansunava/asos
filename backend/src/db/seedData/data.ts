import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const users = [
  {
    username: "john_doe",
    email: "john@example.com",
    password: "hashedpassword123",
    salt: "randomsalt1",
    role: "USER",
    refreshToken: null,
  },
  {
    username: "jane_doe",
    email: "jane@example.com",
    password: "hashedpassword456",
    salt: "randomsalt2",
    role: "ADMIN",
    refreshToken: null,
  },
];

export const seedData = async (db: PrismaClient) => {
  try {
    for (const user of users) {
      const existingUserByEmail = await db.user.findUnique({ where: { email: user.email } });
      if (existingUserByEmail) {
        await db.user.delete({ where: { email: user.email } });
      }

      const existingUserByUsername = await db.user.findUnique({ where: { username: user.username } });
      if (existingUserByUsername) {
        await db.user.delete({ where: { username: user.username } });
      }

      await db.user.create({
        data: {
          username: user.username,
          email: user.email,
          password: user.password,
          salt: user.salt,
          refreshToken: user.refreshToken,
        },
      });
    }

    // Fetch created users to get their IDs
    const [user1, user2] = await db.user.findMany({
      where: { email: { in: [users[0].email, users[1].email] } },
    });

    if (user1 && user2) {
      // Create food logs for each user
      await db.foodLog.createMany({
        data: [
          {
            user_id: user1.id,
            foodItem: "Chicken Breast",
            calories: 200,
            protein: 30.0,
            carbs: 0.0,
            fat: 5.0,
            date: new Date(),
          },
          {
            user_id: user1.id,
            foodItem: "Apple",
            calories: 95,
            protein: 0.5,
            carbs: 25.0,
            fat: 0.3,
            date: new Date(),
          },
          {
            user_id: user2.id,
            foodItem: "Eggs",
            calories: 155,
            protein: 13.0,
            carbs: 1.1,
            fat: 11.0,
            date: new Date(),
          },
        ],
      });

      // Create activity logs for each user
      await db.activityLog.createMany({
        data: [
          {
            user_id: user1.id,
            activity: "Running",
            duration: 30,
            caloriesBurned: 300,
            date: new Date(),
          },
          {
            user_id: user1.id,
            activity: "Cycling",
            duration: 45,
            caloriesBurned: 400,
            date: new Date(),
          },
          {
            user_id: user2.id,
            activity: "Swimming",
            duration: 60,
            caloriesBurned: 500,
            date: new Date(),
          },
        ],
      });
    }
  } catch (err) {
    console.log("User seeding failed!", err);
  }
};

seedData(prisma)
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
