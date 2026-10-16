const menus = [
  { id: 1, name: 'Home', href: '#home' },
  { id: 2, name: 'About', href: '#about' },
  { id: 3, name: 'Skills', href: '#skills' },
  { id: 4, name: 'Gallery', href: '#gallery' }
];

function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-pink-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <span className="text-lg font-extrabold text-pink-600 sm:text-xl">Portofolio ♡</span>
        <ul className="flex gap-3 text-xs font-medium text-pink-900 sm:gap-6 sm:text-sm">
          {menus.map((menu) => (
            <li key={menu.id}>
              <a
                href={menu.href}
                onClick={() => console.log(menu.name)}
                className="transition hover:text-pink-600"
              >
                {menu.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;