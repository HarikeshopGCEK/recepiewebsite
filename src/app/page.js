export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Hello World</h1>
      <p className="text-lg">This is a simple landing page</p>
      <p>Edit this landing page in the <span className="font-bold">src/app/page.js</span> file</p>
      <button className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 scale-105 hover:scale-110 transition-all duration-300">Click me</button>
    </div>

  )
}