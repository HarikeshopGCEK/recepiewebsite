export default function MyRecipies() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">My Recipies</h1>
            <p className="text-lg">This is a simple recipies page</p>
            <p>Edit this recipies page in the <span className="font-bold">src/app/my-recipies/page.js</span> file</p>
            <button className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 scale-105 hover:scale-110 transition-all duration-300">Click me</button>
        </div>
    )
}