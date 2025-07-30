export default function MyRecipies() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-orange-100 to-yellow-100">
            <h1 className="text-4xl font-bold text-orange-800 mb-4">My Recipies</h1>
            <p className="text-lg text-gray-700 mb-2">This is a simple recipies page</p>
            <p className="text-gray-600 mb-6 text-center max-w-md">
                Welcome to the recipe page! Here you can discover delicious recipes, 
                cooking tips, and culinary inspiration. Explore our collection of 
                mouth-watering dishes and start your culinary journey today.
            </p>
            <p className="text-sm text-gray-500 mb-6">Edit this recipies page in the <span className="font-bold">src/app/my-recipies/page.js</span> file</p>
            <button className="bg-green-500 text-white p-3 rounded-md hover:bg-green-600 scale-105 hover:scale-110 transition-all duration-300 font-semibold shadow-lg">Click me</button>
        </div>
    )
}