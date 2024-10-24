"use-client";

import React, { ChangeEvent, FormEvent, useState } from 'react';
import { v4 } from 'uuid';
import Header from '@/app/(components)/Header';
import { useGetListingsQuery } from '@/state/api';


type ListingFormData = {
  listing_id: string;
  title: string;
  description: string;
  price: number;
  category_id: string;
  location: string;
  image_paths: string[];
  condition: string;
};

type CreateListingModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (FormData: ListingFormData) => void;
};

const CreateListingModal = ({ isOpen, onClose, onCreate }: CreateListingModalProps) => {
  const [formData, setFormData] = useState<ListingFormData>({
    listing_id: v4(),
    title: '',
    description: '',
    price: 0,
    category_id: '',
    location: '',
    image_paths: [],
    condition: '',
  });

  const { data: listings } = useGetListingsQuery();


  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'price' ? parseFloat(value) : value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onCreate(formData); // Pass the complete form data
    onClose();
  };


  if (!isOpen) return null;

  const labelCssStyles = 'block text-sm font-semibold text-gray-600 mt-4';
  const inputCssStyles = 'block w-full border rounded-full px-4 py-2';

  return (
    <div className='fixed inset-0 bg-gray-500 bg-opacity-50 overflow-y-auto h-full w-full z-20'>
      <div className='relative top-20 mx-auto p-4 border w-96 rounded-lg bg-white'>
        <Header name='Create New Listing' />
        <form onSubmit={handleSubmit}>
          <label htmlFor='title' className={labelCssStyles}>Title</label>
          <input
            type='text'
            id='title'
            name='title'
            placeholder='Enter title'
            onChange={handleChange}
            value={formData.title}
            className={inputCssStyles}
            required
          />

          <label htmlFor='description' className={labelCssStyles}>Description</label>
          <input
            type='text'
            id='description'
            name='description'
            placeholder='Enter description'
            onChange={handleChange}
            value={formData.description}
            className={inputCssStyles}
            required
          />

          <label htmlFor='price' className={labelCssStyles}>Price</label>
          <input
            type='number'
            id='price'
            name='price'
            placeholder='Enter price'
            onChange={handleChange}
            value={formData.price}
            className={inputCssStyles}
            required
          />

          <label htmlFor='category_id' className={labelCssStyles}>Category</label>
          <select
            id='category_id'
            name='category_id'
            onChange={handleChange}
            value={formData.category_id}  // Assign the selected category ID
            className={inputCssStyles}
            required
          >
            <option value=''>Select category</option>
            {listings?.categoryNames.map((category: { category_id: string, category_name: string }) => (
              <option key={category.category_id} value={category.category_id}>
                {category.category_name}
              </option>
            ))}
          </select>

          <label htmlFor='location' className={labelCssStyles}>Location</label>
          <input
            type='text'
            id='location'
            name='location'
            placeholder='Enter location'
            onChange={handleChange}
            value={formData.location}
            className={inputCssStyles}
            required
          />

          <label htmlFor='condition' className={labelCssStyles}>Condition</label>
          <select
            id='condition'
            name='condition'
            onChange={handleChange}
            value={formData.condition}
            className={inputCssStyles}
            required
          >
            <option value=''>Select condition</option>
            <option value='new'>New</option>
            <option value='used'>Used</option>
          </select>

          <button type='submit' className='mt-8 px-4 py-2 bg-blue-500 text-white rounded-full'>
            Create
          </button>
          <button type='button' onClick={onClose} className='ml-4 mt-4 px-4 py-2 bg-gray-500 text-white rounded-full'>
            Cancel
          </button>
          
        </form>
      </div>
    </div>
  );
};

export default CreateListingModal;
