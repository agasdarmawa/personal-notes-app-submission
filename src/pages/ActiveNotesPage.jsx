import React from "react";
import {
	archiveNote,
	deleteNote,
	filterNotes,
	getActiveNotes
} from "../utils/local-data";
import NoteList from "../components/NoteList";
import SearchBarWrapper from "../components/SearchBar";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";

function ActiveNotesPageWrapper() {
	const [searchParams] = useSearchParams();
	const defKeyword = searchParams.get("keyword") || "";

	return <ActiveNotesPage defaultKeyword={defKeyword} />;
}

class ActiveNotesPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			notes: this.props.defaultKeyword
				? filterNotes(this.props.defaultKeyword, false)
				: getActiveNotes()
		};

		this.handleDeleteNote = this.handleDeleteNote.bind(this);
		this.handleArchiveNote = this.handleArchiveNote.bind(this);
		this.handleFilterNotes = this.handleFilterNotes.bind(this);
	}

	handleDeleteNote(id) {
		deleteNote(id);
		const newNotes = getActiveNotes();

		this.setState(() => {
			return {
				notes: newNotes
			};
		});
	}

	handleArchiveNote(id) {
		archiveNote(id);
		const newNotes = getActiveNotes();

		this.setState(() => {
			return {
				notes: newNotes
			};
		});
	}

	handleFilterNotes(keyword) {
		const notes = getActiveNotes();
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

	render() {
		return (
			<div>
				<h2>Catatan Aktif</h2>
				<SearchBarWrapper onSearch={this.handleFilterNotes} />
				{this.state.notes.length ? (
					<NoteList notes={this.state.notes} />
				) : (
					<div className="notes-list-empty">
						<p>Tidak ada catatan</p>
					</div>
				)}
			</div>
		);
	}
}

ActiveNotesPage.propTypes = {
	defaultKeyword: PropTypes.string.isRequired
};

export default ActiveNotesPageWrapper;
