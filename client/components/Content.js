import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions/Actions';
import EachContent from './EachContent';
import * as Helper from '../Helper';

class Content extends Component {
  /* componentWillMount: Load all contents from Firebase */
  componentWillMount() {
    let self = this;
    Helper.readHelper()
    .then(function (response) { self.props.ReadContent(response[0], response[1]) });
  }

  render() {
    return (
      <div className="Content">
        <div className="WriteButtonDiv">
          { /* If user clicks the button, show Write page */ }
          <button className="WriteButton" type="button" onClick={this.props.WritePage}>Write Something New</button>
          { /* If user clicks the button, go to top */ }
          <a href="#top"><button className="WriteButton" type="button">Go to Top</button></a>
        </div>
        { /* Load "EachContent" for each post */ }
        {Object
          .keys(this.props.contentAll).map(key => <EachContent key={key} id={key} />)}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    contentAll: state.contentAll,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    ReadContent: (contentAll, contentNumber) => dispatch(Actions.ReadContent(contentAll, contentNumber)),
    WritePage: () => dispatch(Actions.WritePage())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);
