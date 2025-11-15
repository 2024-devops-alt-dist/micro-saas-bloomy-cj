import { PrismaClient } from "../../generated/prisma/client";
import bcrypt from "bcrypt";

export default async function seedUsers(prisma: PrismaClient) {
  const saltRounds = 10;

  const users = [
    {
      lastname: "Dupont",
      firstname: "Admin",
      email: "admin@admin.com",
      password: "123456789",
      picture_profil: "default.jpg",
      role: "admin",
    },
    {
      lastname: "Durand",
      firstname: "Alex",
      email: "user2@test.com",
      password: "123456789",
      picture_profil: "alex.jpg",
      role: "user",
    },
    {
      lastname: "Martin",
      firstname: "Sophie",
      email: "user3@test.com",
      password: "123456789",
      picture_profil: "sophie.jpg",
      role: "user",
    },
    {
      lastname: "Bernard",
      firstname: "Lucas",
      email: "user4@test.com",
      password: "123456789",
      picture_profil: "lucas.jpg",
      role: "user",
    },
    {
      lastname: "Thomas",
      firstname: "Emma",
      email: "user5@test.com",
      password: "123456789",
      picture_profil: "emma.jpg",
      role: "user",
    },
    {
      lastname: "Petit",
      firstname: "Noah",
      email: "user6@test.com",
      password: "123456789",
      picture_profil: "noah.jpg",
      role: "user",
    },
    {
      lastname: "Robert",
      firstname: "Léa",
      email: "user7@test.com",
      password: "123456789",
      picture_profil: "lea.jpg",
      role: "user",
    },
    {
      lastname: "Richard",
      firstname: "Hugo",
      email: "user8@test.com",
      password: "123456789",
      picture_profil: "hugo.jpg",
      role: "user",
    },
    {
      lastname: "Durand",
      firstname: "Chloé",
      email: "user9@test.com",
      password: "123456789",
      picture_profil: "chloe.jpg",
      role: "user",
    },
    {
      lastname: "Lefebvre",
      firstname: "Camille",
      email: "user10@test.com",
      password: "123456789",
      picture_profil: "mathis.jpg",
      role: "user",
    },
  ];

  let count = 0;

  for (const user of users) {
    await prisma.user.create({
      data: {
        ...user,
        password: await bcrypt.hash(user.password, saltRounds),
      },
    });
    count++;
  }

  console.log(`✔ Users seeded! Inserted: ${count}`);
}