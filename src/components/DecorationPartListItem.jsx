import React, { Component } from "react";
import PropTypes from "prop-types";
import { ListItem, ListItemIcon, ListItemText } from "material-ui/List";
import Collapse from "material-ui/transitions/Collapse";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";
import PickerDialog from "./PickerDialog";
import possibleDecorations from "../data/decoration.json";

/**
 * Create the form for listing out the decorations. Iterate through slots and create the form.
 */
class DecorationPartListItem extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      dialogOpen: false,
      selectedIndex: -1
    };
  }

  getSlotDisplay = (piece, decorations) => {
    let sum = 0;

    //total number possible slots
    let total = 0;
    if (!piece) {
      return "-----";
    }
    decorations[piece.part].forEach(decoration => {
      if (decoration.hasOwnProperty("name")) {
        total++;

        if (decoration.name !== "") {
          sum++;
        }
      }
    });

    return `${sum}/${total}`;
  };

  render() {
    const { icon, onDecorationChanged, piece, decorations } = this.props;
    console.log(piece);
    console.log(decorations);

    return (
      <div>
        <ListItem
          button
          onClick={() => {
            console.log("clicked");
            //toggle the state
            this.setState({ open: !this.state.open });
          }}
        >
          <ListItemIcon>
            <img alt="part" src={icon} />
          </ListItemIcon>
          <ListItemText primary={this.getSlotDisplay(piece, decorations)} />
        </ListItem>
        {piece ? (
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            {piece.slots.map((slot, index) => {
              return slot > 0 ? (
                <div key={`${piece.part}_${index}`}>
                  <div>{`Level ${slot}`}</div>
                  <Button
                    color="primary"
                    onClick={() => {
                      this.setState({ dialogOpen: true, selectedIndex: index });
                    }}
                  >
                    {decorations[piece.part][index].name !== ""
                      ? decorations[piece.part][index].name
                      : "Empty Slot"}
                  </Button>
                </div>
              ) : (
                ""
              );
            })}
          </Collapse>
        ) : (
          ""
        )}
        <PickerDialog
          open={this.state.dialogOpen}
          onClose={() => {
            this.setState({ dialogOpen: false });
          }}
          selectedPart="decoration"
          //display only the relevant levels for decorations
          items={possibleDecorations.filter(deco => {
            if (piece) {
              return deco.level <= piece.slots[this.state.selectedIndex];
            }
            return false;
          })}
          handlePieceSelected={item => {
            console.log(item);
            console.log(this.state.selectedIndex);
            onDecorationChanged(piece.part, this.state.selectedIndex, item);
          }}
        />
      </div>
    );
  }
}

DecorationPartListItem.propTypes = {
  handleDecorationChanged: PropTypes.func,
  icon: PropTypes.string
};

export default DecorationPartListItem;
