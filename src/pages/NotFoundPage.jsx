import { useNavigate } from "react-router-dom";

function NotFoundPage() {
	const navigate = useNavigate();

	function redirectPage() {
		navigate("/");
	}

	return (
		<div className="not-found">
			<img src="/404.png" alt="404 Not Found" />
			<h2>Maaf, halaman tidak ditemukan</h2>
			<button onClick={redirectPage}>Kembali ke Beranda</button>
		</div>
	);
}

export default NotFoundPage;
