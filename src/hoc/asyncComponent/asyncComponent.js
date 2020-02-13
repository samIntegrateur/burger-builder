import React, {Component} from 'react';

// for lazy loading https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/8138598#overview
const asyncComponent = (importComponent) => {
  return class extends Component {
    state = {
      component: null
    };

    componentDidMount() {
      importComponent()
        .then(cmp => {
          this.setState({component: cmp.default});
        });
    }

    render() {
      const C = this.state.component;

      return C ? <C {...this.props} /> : null;
    }
  }
};

export default asyncComponent;
