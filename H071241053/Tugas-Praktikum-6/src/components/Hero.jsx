function Hero() {
  const handleButtonClick = () => {
    console.log("Tombol 'Hubungi Saya' diklik!");
  };

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-br from-pink-100 via-pink-50 to-rose-100 text-pink-900 min-h-screen flex items-center pt-16"
    >
      <div className="pointer-events-none absolute -top-16 -left-16 h-64 w-64 rounded-full bg-pink-300/40 blur-3xl"></div>
      <div className="pointer-events-none absolute -bottom-20 -right-16 h-72 w-72 rounded-full bg-rose-300/40 blur-3xl"></div>

      <div className="relative max-w-6xl mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Haii! Saya <span className="text-pink-600">Maisyah Mahdiyyah</span>
          </h1>
          <p className="text-pink-800 text-lg">
            Hey there I am using WhatsApp! Tidak dapat berbicara, WhatsApp saja.
          </p>
          <div>
            <button
              className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg shadow-pink-300/60 transition-all hover:-translate-y-0.5 cursor-pointer"
            >
              Call Me
            </button>
          </div>
        </div>
        <div className="flex justify-center">
          <img
            src="/profile.jpg"
            alt="Foto Profil"
            className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-full shadow-2xl shadow-pink-300/60 border-4 border-white ring-4 ring-pink-300"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;