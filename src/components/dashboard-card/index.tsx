export default function DashboardCard() {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
        <img src="image-url.jpg" alt="Card Image" className="w-full h-32 object-cover mb-4 rounded-md" />
        <h3 className="text-xl font-semibold mb-2">Card Title</h3>
        <p className="text-gray-600">This is a simple card element designed using Tailwind CSS.</p>
        <a href="#" className="text-blue-500 mt-2 inline-block hover:underline">Read more</a>
    </div>
  );
}
