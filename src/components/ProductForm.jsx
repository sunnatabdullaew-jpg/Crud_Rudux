import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateProduct, addProduct } from '../store/productsSlice';

const ProductForm = ({ editingProduct, isAdding, clearEditing }) => {
    const [product, setProduct] = useState({ name: '', price: '', category: '' });
    const dispatch = useDispatch();

    useEffect(() => {
        if (editingProduct) {
            setProduct(editingProduct);
        } else if (isAdding) {
            setProduct({ name: '', price: '', category: '' });
        }
    }, [editingProduct, isAdding]);

    if (!editingProduct && !isAdding) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingProduct) {
            dispatch(updateProduct(product));
        } else if (isAdding) {
            dispatch(addProduct({ ...product, id: Date.now().toString() }));
        }
        clearEditing();
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-all duration-300 ease-in-out">
            <div className="bg-white p-16 py-20 rounded-[4rem] w-full max-w-2xl shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] border border-gray-100 transform transition-all scale-100 animate-in zoom-in-95 duration-200">
                <div className="text-center mb-14">
                    <h2 className="text-4xl font-black uppercase tracking-tighter text-black">
                        {editingProduct ? 'Edit' : 'Add Product'}
                    </h2>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-10">
                    <div className="space-y-3">
                        <label className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Identity Tag</label>
                        <input
                            type="text"
                            required
                            placeholder="Product Name"
                            className="w-full bg-white border border-gray-100 px-8 py-6 rounded-[1.5rem] focus:ring-2 focus:ring-black focus:border-black transition-all font-black text-2xl placeholder:text-gray-200 outline-none shadow-sm"
                            value={product.name}
                            onChange={(e) => setProduct({ ...product, name: e.target.value })}
                        />
                    </div>
                    <div className="space-y-3">
                        <label className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Value Registry</label>
                        <div className="relative">
                            <input
                                type="number"
                                required
                                placeholder="0.00"
                                className="w-full bg-white border border-gray-100 px-8 py-6 rounded-[1.5rem] focus:ring-2 focus:ring-black focus:border-black transition-all font-black text-2xl placeholder:text-gray-200 outline-none shadow-sm"
                                value={product.price}
                                onChange={(e) => setProduct({ ...product, price: Number(e.target.value) })}
                            />
                        </div>
                    </div>
                    <div className="space-y-3">
                        <label className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Category Classification</label>
                        <input
                            type="text"
                            required
                            placeholder="Category"
                            className="w-full bg-white border border-gray-100 px-8 py-6 rounded-[1.5rem] focus:ring-2 focus:ring-black focus:border-black transition-all font-black text-2xl placeholder:text-gray-200 outline-none shadow-sm"
                            value={product.category}
                            onChange={(e) => setProduct({ ...product, category: e.target.value })}
                        />
                    </div>
                    
                    <div className="flex flex-col gap-5 pt-10">
                        <button 
                            type="submit"
                            className="w-full bg-black text-white py-6 rounded-2xl font-bold uppercase tracking-widest hover:bg-gray-900 transition-all active:scale-[0.98]"
                        >
                            {editingProduct ? 'Save' : 'Add'}
                        </button>
                        <button 
                            type="button" 
                            onClick={clearEditing}
                            className="w-full bg-gray-100 text-gray-500 py-4 rounded-2xl font-bold uppercase tracking-widest hover:text-black transition-all"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductForm;
