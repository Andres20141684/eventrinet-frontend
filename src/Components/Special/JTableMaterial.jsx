import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../styles/style_sheets.css'
import MaterialTable from 'material-table';
const Networking = require('./../../Network/Networking.js') ;

/* *****         EJEMPLO DE COMO RECIBO LOS PROPS:      ******

la forma de enviar los headers
   ->   field es la etiqueta en el Json
   ->   title es el titulo en la tabla 
   ->   lookup te permite un selector entre determinados valores 
columns: [
    { title: 'Name', field: 'name' },
    { title: 'Editar', field: 'edit' },
    { title: 'Surname', field: 'surname' },
    { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
    { title: 'Birth Place', field: 'birthCity', lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
    },
],
*****************************************************************
la forma de enviar las filas(rows) de datos
   ->   field como etiqueta y seguido el valor de lo que quiero poner

data: [
    { name: 'Mehmet', edit:<button>editar</button>, surname: 'Baran', birthYear: 1987, birthCity: 63 },
    { name: 'Zerya Betül',edit:<button>editar</button>, surname: 'Baran', birthYear: 2017, birthCity: 34 },
]



 */
class JTableMaterial  extends Component {
    constructor(props){
        super(props);
        this.state={
          columns: [ ],
          data: []
        }
      }
      componentDidMount(){
          
          var pagination = document.getElementsByClassName("MuiTableCell-root MuiTableCell-footer MuiTablePagination-root Component-paginationRoot-1");
          console.log(pagination);
      }
      render(){
        
        return (
          <MaterialTable
            title={this.props.title}
            columns={this.props.columns}
            data={this.props.data}
            localization={{
                body: {
                  emptyDataSourceMessage: 'Aun no se cargaron los datos...'
                },
                toolbar: {
                  searchTooltip: 'Buscar',
                  searchPlaceholder:'Buscar',
                  searchfontSize: '14',
                  fontSize: '14'
                },
                pagination: {
                  labelRowsSelect: 'Filas',
                  labelDisplayedRows: ' {from}-{to} de {count}',
                  firstTooltip: 'Primera página',
                  previousTooltip: 'anterior',
                  nextTooltip: 'siguiente',
                  lastTooltip: 'Última página',
                  
                  fontSize: 14
                }
              }}
            options={{
                rowStyle: {
                   backgroundColor: '#FFF',
                 },
                 headerStyle: {
                  backgroundColor: '#002D3D',
                  color: '#6CDCD6',
                  fontSize: 14
                },
              }}
          />
        );
      }
}

export default JTableMaterial;  
