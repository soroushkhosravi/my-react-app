import { Dropdown } from './Dropdown';

const MenuItems = ({ items }) => {
	return(
		< li className="dropdown">
			{
				items.submenu ? (
					<>
						<button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={(event) => (event.target.blur())}>
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
