import { videoTutorials } from '../../data/videoTutorials';

export default function VideoTutorials() {
  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Tutoriales Paso a Paso
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videoTutorials.map((tutorial) => (
          <div key={tutorial.id} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="aspect-w-16 aspect-h-9 bg-gray-100">
              <img
                src={tutorial.thumbnail}
                alt={tutorial.title}
                className="object-cover"
              />
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
                {tutorial.duration}
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-medium text-gray-900">{tutorial.title}</h3>
              <p className="mt-1 text-sm text-gray-500">{tutorial.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}