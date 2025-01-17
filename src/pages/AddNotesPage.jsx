import React from "react";
import { addNote } from "../utils/local-data";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function ActiveNotesPageWrapper() {
	const navigate = useNavigate();
	function handleRedirect() {
		navigate("/");
	}
	return <AddNotesPage onRedirect={handleRedirect} />;
}

class AddNotesPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			title: "",
			body: ""
		};

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		addNote({ ...this.state });
		this.props.onRedirect();
	}

	render() {
		return (
			<div className="add-new-page">
				<h2 className="">Tambah Catatan</h2>
				<form onSubmit={this.handleSubmit}>
					<div>
						<label htmlFor="title">Nama Catatan</label>
						<input
							type="text"
							id="title"
							placeholder="Masukkan nama catatan"
							required
							onChange={(e) =>
								this.setState(() => {
									return {
										title: e.target.value
									};
								})
							}
						/>
					</div>
					<div>
						<label htmlFor="body">Deskripsi Catatan</label>
						<textarea
							name=""
							id="body"
							required
							rows={8}
							placeholder="Masukkan deskripsi catatan"
							onChange={(e) =>
								this.setState(() => {
									return {
										body: e.target.value
									};
								})
							}
						></textarea>
					</div>

					<button type="submit">Tambah Data</button>
				</form>
			</div>
		);
	}
}

AddNotesPage.propTypes = {
	onRedirect: PropTypes.func.isRequired
};

export default ActiveNotesPageWrapper;
