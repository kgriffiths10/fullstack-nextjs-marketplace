import { Router } from 'express';
import { getListings } from '../controllers/marketplaceController';
import { createListing } from '../controllers/marketplaceController';

const router = Router();

router.get('/', getListings); 
router.post('/', createListing); 
export default router;
