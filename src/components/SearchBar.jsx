import React from "react";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";

function SearchBarWrapper({ onSearch }) {
	const [searchParams, setSearchParams] = useSearchParams();

	const keyword = searchParams.get("keyword") || "";

	function changeSearchParams(keyword) {
		setSearchParams({ keyword });
		onSearch(keyword);
	}

	return (
		<SearchBar keyword={keyword} keywordChangeHandler={changeSearchParams} />
	);
}

class SearchBar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			keyword: props.keyword || ""
		};

		this.inputHandler = this.inputHandler.bind(this);
	}

	inputHandler(event) {
		const { value } = event.target;

		this.setState(() => {
			return {
				keyword: value
			};
		});

		this.props.keywordChangeHandler(value);
	}

	render() {
		return (
			<div className="search-bar">
				<input
					type="text"
					value={this.state.keyword}
					placeholder="Cari berdasarkan judul"
					onChange={this.inputHandler}
				/>
			</div>
		);
	}
}

SearchBarWrapper.propTypes = {
	onSearch: PropTypes.func.isRequired
};

SearchBar.propTypes = {
	keyword: PropTypes.string.isRequired,
	keywordChangeHandler: PropTypes.func.isRequired
};

export default SearchBarWrapper;
