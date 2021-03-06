import React, { Component } from 'react';
import { FormGroup } from 'react-bootstrap';
import { Button } from '../Button/index';

class Search extends Component {

    componentDidMount() {
      this.input.focus()
    }
  
    render() {
      const { onChange, value, children, onSubmit} = this.props
      return(
        <form onSubmit={onSubmit}>
          <FormGroup>
          <div>
            <h1 style={{
            fontWeight: 'bold', color: 'white' }}>{children}</h1> <hr style={{ border: '2px solid gray', width: '200px' }}/>
          </div>
  
          <div className="input-group">
            <input className="form-control width100 searchForm"
              type="text" 
              onChange={ onChange } 
              value={ value }
              ref={(node) => {this.input = node}}
            />
          <span className="input-group-btn">
            <button
              style={{ fontSize: '30px'}}
              className="btn btn-primary searchBtn"
              type="submit"
              >Search
            </button>
          </span>
          </div>
          </FormGroup>
        </form>
     )
    } 
  }

  export default Search;