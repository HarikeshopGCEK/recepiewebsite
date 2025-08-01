'use client';
import { useState } from 'react';

export default function MyRecipies() {
    const [formData, setFormData] = useState({
        name: '',
        recipeName: '',
        address: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        // Here you would typically send the data to your backend
        console.log('Recipe submission:', formData);
    };

    const handleNewSubmission = () => {
        setIsSubmitted(false);
        setFormData({ name: '', recipeName: '', address: '' });
    };

    if (isSubmitted) {
        return (
            <div 
                className="min-h-screen flex flex-col items-center justify-center p-4"
                style={{
                    backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="food-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="2" fill="%23fef3c7" opacity="0.3"/><rect x="5" y="5" width="2" height="2" fill="%23fbbf24" opacity="0.2"/><polygon points="15,5 17,8 14,8" fill="%23f59e0b" opacity="0.2"/></pattern></defs><rect width="100" height="100" fill="url(%23food-pattern)"/></svg>')`,
                    backgroundColor: '#fef3c7'
                }}
            >
                <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
                    <div className="text-6xl mb-4">🎉</div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Thank You!</h1>
                    <p className="text-lg text-gray-600 mb-6">
                        Thank you for submitting your recipe, <span className="font-semibold text-orange-600">{formData.name}</span>!
                    </p>
                    <p className="text-gray-600 mb-6">
                        Your recipe "<span className="font-semibold text-orange-600">{formData.recipeName}</span>" has been received.
                    </p>
                    <p className="text-sm text-gray-500 mb-6">
                        We'll review your submission and get back to you soon.
                    </p>
                    <button 
                        onClick={handleNewSubmission}
                        className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors duration-300 font-semibold"
                    >
                        Submit Another Recipe
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div 
            className="min-h-screen flex flex-col items-center justify-center p-4"
            style={{
                backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="food-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="2" fill="%23fef3c7" opacity="0.3"/><rect x="5" y="5" width="2" height="2" fill="%23fbbf24" opacity="0.2"/><polygon points="15,5 17,8 14,8" fill="%23f59e0b" opacity="0.2"/></pattern></defs><rect width="100" height="100" fill="url(%23food-pattern)"/></svg>')`,
                backgroundColor: '#fef3c7'
            }}
        >
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
                <div className="text-center mb-6">
                    <div className="text-4xl mb-2">👨‍🍳</div>
                    <h1 className="text-3xl font-bold text-gray-800">Recipe Submission</h1>
                    <p className="text-gray-600 mt-2">Share your favorite recipe with us!</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Participant Name *
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            placeholder="Enter your full name"
                        />
                    </div>

                    <div>
                        <label htmlFor="recipeName" className="block text-sm font-medium text-gray-700 mb-1">
                            Recipe Name *
                        </label>
                        <input
                            type="text"
                            id="recipeName"
                            name="recipeName"
                            value={formData.recipeName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            placeholder="Enter your recipe name"
                        />
                    </div>

                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                            Address *
                        </label>
                        <textarea
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            required
                            rows="3"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                            placeholder="Enter your complete address"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-orange-500 text-white py-3 px-4 rounded-md hover:bg-orange-600 transition-colors duration-300 font-semibold text-lg"
                    >
                        Submit Recipe
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500">
                        * All fields are required
                    </p>
                </div>
            </div>
        </div>
    );
}