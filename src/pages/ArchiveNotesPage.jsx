import React from "react";
import {
	deleteNote,
	filterNotes,
	getArchivedNotes,
	unarchiveNote
} from "../utils/local-data";
import NoteList from "../components/NoteList";
import { useSearchParams } from "react-router-dom";
import SearchBarWrapper from "../components/SearchBar";
import PropTypes from "prop-types";

function ArchiveNotesPageWrapper() {
	const [searchParams] = useSearchParams();
	const defKeyword = searchParams.get("keyword") || "";

	return <ArchiveNotesPage defaultKeyword={defKeyword} />;
}

class ArchiveNotesPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			notes: this.props.defaultKeyword
				? filterNotes(this.props.defaultKeyword, true)
				: getArchivedNotes()
		};

		this.handleRestore = this.handleRestore.bind(this);
		this.handleFilterNotes = this.handleFilterNotes.bind(this);
		this.handleDeleteNote = this.handleDeleteNote.bind(this);
	}

	handleRestore(id) {
		unarchiveNote(id);
		const newNotes = getArchivedNotes();

		this.setState(() => {
			return {
				notes: newNotes
			};
		});
	}

	handleFilterNotes(keyword) {
		const notes = getArchivedNotes();
		const filteredNotes = keyword
			? [...notes].filter((note) =>
					note.title.toLowerCase().includes(keyword.toLowerCase())
			  )
			: notes;

		this.setState(() => {
			return {
				notes: filteredNotes
			};
		});
	}

	handleDeleteNote(id) {
		deleteNote(id);
		const newNotes = getArchivedNotes();

		this.setState(() => {
			return {
				notes: newNotes
			};
		});
	}

	render() {
		return (
			<div>
				<h2>Catatan Arsip</h2>
				<SearchBarWrapper onSearch={this.handleFilterNotes} />
				{this.state.notes.length ? (
					<NoteList notes={this.state.notes} />
				) : (
					<div className="notes-list-empty">
						<p>Arsip kosong</p>
					</div>
				)}
			</div>
		);
	}
}

ArchiveNotesPage.propTypes = {
	defaultKeyword: PropTypes.string.isRequired
};

export default ArchiveNotesPageWrapper;
