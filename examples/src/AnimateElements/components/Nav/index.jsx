import { useActiveElements } from 'react-intersection-observer-kit';
import { Link } from 'react-router-dom';

const navLinks = [
  {
    id: 'introduction',
    label: 'Introduction',
  },
  {
    id: 'features',
    label: 'Features',
  },
  {
    id: 'get-started',
    label: 'Getting Started',
  },
  {
    id: 'examples',
    label: 'Examples',
  },
];

function NavLink({ id, label, isActive }) {
  const handleScroll = () => {
    document.getElementById(id).scrollIntoView();
  };

  return (
    <li
      className={`relative h-fit w-fit  transition-all after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:transition-all ${
        isActive ? 'after:!w-full after:bg-teal-400 text-teal-400' : ''
      }`}
    >
      <button className="block h-full w-full" onClick={handleScroll}>
        {label}
      </button>
    </li>
  );
}

function Nav() {
  const activeElements = useActiveElements();
  return (
    <nav>
      <ul className="w-full flex justify-around items-center p-8 text-white">
        {navLinks.map(link => (
          <NavLink
            {...link}
            key={link.id}
            isActive={activeElements.includes(link.id)}
          />
        ))}
      </ul>
    </nav>
  );
}

export default Nav;
