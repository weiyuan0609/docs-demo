import React from 'react'
import ReactDOM from 'react-dom'

import pages from './pages';

class App extends React.Component {
  getComponent(page) {
    this.components = this.components || Object.assign(Object.values(pages).reduce((a, b) => {
      return Object.assign(a, b);
    }, {}), pages.documents);

    const result = this.components;
    console.log(result);
    if (result) {
      return React.createElement(result.default, {});
    }
  }

  render() {
    console.log("ddddddddddd", pages);
    return (
      <div>
          Hello World testddd
          <div>
            {
              Object.keys(pages).map(page => {
                return (
                  <span>{page}</span>
                )
              })
            }
          </div>
          <div>
          { this.getComponent(pages.button) }
          </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))