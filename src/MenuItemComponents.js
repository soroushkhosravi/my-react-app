import { Dropdown } from './Dropdown';

const MenuItems = ({ items }) => {
	return(
		< li className="dropdown">
			{
				items.submenu ? (
					<>
						<button className="nav-link dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={(event) => (event.target.blur())}>
							{ items.title}{ ' ' }
						</button>
						<Dropdown submenus={items.submenu} />
					</>
				) : (
					<a href={items.url} className='nav-link'>{ items.title}</a>
				)
			}
		</li>
	)
}

export { MenuItems }
