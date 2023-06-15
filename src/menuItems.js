const menuItems = [
	{
		title: 'Home',
		url: '/'
	},
	{
		title: 'Services',
		url: '/services',
		submenu: [
			{
				title: 'Address Check',
				url: '/address'
			}
		]
	},
	{
		title: 'Log out',
		url: '/logout'
	}
]

export { menuItems }