import { Dropdown } from './Dropdown';

const MenuItems = ({ items }) => {
	return(
		< li className="dropdown">
			{
				items.submenu ? (
					<>
						<button type='button' aria-haspopup='true' className='nav-link dropdown-toggle'>
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
