export default function MyRecipies() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-red-900 via-orange-800 to-yellow-800">
            <div className="text-center space-y-6 p-8 bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20">
                <h1 className="text-4xl font-bold text-white">My Recipies</h1>
                <div className="space-y-2">
                    <p className="text-2xl font-semibold text-orange-300">Welcome to My Recipies!</p>
                    <p className="text-lg text-gray-200">Discover and share your favorite culinary creations</p>
                </div>
                <p className="text-sm text-gray-300">Edit this recipies page in the <span className="font-bold">src/app/my-recipies/page.js</span> file</p>
                <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-3 rounded-md hover:from-orange-600 hover:to-red-600 scale-105 hover:scale-110 transition-all duration-300 font-semibold shadow-lg">
                    Explore Recipies
                </button>
            </div>
        </div>
    )
}