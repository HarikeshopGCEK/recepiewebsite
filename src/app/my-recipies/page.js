export default function MyRecipies() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
                <div className="absolute top-40 left-1/2 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
            </div>
            
            {/* Floating particles */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-bounce"></div>
                <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-yellow-300 rounded-full animate-bounce delay-100"></div>
                <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-pink-300 rounded-full animate-bounce delay-200"></div>
                <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-blue-300 rounded-full animate-bounce delay-300"></div>
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
                <div className="text-center space-y-8 p-8 bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 max-w-4xl">
                    <h1 className="text-6xl font-bold text-white mb-4 bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
                        My Recipies
                    </h1>
                    
                    <div className="space-y-4">
                        <p className="text-3xl font-semibold text-yellow-300">Welcome to My Recipies!</p>
                        <p className="text-xl text-gray-200 leading-relaxed">
                            Discover, create, and share your favorite culinary masterpieces with the world
                        </p>
                    </div>

                    {/* Features section */}
                    <div className="grid md:grid-cols-3 gap-6 my-8">
                        <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/20">
                            <h3 className="text-xl font-bold text-white mb-2">🍳 Easy Cooking</h3>
                            <p className="text-gray-200 text-sm">Step-by-step instructions for perfect results every time</p>
                        </div>
                        <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/20">
                            <h3 className="text-xl font-bold text-white mb-2">👥 Share & Connect</h3>
                            <p className="text-gray-200 text-sm">Connect with fellow food lovers and share your creations</p>
                        </div>
                        <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/20">
                            <h3 className="text-xl font-bold text-white mb-2">📱 Mobile Friendly</h3>
                            <p className="text-gray-200 text-sm">Access your recipes anywhere, anytime on any device</p>
                        </div>
                    </div>

                    {/* Call to action section */}
                    <div className="space-y-6">
                        <p className="text-lg text-gray-300">
                            Ready to start your culinary journey? Join thousands of home cooks who trust our platform!
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-4 rounded-xl hover:from-green-600 hover:to-emerald-600 scale-105 hover:scale-110 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl">
                                🍽️ Explore Recipies
                            </button>
                            <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl hover:from-purple-600 hover:to-pink-600 scale-105 hover:scale-110 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl">
                                ✍️ Add New Recipe
                            </button>
                        </div>
                    </div>

                    {/* Additional info */}
                    <div className="mt-8 pt-6 border-t border-white/20">
                        <p className="text-sm text-gray-400">
                            Edit this recipies page in the <span className="font-bold text-yellow-300">src/app/my-recipies/page.js</span> file
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                            Built with ❤️ using Next.js and Tailwind CSS
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}