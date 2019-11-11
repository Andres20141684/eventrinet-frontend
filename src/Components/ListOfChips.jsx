import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import TagFacesIcon from '@material-ui/icons/TagFaces';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing(0.5),
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

export default function ChipsLista(props) {
  const classes = useStyles();
  //const [chipData, setChipData] = React.useState(props.lista);
  var chipData=props.lista
  const handleDelete = chipToDelete => () => {
    //setChipData(chips => chips.filter(chip => chip.id !== chipToDelete.id));
    chipData=chipData.filter(chip => chip.id !== chipToDelete.id)
    console.log("En lista de chips:", chipData,'En la lista padre',props.lista,'Con index:',props.index)
    props.handleChangeArray(chipData,props.index)
  };

  return (
    <Paper className={classes.root}>
      {chipData.map(data => {
        return (
          <Chip
            style={{fontSize:'20px'}}
            key={data.id}
            label={data.nombre+':'+data.correo}
            onDelete={handleDelete(data)}
            className={classes.chip}
          />
        );
      })}
    </Paper>
  );
}