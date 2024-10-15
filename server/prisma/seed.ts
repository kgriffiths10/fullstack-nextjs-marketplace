import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
const prisma = new PrismaClient();

async function deleteAllData(orderedFileNames: string[]) {
  const modelNames = orderedFileNames.map((fileName) => {
    const modelName = path.basename(fileName, path.extname(fileName));
    return modelName.charAt(0).toUpperCase() + modelName.slice(1);
  });

  // Adjust the order based on dependencies
  const deletionOrder = [
    "savedListings", // Start with saved listings
    "messages",      // Then delete messages
    "notifications", // Next, notifications
    "transactions",  // Then transactions
    "listings",      // Delete listings
    "categories",    // Categories
    "users",         // Now delete users
    "schools"        // Finally, delete schools
  ];

  for (const modelName of deletionOrder) {
    const model: any = prisma[modelName as keyof typeof prisma];
    if (model) {
      await model.deleteMany({});
      console.log(`Cleared data from ${modelName}`);
    } else {
      console.error(
        `Model ${modelName} not found. Please ensure the model name is correctly specified.`
      );
    }
  }
}

async function main() {
  const dataDirectory = path.join(__dirname, "seedData");

  const orderedFileNames = [
    "categories.json",
    "schools.json",
    "users.json",
    "listings.json",      // Seed listings first
    "messages.json",
    "savedListings.json",  // Then seed savedListings
    "notifications.json",
    "transactions.json",
  ];

  await deleteAllData(orderedFileNames);

  for (const fileName of orderedFileNames) {
    const filePath = path.join(dataDirectory, fileName);
    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const modelName = path.basename(fileName, path.extname(fileName));
    const model: any = prisma[modelName as keyof typeof prisma];

    if (!model) {
      console.error(`No Prisma model matches the file name: ${fileName}`);
      continue;
    }

    for (const data of jsonData) {
      await model.create({
        data,
      });
    }

    console.log(`Seeded ${modelName} with data from ${fileName}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });






  /* Learning Notes:

    - This script is used to seed the Prsima database with data from JSON files.
    

    - import { PrismaClient } from "@prisma/client"; :  This is used to interact with your Prisma-managed database.
    - import fs from "fs"; : This is used to read the contents of the JSON files.
    - import path from "path"; : This is used to work with file paths.

    - const prisma = new PrismaClient(); : This creates a new instance of the PrismaClient.


    *** If adding a new .json seed file, update in orderedFileNames array (order matters becaue of dependencies such as foreign keys),
    add to schema.prisma and rerun npx prisma db seed ***)
    
  */