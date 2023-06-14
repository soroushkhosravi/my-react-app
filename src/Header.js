import { NavBar } from './NavBar'

const Header = () => {
	return(
		<header>
			<div className="nav">
				<a href="/" className="nav-link">
					Logo
				</a>
				<NavBar />
			</div>
		</header>
	)
}

export { Header }