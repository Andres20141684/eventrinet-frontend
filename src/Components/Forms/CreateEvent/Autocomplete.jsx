import React, {Component} from 'react'
import Autosuggest from 'react-autosuggest';
import'../../../styles/Autocomple_style.css'
const Networking = require('../../../Network/Networking.js') ;
const languages = [
    {
      name: 'C',
      year: 1972
    },
    {
      name: 'C#',
      year: 2000
    },
    {
      name: 'C++',
      year: 1983
    },
    {
      name: 'Clojure',
      year: 2007
    },
    {
      name: 'Elm',
      year: 2012
    },
    {
      name: 'Go',
      year: 2009
    },
    {
      name: 'Haskell',
      year: 1990
    },
    {
      name: 'Java',
      year: 1995
    },
    {
      name: 'JavaScript',
      year: 1995
    },
    {
      name: 'Perl',
      year: 1987
    },
    {
      name: 'PHP',
      year: 1995
    },
    {
      name: 'Python',
      year: 1991
    },
    {
      name: 'Ruby',
      year: 1995
    },
    {
      name: 'Scala',
      year: 2003
    }
  ];
  
  // https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_special_characters
  const escapeRegexCharacters = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  
  /*const getSuggestions = value => {
    const escapedValue = escapeRegexCharacters(value.trim());
  
    if (escapedValue === '') {
      return [];
    }
  
    const regex = new RegExp('^' + escapedValue, 'i');
  
    return languages.filter(language => regex.test(language.name));
  };*/
  
  const getSuggestionValue = suggestion => new String(suggestion.nombre+' '+suggestion.correo);
  
  const renderSuggestion = suggestion => <span><div>{suggestion.nombre}</div><div>{suggestion.correo}</div></span>;
  
  // prettier-ignore
  class Autocompleter extends Component { // eslint-disable-line no-undef
    constructor() {
      super();
  
      this.state = {
        value: '',
        suggestions: [],//getSuggestions('')
        items:[]
      };
      this.getSuggestions=this.getSuggestions.bind(this);
    }
  
    getSuggestions = value => {
        const escapedValue = escapeRegexCharacters(value.trim());
        console.log(this.state)
        if (escapedValue === '') {
          return [];
        }
      
        const regex = new RegExp('^' + escapedValue, 'i');
      
        return this.state.items.filter(item => regex.test(item.nombre));
      };
    componentWillMount(){
        Networking.listar_usuarios().then((response)=>{
            this.setState({items:response.correos})
            console.log(response);
          })
          .catch( (err) =>{
            console.log("error en conexión");
            console.log(err);
          })
    }
    onChange = (event, { newValue }) => {
      this.setState({
        value: newValue
      });
    };
  
    onSuggestionsFetchRequested = ({ value }) => {
        
      this.setState({
        suggestions: this.getSuggestions(value)
      });
    };
  
    onSuggestionsClearRequested = () => {
      this.setState({
        suggestions: []
      });
    };
  
    render() {
      const { value, suggestions } = this.state;
      const inputProps = {
        placeholder: "Type 'c'",
        value,
        onChange: this.onChange
      };
  
      return (
          <div>
        <Autosuggest // eslint-disable-line react/jsx-no-undef
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />  
          </div>
        
      );
    }
  }
  
  export default Autocompleter;