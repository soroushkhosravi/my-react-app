import { Dropdown } from './Dropdown';

const MenuItems = ({ items }) => {
	return(
		< li className="dropdown">
			{
				items.submenu ? (
					<>
						<button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
							{ items.title}{ ' ' }
							<Dropdown submenus={items.submenu} />
						</button>
					</>
				) : (
					<a href={items.url} className='nav-link'>{ items.title}</a>
				)
			}
		</li>
	)
}

export { MenuItems }
