import { menuItems } from './menuItems'

const NavBar = () => {
	return(
		<nav>
			<ul className="nav">
				{
					menuItems.map(
						(menu, index) => {
							return (
								<li className="nav-item" key={index}>
									<a className="nav-link" href={ menu.url }>{ menu.title }</a>
								</li>
							)
						}
					)
				}
			</ul>
		</nav>
	)
}

export { NavBar }
