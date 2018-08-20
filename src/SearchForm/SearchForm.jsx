import React from 'react';
import AppActions from '../Flux/AppActions';
// import AppStore from '../Flux2/AppStore';

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
    AppActions.startSearch(this.state.text);
    // AppStore.startSearch(this.state.text);
  }

  render() {
    const {text} = this.state;

    return <form className='add-task' onSubmit={this.submit}>
        <input
            required
            type='text'
            name='new_task'
            value={text}
            onChange={this.changeInput}/>
        <button type='submit'>Search</button>
    </form>;
  }
}

export default SearchForm;
