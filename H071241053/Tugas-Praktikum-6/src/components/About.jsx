const biodata = [
  { id: 1, label: 'Name', value: 'Maisyah Mahdiyyah' },
  { id: 2, label: 'University', value: 'ITB' },
  { id: 3, label: 'Major', value: 'Sastra Mesin' },
  { id: 4, label: 'Country', value: 'Depok' }
];

function About() {
  return (
    <section id="about" className="scroll-mt-16 bg-white py-20 text-pink-900">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-6 text-center text-3xl font-bold text-pink-600">About Me</h2>
        <p className="mx-auto max-w-2xl text-center text-pink-800">
          asemleketehe
        </p>
        <dl className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {biodata.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-pink-200 bg-pink-50 p-4 shadow-lg shadow-pink-200/50"
            >
              <dt className="text-sm text-pink-500">{item.label}</dt>
              <dd className="font-semibold text-pink-900">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export default About;