import { MenuItems } from './MenuItems'

const NavBar = () => {
	return(
		<nav>
			<ul className="nav">
				{
					MenuItems.map(
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
