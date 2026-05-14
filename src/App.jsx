import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import DeleteConfirmation from './components/DeleteConfirmation';
import { deleteProduct } from './store/productsSlice';

function App() {
    const [editingProduct, setEditingProduct] = useState(null);
    const [deletingProduct, setDeletingProduct] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const dispatch = useDispatch();

    const handleConfirmDelete = (id) => {
        dispatch(deleteProduct(id));
        setDeletingProduct(null);
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans antialiased text-black">

            <main className="w-full">
                <div className="w-full">
                    <div className="px-10 py-10 flex justify-between items-center">
                        <h1 className="text-4xl font-black uppercase tracking-tighter text-black">Crud user db</h1>
                        <button 
                            onClick={() => setIsAdding(true)}
                            className="bg-black text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-gray-900 transition-all active:scale-95 text-sm shadow-xl"
                        >
                            Add Product
                        </button>
                    </div>
                    <ProductList 
                        setEditingProduct={setEditingProduct} 
                        setDeletingProduct={setDeletingProduct}
                    />
                </div>
            </main>
            <ProductForm 
                editingProduct={editingProduct} 
                isAdding={isAdding}
                clearEditing={() => {
                    setEditingProduct(null);
                    setIsAdding(false);
                }} 
            />

            <DeleteConfirmation 
                product={deletingProduct}
                onConfirm={handleConfirmDelete}
                onCancel={() => setDeletingProduct(null)}
            />
        </div>
    );
}

export default App;
