import React from 'react';

const DeleteConfirmation = ({ product, onConfirm, onCancel }) => {
    if (!product) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-all duration-300 ease-in-out">
            <div className="bg-white p-12 py-16 rounded-[3rem] w-full max-w-lg shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] border border-gray-100 transform transition-all scale-100 animate-in zoom-in-95 duration-200 text-center">
                <div className="mb-10">
                    <h2 className="text-3xl font-black uppercase tracking-tighter text-black">Are you sure delete?</h2>
                </div>
                
                <div className="flex flex-col gap-3">
                    <button 
                        onClick={() => onConfirm(product.id)}
                        className="w-full bg-black text-white py-5 rounded-2xl font-bold uppercase tracking-widest hover:bg-gray-900 transition-all active:scale-[0.98]"
                    >
                        Delete
                    </button>
                    <button 
                        onClick={onCancel}
                        className="w-full bg-gray-100 text-gray-500 py-4 rounded-2xl font-bold uppercase tracking-widest hover:text-black transition-all"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmation;
