import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Palette from './Palette';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import seedPalette from './seedPalette';
import { generatePalette } from './colorHelpers'
import NewPaletteForm from './NewPaletteForm';


class App extends Component {
  constructor(props){
    super(props);
    this.state = { palettes: seedPalette };
    this.savePalette = this.savePalette.bind(this);
    this.findPalette = this.findPalette.bind(this);
  }
  findPalette(id) {
    return this.state.palettes.find((palette) => {
      return palette.id === id;
    });
  }
  savePalette(newPalette){
    this.setState( { palettes: [...this.state.palettes, newPalette]})
  }

  render() {

    return (
      <Switch>
        <Route 
          exact 
          path="/palette/new" 
          render={(routeProps) => <NewPaletteForm savePalette={this.savePalette} palettes={this.state.palettes} {...routeProps}/>} 
        />
        <Route 
          exact 
          path='/' 
          render={(routeProps) => 
            <PaletteList palettes={this.state.palettes} {...routeProps}/>
          }
        />
        <Route 
          exact 
          path='/palette/:id' 
          render={(routeProps) => (
            <Palette 
              palette={generatePalette(
              this.findPalette(routeProps.match.params.id)
              )}
            />
          )}
        />
        <Route 
          path="/palette/:paletteId/:colorId" 
          render={routeProps => <SingleColorPalette 
            colorId={routeProps.match.params.colorId}
            palette={generatePalette(
              this.findPalette(routeProps.match.params.paletteId)
            )}
          />
          }
       />
      </Switch>
      //<div>
      //  <Palette palette={generatePalette(seedPalette[4])} />
      //</div>
    );
  }
}

export default App;
