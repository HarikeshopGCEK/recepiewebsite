export default function MyRecipies() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-orange-100 via-yellow-100 to-red-100">
            <div className="text-center space-y-6 p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl">
                <h1 className="text-4xl font-bold text-gray-800">My Recipies</h1>
                <div className="space-y-2">
                    <p className="text-2xl font-semibold text-orange-600">Welcome to My Recipies!</p>
                    <p className="text-lg text-gray-600">Discover and share your favorite culinary creations</p>
                </div>
                <p className="text-sm text-gray-500">Edit this recipies page in the <span className="font-bold">src/app/my-recipies/page.js</span> file</p>
                <button className="bg-green-500 text-white p-3 rounded-md hover:bg-green-600 scale-105 hover:scale-110 transition-all duration-300 font-semibold shadow-lg">
                    Explore Recipies
                </button>
            </div>
        </div>
    )
}