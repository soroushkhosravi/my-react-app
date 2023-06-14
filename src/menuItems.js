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
				title: 'Address Investigation',
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