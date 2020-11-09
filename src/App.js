import React, { Component } from 'react';
import { Route, Switch} from 'react-router-dom';
import Palette from './Palette';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import seedPalette from './seedPalette';
import { generatePalette } from './colorHelpers'

class App extends Component {
  findPalette(id) {
    return seedPalette.find((palette) => {
      return palette.id === id;
    });
  }
  render() {

    return (
      <Switch>
        <Route 
          exact 
          path='/' 
          render={(routeProps) => 
            <PaletteList palettes={seedPalette} {...routeProps}/>
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
