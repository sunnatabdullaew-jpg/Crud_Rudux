import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../store/productsSlice';

const ProductList = ({ setEditingProduct, setDeletingProduct }) => {
    const dispatch = useDispatch();
    const { items, status, error } = useSelector((state) => state.products);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProducts());
        }
    }, [status, dispatch]);

    if (status === 'loading') {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
            </div>
        );
    }



    return (
        <div className="w-full">
            <table className="w-full border-collapse">
                <thead>
                    <tr className="text-left text-[11px] font-black uppercase tracking-[0.3em] text-gray-400 bg-white border-b border-gray-100">
                        <th className="px-10 py-6">Product Name</th>
                        <th className="px-10 py-6">Price</th>
                        <th className="px-10 py-6">Category</th>
                        <th className="px-10 py-6 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((product) => (
                        <tr key={product.id} className="bg-white border-b border-gray-100 last:border-none transition-colors hover:bg-gray-50">
                            <td className="px-10 py-8 font-black text-xl tracking-tighter text-black">
                                {product.name}
                            </td>
                            <td className="px-10 py-8 text-black">
                                <span className="font-bold text-xl">${product.price}</span>
                            </td>
                            <td className="px-10 py-8">
                                <span className="inline-block px-4 py-1 rounded-full bg-gray-100 text-[10px] font-black uppercase tracking-widest text-gray-400">
                                    {product.category}
                                </span>
                            </td>
                            <td className="px-10 py-8 text-right">
                                <div className="flex justify-end items-center gap-8">
                                    <button 
                                        onClick={() => setEditingProduct(product)}
                                        className="text-[11px] font-black uppercase tracking-widest text-black hover:underline underline-offset-4"
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        onClick={() => setDeletingProduct(product)}
                                        className="text-[11px] font-black uppercase tracking-widest text-red-500 hover:text-red-700 transition-colors font-bold"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {items.length === 0 && (status === 'succeeded') && (
                <div className="text-center py-32">
                    <p className="text-gray-300 font-black uppercase tracking-[0.5em] text-sm">Cluster Registry Empty</p>
                </div>
            )}
        </div>
    );
};

export default ProductList;
