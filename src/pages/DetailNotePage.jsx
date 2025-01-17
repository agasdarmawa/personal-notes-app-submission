import React from "react";
import {
	archiveNote,
	deleteNote,
	getNote,
	unarchiveNote
} from "../utils/local-data";
import { useNavigate, useParams } from "react-router-dom";
import { showFormattedDate } from "../utils";
import PropTypes from "prop-types";

function DetailNotePageWrapper() {
	const { id } = useParams();
	const navigate = useNavigate();

	function handleRedirect() {
		navigate("/");
	}

	return <DetailNotePage noteId={id} onRedirect={handleRedirect} />;
}

class DetailNotePage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			note: getNote(this.props.noteId)
		};

		this.handleArchive = this.handleArchive.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
	}

	handleDelete() {
		if (confirm("Ingin menghapus catatan ini?")) {
			alert("Catatan berhasil dihapus");
			deleteNote(this.props.noteId);
			this.props.onRedirect();
		}
	}

	handleArchive() {
		if (this.state.note.archived) {
			unarchiveNote(this.props.noteId);
		} else {
			archiveNote(this.props.noteId);
		}
		this.props.onRedirect();
	}

	render() {
		const note = this.state.note;

		if (note) {
			const formattedDate = showFormattedDate(note.createdAt);

			return (
				<div>
					<h2 className="detail-page__title">{note.title}</h2>
					<p className="detail-page__createdAt">{formattedDate}</p>
					<p className="detail-page__body">{note.body}</p>

					<div className="detail-page__btns">
						<button className="btn-delete" onClick={this.handleDelete}>
							Hapus Catatan
						</button>
						<button className="btn-archive" onClick={this.handleArchive}>
							{note.archived ? "Batalkan Arsip" : "Arsipkan"}
						</button>
					</div>
				</div>
			);
		} else {
			return (
				<div className="notes-list-empty">
					<p>Detail catatan tidak ditemukan</p>
				</div>
			);
		}
	}
}

DetailNotePage.propTypes = {
	noteId: PropTypes.string.isRequired,
	onRedirect: PropTypes.func.isRequired
};

export default DetailNotePageWrapper;
