const skills = ['frugal living', 'dancing', 'singing', 'bengong', 'coding'];

function Skills() {
  return (
    <section id="skills" className="scroll-mt-16 bg-pink-50 py-20 text-pink-900">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <h2 className="mb-8 text-3xl font-bold text-pink-600">My Skills</h2>
        <ul className="flex flex-wrap justify-center gap-3">
          {skills.map((skill, index) => (
            <li
              key={index}
              className="rounded-full border border-pink-300 bg-white px-5 py-2 font-medium text-pink-700 shadow-sm transition hover:bg-pink-600 hover:text-white"
            >
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Skills;