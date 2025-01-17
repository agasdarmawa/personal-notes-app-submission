import React from "react";
import { Route, Routes } from "react-router-dom";
import ArchiveNotesPage from "./pages/ArchiveNotesPage";
import NotFoundPage from "./pages/NotFoundPage";
import ActiveNotesPage from "./pages/ActiveNotesPage";
import Navigation from "./components/Navigation";
import AddNotesPage from "./pages/AddNotesPage";
import DetailNotePage from "./pages/DetailNotePage";

function App() {
	return (
		<div>
			<section className="app-container">
				<Navigation />

				<main>
					<Routes>
						<Route path="/" element={<ActiveNotesPage />} />
						<Route path="/notes/new" element={<AddNotesPage />} />
						<Route path="/notes/:id" element={<DetailNotePage />} />
						<Route path="/archives" element={<ArchiveNotesPage />} />
						<Route path="*" element={<NotFoundPage />} />
					</Routes>
				</main>
			</section>
		</div>
	);
}

export default App;
