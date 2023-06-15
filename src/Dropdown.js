const Dropdown = ({ submenus }) => {
console.log(submenus);
  return (
    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
      {submenus.map((submenu, index) => (
        <li key={index}>
          <a href={submenu.url} className="dropdown-item">{submenu.title}</a>
        </li>
      ))}
    </ul>
  );
};

export { Dropdown };