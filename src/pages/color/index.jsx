import Markdown from '../../util/markdown';

export default class Test extends Markdown {
  document() {
    return require('../../docs/color.md');
  }
}