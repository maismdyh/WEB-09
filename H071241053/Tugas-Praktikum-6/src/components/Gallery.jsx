import foto1 from '../assets/gallery/picture-1.jpg';
import foto2 from '../assets/gallery/picture-2.jpg';
import foto3 from '../assets/gallery/picture-3.jpg';
import foto4 from '../assets/gallery/picture-4.jpg';

function Gallery() {
  const galleryPhotos = [
    { id: 1, src: foto1, alt: 'ini wonyoung', caption: 'ngelag' },
    { id: 2, src: foto2, alt: 'Deskripsi foto 2', caption: 'mewing' },
    { id: 3, src: foto3, alt: 'Deskripsi foto 3', caption: 'emo' },
    { id: 4, src: foto4, alt: 'Deskripsi foto 4', caption: 'dajal' }
  ];

  return (
    <section id="gallery" className="bg-white text-pink-900 py-20">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8 text-pink-600">My Gallery</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {galleryPhotos.map((foto) => (
            <div key={foto.id} className="bg-pink-50 rounded-2xl overflow-hidden shadow-lg shadow-pink-200/60 border border-pink-200">
              <img
                src={foto.src}
                alt={foto.alt}
                className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
              />
              <div className="p-3">
                <p className="text-sm text-pink-800">{foto.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Gallery;