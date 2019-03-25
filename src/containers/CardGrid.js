import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { styled } from '@material-ui/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 1000,
    imageFullHeight: 450,
  },
});

const MyGridList = styled(GridList)({
  background: 'linear-gradient(20deg, #3949ab 30%, #039be5 80%)',
  boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
})

class CardGrid extends Component {
  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <MyGridList cellHeight={300} className={classes.gridList} cols={3} id="cardGrid">
          {this.props.pieces.map(piece => (
            <GridListTile key={piece.id} id="gridTile">
              <img src={piece.image} className={classes.image} alt={piece.id} />
            </GridListTile>
          ))}
        </MyGridList>
      </div>
    )
  }
}

CardGrid.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CardGrid)
