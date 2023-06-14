import { menuItems } from './menuItems';
import { MenuItems } from './MenuItemComponents';

const NavBar = () => {
	return(
		<nav>
			<ul className="nav">
				{
					menuItems.map(
						(menu, index) => {
							return <MenuItems items={menu} key={index} />;
						}
					)
				}
			</ul>
		</nav>
	)
}

export { NavBar }
