import { Link } from "react-router-dom";

function Navigation() {
	return (
		<nav>
			<div className="content-container nav-wrapper">
				<Link to="/">
					<h2>Aplikasi Catatan</h2>
				</Link>
				<ul>
					<li>
						<Link to="/">Beranda</Link>
					</li>
					<li>
						<Link to="/archives">Arsip</Link>
					</li>
					<li>
						<Link to="/notes/new">
							<button>Tambah Catatan</button>
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
}

export default Navigation;
