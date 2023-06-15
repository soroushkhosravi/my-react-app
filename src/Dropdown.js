const Dropdown = ({ submenus }) => {
  return (
    <ul className="dropdown-menu">
      {submenus.map((submenu, index) => (
        <li key={index}>
          <a href={submenu.url} className="dropdown-item">{submenu.title}</a>
        </li>
      ))}
    </ul>
  );
};

export { Dropdown };