import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList } from 'react-native';
import ListItem from './ListItem';

class LibraryList extends Component {

  renderItem(library) {
    //console.log(library);
    return <ListItem library={library} />;
  }
  render() {
   return (
     <FlatList
      data={this.props.libraries}
      renderItem={(library) => this.renderItem(library)}
      keyExtractor={library => library.id}
     />
   );
  }
}


const mapStateToProps = state => {
  return { libraries: state.libraries };
};

export default connect(mapStateToProps)(LibraryList);

// la funzione connect, mette in comunicazione
// l'oggetto LibraryList con lo store che gli fornisce lo stato
// Questo stato è poi automaticamente mappato sull'oggetto LibraryList
// attraverso la funzione mapStateToProps. Una volta che la
// connect è chiamata, lo stato sarà accessibile dall'oggetto
// attraverso le props mediante il nome della prop scelto e specificato
// dentro mapStateToProps

// Lo store, a prescindere, runna tutti i reducer registrati
// una volta alla creazione dello store, perché glieli passo
// come parametro nella createStore
