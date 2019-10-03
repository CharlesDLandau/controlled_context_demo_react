import { createContext } from "react";

// Dummy data
let ctxObj = {
  lastUpdated: new Date(),
  nestings: { nest: {nest: {nest: null}}},
  foo: 'bar',
  arr: [1, 2.0, 'baz']
};

const ControlledContext = createContext({});

// A provider with all the methods and states set up for you
class InitializedProvider extends React.Component {
  constructor(props) {
    super(props);
    this.pushFoo = () => {
        this.setState({
                arr: [...this.state.arr, 'foo'],
                lastUpdated: new Date()
            });
      };

      
    this.state = {
        ...ctxObj,
        pushFoo:this.pushFoo
        };

  };

  render() {
    return (
      <ControlledContext.Provider value={this.state}>
        {this.props.children}
      </ControlledContext.Provider>
    );
  };
};

export { ControlledContext, InitializedProvider };
