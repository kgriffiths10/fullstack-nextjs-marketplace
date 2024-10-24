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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createListing = exports.getListings = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Simulating a logged-in user by hardcoding the user ID
const userId = "88fd2562-e45e-4a02-a50f-66cf9b5b1651";
const getListings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const search = (_a = req.query.search) === null || _a === void 0 ? void 0 : _a.toString();
        const marketplaceListingsRaw = yield prisma.listings.findMany({
            where: {
                title: {
                    contains: search
                }
            },
            include: {
                category: {
                    select: {
                        category_name: true,
                    }
                },
                user: {
                    select: {
                        first_name: true,
                        last_name: true,
                    }
                }
            }
        });
        const marketplaceListings = marketplaceListingsRaw.map(listing => {
            var _a, _b, _c;
            return ({
                listing_id: listing.listing_id,
                title: listing.title,
                price: listing.price,
                description: listing.description,
                created_at: listing.created_at.toLocaleDateString(),
                category_name: (_a = listing.category) === null || _a === void 0 ? void 0 : _a.category_name, // Get the category name
                seller_name: `${(_b = listing.user) === null || _b === void 0 ? void 0 : _b.first_name} ${(_c = listing.user) === null || _c === void 0 ? void 0 : _c.last_name}`, // Combine first_name and last_name
                image_paths: listing.image_paths,
                location: listing.location,
                status: listing.status
            });
        });
        const userListingsRaw = yield prisma.listings.findMany({
            where: {
                user_id: userId,
                title: {
                    contains: search
                }
            },
            include: {
                category: {
                    select: {
                        category_name: true,
                    }
                },
            }
        });
        const userListings = userListingsRaw.map(listing => {
            var _a;
            return ({
                listing_id: listing.listing_id,
                title: listing.title,
                price: listing.price,
                description: listing.description,
                created_at: listing.created_at.toLocaleDateString(),
                category_name: (_a = listing.category) === null || _a === void 0 ? void 0 : _a.category_name, // Get the category name
                image_paths: listing.image_paths,
                location: listing.location,
                status: listing.status
            });
        });
        const categoryNames = yield prisma.categories.findMany({
            select: {
                category_id: true,
                category_name: true
            }
        });
        res.json({
            marketplaceListings,
            userListings,
            categoryNames
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving listings' });
    }
});
exports.getListings = getListings;
const createListing = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, price, category_id, condition, location } = req.body;
        const listing = yield prisma.listings.create({
            data: {
                title,
                description,
                price,
                condition,
                location,
                category_id,
                user_id: userId,
                status: 'active',
                is_trade: false,
                image_paths: [],
                listing_views: 0
            }
        });
        res.status(201).json(listing);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating listing' });
    }
});
exports.createListing = createListing;
