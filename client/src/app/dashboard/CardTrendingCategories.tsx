import React from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip, LabelList } from 'recharts';
import { useGetDashbaordMetricsQuery } from '@/state/api';

const CardTrendingCategories = () => {
    const { data: dashboardMetrics, isLoading } = useGetDashbaordMetricsQuery();

    if (!dashboardMetrics) return null;

    // Calculate the total count for all categories
    const totalCount = dashboardMetrics?.popularCategories.reduce((total, category) => total + category.count, 0);

    // Convert count to percentage
    const dataWithPercentages = dashboardMetrics?.popularCategories.map((category) => ({
        ...category,
        percentage: ((category.count / totalCount) * 100).toFixed(2), // convert to percentage and format to 2 decimal places
    }));

    return (
        <div className='col-span-2 row-span-1 md:col-span-4 md:row-span-3 xl:col-span-3 xl:row-span-3 p-8 rounded-xl bg-white'>
            <div>
                <h3 className='text-2xl font-semibold'>Trending Categories</h3>
                <h4 className='text-gray-500 mb-4'>Top listed categories</h4>
            </div>
            <ResponsiveContainer width='100%' height={175} className='px-0'>
                <BarChart
                    data={dataWithPercentages}
                    layout="vertical" 
                    margin= {{ top: 0, right: 0, left: 20, bottom: 0 }}
                   
                >
                    <XAxis type="number" tick={false} axisLine={false} />
                    <YAxis dataKey="category_name" type="category" /> 
                    <Bar dataKey='percentage' fill='rgb(59, 130, 246)'>
                        <LabelList dataKey="percentage" position="right" formatter={(value: string) => `${value}%`} />
                    </Bar> 
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default CardTrendingCategories;
