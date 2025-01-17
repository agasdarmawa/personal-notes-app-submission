import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { showFormattedDate } from "../utils";
import { noteItemPropTypes } from "../types";

function NoteItem({ id, title, body, archived, createdAt }) {
	const formattedDate = showFormattedDate(createdAt);

	return (
		<div className="note-item">
			<div className="note-item__content">
				<h2 className="note-item__title">{title}</h2>
				<h6 className="note-item__createdAt">{formattedDate}</h6>
				<p className="note-item__body">{body}</p>
			</div>
			<div className="note-item__action">
				<Link to={`/notes/${id}`}>
					<button>Lihat Detail</button>
				</Link>
			</div>
		</div>
	);
}

NoteItem.propTypes = noteItemPropTypes;

export default NoteItem;
