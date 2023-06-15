const Dropdown = ({ submenus }) => {
  return (
    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
      {submenus.map((submenu, index) => (
        <li key={index}>
          <a href={submenu.url} target="_blanck">{submenu.title}</a>
        </li>
      ))}
    </ul>
  );
};

export { Dropdown };