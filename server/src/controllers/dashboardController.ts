import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getDashboardMetrics = async (
    req: Request, 
    res: Response
): Promise<void> => {
    try {

        // Simulating a logged-in user by hardcoding the user ID
        const userId = "88fd2562-e45e-4a02-a50f-66cf9b5b1651";
        
        // Count of listings for signed in user from listings table/prisma model
        const activeListingsCount = await prisma.listings.count({
            where: {
                user_id: userId,
                status: 'active'
            }
        });

        // Count of listing views from listing table/prisma model for the signed in user's listings.
        const listingViewsCount = await prisma.listings.aggregate({
            _sum: {
                listing_views: true
            },
            where: {
                user_id: userId
            }
        }); 

        // Count of saved items from saved items table/prisma model for signed in user.
        const savedListingsCount = await prisma.savedListings.count({
            where: {
                user_id: userId
            }
        });

        // Total amount of listings sales that have been sold from transactions table/prisma model for signed in user.
        const soldListingsAmount = await prisma.transactions.aggregate({
            _sum: {
                price: true // Summing the price for all transactions where the seller is the user
            },
            where: {
                seller_id: userId,
            }
        });

        // Recent listings from listings table/prisma model
        const recentListings = await prisma.listings.findMany({ 
            take: 5,
            orderBy: {
                created_at: 'desc'
            },
            include: {
                category: {
                    select: {
                        category_name: true
                    }
                }
            }
        });

        const recentListingsWithCategories = recentListings.map((listing) => ({
            listing_id: listing.listing_id,
            title: listing.title,
            price: listing.price,
            description: listing.description,
            created_at: listing.created_at.toLocaleDateString('en-US', { // Format date
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }),
            category_name: listing.category.category_name, // Get the category name
            thumbnail: listing.image_paths
            
            
        }));

        // Finding the top 4 most popular listing categories
        const popularCategories = await prisma.listings.groupBy({
            by: ['category_id'],
            _count: {
                listing_id: true, // Count the number of listings in each category
            },
            orderBy: {
                _count: {
                    listing_id: 'desc' // Order by count in descending order
                }
            },
            take: 4 
        });

        // Fetching category names for the popular categories
        const categoriesWithCounts = await Promise.all(
            popularCategories.map(async (category) => {
                const categoryData = await prisma.categories.findUnique({
                    where: {
                        category_id: category.category_id
                    },
                    select: {
                        category_name: true
                    }
                });

                return {
                    category_name: categoryData?.category_name,
                    count: category._count.listing_id
                };
            })
        );

        res.json({
            activeListingsCount,
            listingViewsCount,
            savedListingsCount,
            soldListingsAmount,
            recentListings: recentListingsWithCategories,
            popularCategories: categoriesWithCounts
        })

    } catch (error) {
        res.status(500).json({ message: "Error retreiving dashboard metrics" });
    }
}