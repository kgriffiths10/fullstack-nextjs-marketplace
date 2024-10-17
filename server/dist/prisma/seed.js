"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const prisma = new client_1.PrismaClient();
function deleteAllData(orderedFileNames) {
    return __awaiter(this, void 0, void 0, function* () {
        const modelNames = orderedFileNames.map((fileName) => {
            const modelName = path_1.default.basename(fileName, path_1.default.extname(fileName));
            return modelName.charAt(0).toUpperCase() + modelName.slice(1);
        });
        // Adjust the order based on dependencies
        const deletionOrder = [
            "savedListings", // Start with saved listings
            "messages", // Then delete messages
            "notifications", // Next, notifications
            "transactions", // Then transactions
            "listings", // Delete listings
            "categories", // Categories
            "users", // Now delete users
            "schools" // Finally, delete schools
        ];
        for (const modelName of deletionOrder) {
            const model = prisma[modelName];
            if (model) {
                yield model.deleteMany({});
                console.log(`Cleared data from ${modelName}`);
            }
            else {
                console.error(`Model ${modelName} not found. Please ensure the model name is correctly specified.`);
            }
        }
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const dataDirectory = path_1.default.join(__dirname, "seedData");
        const orderedFileNames = [
            "categories.json",
            "schools.json",
            "users.json",
            "listings.json", // Seed listings first
            "messages.json",
            "savedListings.json", // Then seed savedListings
            "notifications.json",
            "transactions.json",
        ];
        yield deleteAllData(orderedFileNames);
        for (const fileName of orderedFileNames) {
            const filePath = path_1.default.join(dataDirectory, fileName);
            const jsonData = JSON.parse(fs_1.default.readFileSync(filePath, "utf-8"));
            const modelName = path_1.default.basename(fileName, path_1.default.extname(fileName));
            const model = prisma[modelName];
            if (!model) {
                console.error(`No Prisma model matches the file name: ${fileName}`);
                continue;
            }
            for (const data of jsonData) {
                yield model.create({
                    data,
                });
            }
            console.log(`Seeded ${modelName} with data from ${fileName}`);
        }
    });
}
main()
    .catch((e) => {
    console.error(e);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
/* Learning Notes:

  - This script is used to seed the Prsima database with data from JSON files.
  

  - import { PrismaClient } from "@prisma/client"; :  This is used to interact with your Prisma-managed database.
  - import fs from "fs"; : This is used to read the contents of the JSON files.
  - import path from "path"; : This is used to work with file paths.

  - const prisma = new PrismaClient(); : This creates a new instance of the PrismaClient.


  *** If adding a new .json seed file, update in orderedFileNames array (order matters becaue of dependencies such as foreign keys),
  add to schema.prisma and rerun npx prisma db seed ***)
  
*/ 
