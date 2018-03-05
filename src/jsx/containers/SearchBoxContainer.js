import { connect } from 'react-redux';
import { search } from '../actions/searchAction';
import SearchBox from '../components/SearchBox';

const mapStateToProps = (state) => {
	return {}
};

const mapDispatchToProps = {
	search
};

const SearchBoxContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(SearchBox);

export default SearchBoxContainer

