import React from 'react';
import { GridThemeProvider } from 'styled-bootstrap-grid';
import Intro from "./components/Intro";
import Content from "./components/Content";

const gridTheme = {
    row: {
        padding: 0,
    },
    col: {
        padding: 0
    }
};

function App() {
  return (
      <GridThemeProvider gridTheme={gridTheme}>
        <Intro/>
        <Content/>
      </GridThemeProvider>
  );
}

export default App;
