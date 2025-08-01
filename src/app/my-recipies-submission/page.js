'use client';
import { useState } from 'react';

export default function MyRecipiesSubmision() {
    const [formData, setFormData] = useState({
        participantName: '',
        recipeName: '',
        recipeDetails: ''
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
    };

    const handleNewSubmission = () => {
        setIsSubmitted(false);
        setFormData({
            participantName: '',
            recipeName: '',
            recipeDetails: ''
        });
    };

    if (isSubmitted) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-red-900 via-orange-800 to-yellow-800">
                <div className="text-center space-y-6 p-8 bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl max-w-md border border-white/20">
                    <div className="text-6xl mb-4">🎉</div>
                    <h1 className="text-3xl font-bold text-orange-300">Thank You!</h1>
                    <p className="text-lg text-gray-200">
                        Thank you for submitting your recipe, <span className="font-semibold text-orange-300">{formData.participantName}</span>!
                    </p>
                    <p className="text-md text-gray-300">
                        Your recipe "<span className="font-semibold">{formData.recipeName}</span>" has been successfully submitted.
                    </p>
                    <p className="text-sm text-gray-400">
                        We'll review your submission and get back to you soon.
                    </p>
                    <button
                        onClick={handleNewSubmission}
                        className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-3 rounded-md hover:from-orange-600 hover:to-red-600 scale-105 hover:scale-110 transition-all duration-300 font-semibold shadow-lg"
                    >
                        Submit Another Recipe
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-900 via-orange-800 to-yellow-800 p-4">
            <div className="w-full max-w-2xl bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">Recipe Submission</h1>
                    <p className="text-lg text-gray-200">Share your culinary masterpiece with us!</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="participantName" className="block text-sm font-semibold text-gray-200 mb-2">
                            Participant Name *
                        </label>
                        <input
                            type="text"
                            id="participantName"
                            name="participantName"
                            value={formData.participantName}
                            onChange={handleInputChange}
                            required
                            className="w-full p-3 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/10 text-white placeholder-gray-300"
                            placeholder="Enter your full name"
                        />
                    </div>

                    <div>
                        <label htmlFor="recipeName" className="block text-sm font-semibold text-gray-200 mb-2">
                            Recipe Name *
                        </label>
                        <input
                            type="text"
                            id="recipeName"
                            name="recipeName"
                            value={formData.recipeName}
                            onChange={handleInputChange}
                            required
                            className="w-full p-3 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/10 text-white placeholder-gray-300"
                            placeholder="Enter your recipe name"
                        />
                    </div>

                    <div>
                        <label htmlFor="recipeDetails" className="block text-sm font-semibold text-gray-200 mb-2">
                            Recipe Details *
                        </label>
                        <textarea
                            id="recipeDetails"
                            name="recipeDetails"
                            value={formData.recipeDetails}
                            onChange={handleInputChange}
                            required
                            rows="6"
                            className="w-full p-3 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-vertical bg-white/10 text-white placeholder-gray-300"
                            placeholder="Please include:&#10;- Ingredients list&#10;- Step-by-step instructions&#10;- Cooking time and servings&#10;- Any special tips or notes"
                        />
                    </div>

                    <div className="flex justify-center pt-4">
                        <button
                            type="submit"
                            className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-md hover:from-orange-600 hover:to-red-600 scale-105 hover:scale-110 transition-all duration-300 font-semibold shadow-lg text-lg px-8"
                        >
                            Submit Recipe
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}