import React, { Component } from 'react';
import { Grid, Row } from 'react-bootstrap';
import { DEFAULT_QUERY, PATH_BASE, PATH_SEARCH, DEFAULT_PAGE, PARAM_PAGE, DEFAULT_HPP, PARAM_HPP, PARAM_SEARCH } 
  from '../../constants/index';
import Table from '../Table/index';
import { Button, Loading } from '../Button/index';


const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}&${PARAM_PAGE}&${PARAM_HPP}${DEFAULT_HPP}`;

const updateTopStories = (hits, page) => prevState => {
    const {searchKey, results} = prevState;
    const oldHits = results && results[searchKey] ? results[searchKey].hits : [];
    const updatedHits = [...oldHits, ...hits];

    return   {results: {...results, [searchKey]: {hits: updatedHits, page} }, isLoading: false };
}

const withLoading = (Component) => ({ isLoading, ...rest}) =>
isLoading ? <Loading/> : <Component {...rest}/>

class Beta extends Component {

  constructor(props){
    super(props);
    this.state = {
      results: null,
      searchKey: '',
      searchTerm: 'beta',
      isLoading: false,
    }

   // this.removeItem = this.removeItem.bind(this);
    this.fetchTopStories = this.fetchTopStories.bind(this);
    this.setTopStories = this.setTopStories.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  onSearch(sortkey){
    this.setState({ sortkey })
  }
  
  //set top stories 
  setTopStories(result) {
    //get the hits from result
    const {hits, page} = result;
    this.setState(updateTopStories(hits, page));
  }


  //FETCH
  fetchTopStories(searchTerm, page) {
    this.setState({ isLoading: true })
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(response => response.json())
      .then(result => this.setTopStories(result))
      .catch(e => e);
  }

checkTopStoriesSearchTerm(searchTerm) {
  return !this.state.results[searchTerm];
}

  componentDidMount() {
    const { searchTerm } = this.state
    this.setState({ searchKey: searchTerm })
    this.fetchTopStories(searchTerm, DEFAULT_PAGE);
  }

  onSubmit(event) {
    const { searchTerm } = this.state
    this.setState({ searchKey: searchTerm })

    if (this.checkTopStoriesSearchTerm(searchTerm)) {
      this.fetchTopStories(this.state.searchTerm, DEFAULT_PAGE)
    }
    event.preventDefault();
  }


  removeItem = (id) => {
    const { results, searchKey } = this.state;
    const { hits, page } = results[searchKey];
    const updatedList = hits.filter(item => item.objectID !== id );
    this.setState({results: {...results,[searchKey]: {hits: updatedList, page} } })
  } 

  searchValue = (event) => {
    this.setState({ searchTerm: event.target.value })
  }

 
  render() {

    const { results, searchTerm, searchKey, isLoading } = this.state;
    const page = (results && results[searchKey] && results[searchKey].page) || 0; 
    const list = (results && results[searchKey] && results[searchKey].hits) || [];

    return (
      <div>
        <Grid>
          <Row>
        <Table
          list={list}
          removeItem={this.removeItem}
        /> 
      
        <div className="text-center alert">
         
          <ButtonWithLoading
            isLoading= { isLoading }
            className="btn btn-success"
            onClick={ () => this.fetchTopStories(searchTerm, page + 1)}>
            Load More
          </ButtonWithLoading>
          
        </div>
        </Row>
        </Grid>
      </div>
    );
  }
}

export default Beta;
const ButtonWithLoading = withLoading(Button);


  

  
 






