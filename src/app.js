import React from 'react'
import ReactDOM from 'react-dom'

import pages from './pages';
import './css/styles.scss';

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
    return routes[2];
  }

  setPage(fn) {
    this.setState({ page: this.getPage() }, fn);
  }

  getComponent(page) {
    page = page || this.getPage();
    const result = pages[page];
    if (result) {
      return React.createElement(result.default, {});
    }
  }

  render() {
    return (
      <div>
        <div className="header">markdown可交互文档</div>
          <div className="container">
            <div className="menu">
              <ul>
                {
                  Object.keys(pages).map(page => {
                    return (
                      <li key={page} className={page === this.getPage() ? 'active' : ''}>
                        <a href={`#/${page}`}>{page}</a>
                      </li>
                    )
                  })
                }
              </ul>
            </div>
            <div className="page">
              { this.getComponent(this.state.page) }
            </div>
          </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))