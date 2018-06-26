import React from 'react'
import ReactDOM from 'react-dom'

import pages from './pages';
import './util/styles.scss';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillMount() {
    window.addEventListener("hashchange", () => {
      window.scrollTo(0, 0);

      this.setPage();
    }, false);
  }

  getPage() {
    const routes = location.hash.match(/(?:\/(.+))?\/(.+)/);

    console.log(routes, 'gg');
    return routes[2];
  }

  setPage(fn) {
    this.setState({ page: this.getPage() }, fn);
  }

  getComponent(page) {
    console.log('iii', pages, page);
    // this.components = this.components || Object.assign(Object.values(pages).reduce((a, b) => {
    //   return Object.assign(a, b);
    // }, {}));
    page = page || 'button'
    const result = pages[page];
    if (result) {
      return React.createElement(result.default, {});
    }
  }

  render() {
    return (
      <div>
          Hello World testddd
          <div>
            {
              Object.keys(pages).map(page => {
                return (
                  <a href={`#/${page}`}  key={page}>{page}</a>
                )
              })
            }
          </div>
          <div>
          { this.getComponent(this.state.page) }
          </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))