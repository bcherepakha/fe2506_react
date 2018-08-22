import React from 'react';
// import AppActions from '../Flux/AppActions';
// import AppStore from '../Flux2/AppStore';

import store from '../Redux/AppStore';
import {startSearch} from '../Redux/AppActions';

class SearchForm extends React.Component {
  state = {
    text: ''
  }

  changeInput = e => {
    this.setState({
      text: e.target.value
    });
  }

  submit = e => {
    e.preventDefault();
    // AppActions.startSearch(this.state.text);
    // AppStore.startSearch(this.state.text);
    store.dispatch(startSearch(this.state.text));
  }

  clear = e => {
      e.preventDefault();
      this.setState(
          {
              text: ''
          },
          () => store.dispatch(startSearch())
      );
  }

  render() {
    const {text} = this.state;

    return <form className='add-task' onSubmit={this.submit}>
        <input
            type='text'
            name='new_task'
            value={text}
            onChange={this.changeInput}/>
        <button type='submit'>Search</button>
        <button type='reset' onClick={this.clear}>Clear</button>
    </form>;
  }
}

export default SearchForm;
