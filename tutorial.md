# React useContext and Pre-Initialized Providers

On a recent project I started using the [React Context API](https://reactjs.org/docs/context.html) instead of Redux, and I like it. Here's how you can get started quickly.


### Setup a project

I like Next for a variety of reasons, particularly the router. Let's create a new project like so:

```bash
git init context_demo && cd context_demo
npx create-next-app
npm run dev
```

`localhost:3000` will now display the template app. Let's "clear the table":

```javascript
// pages/index.js
import Head from '../components/head';

export default () => (
  <div>
    <Head title="Home" />
  </div>
);
```
The view should go blank now.

With that out of the way, let's create a context in a new folder `contexts`:

```javascript
// contexts/contextcontroller.js
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
```
As you can see all this does is pack a method into its state and pass the state to a context provider. Everything is all in one place, but we could be importing functions from all over the place if we wanted to.

Let's build some consumers.

```javascript
// components/buttoneer.js
import React, { useContext } from 'react';
import { ControlledContext } from '../contexts/contextcontroller';


function Buttoneer(){
    let value = useContext(ControlledContext);
    return(
        <div style={{height: 100, width:100}}>
            <button onClick={value.pushFoo}>Click me!</button>
        </div>
    );
};

export default Buttoneer
```

This one just consumes our `pushFoo` method from the context. Now let's imitate significant nesting in the component tree.

```javascript
// components/nestingdoll.js
import React from 'react';


function NestingDoll(props){
    return(
        <div style={{border: '1px solid black', padding: '20px'}}>
            {props.children}
        </div>
    );
};

export default NestingDoll
```
This one just draws a box around its children. Now lets make a component that consumes the array from our context.

```javascript
// components/listview.js
import React, { useContext } from 'react';
import { ControlledContext } from '../contexts/contextcontroller';


function ListView(){
    let value = useContext(ControlledContext);
    return(
        <div>
        {
        value.arr.map((item, idx)=>{
        return (
            <div 
            key={`${idx}-listitem`}
            style={{border: '1px solid black', padding: '20px'}}>
            <p>
                {`${item}`}
            </p>
            </div>
                )
            })
        }
        </div>
    );
};

export default ListView
```

With these components let's edit our `index` to render our `Buttoneer` in one branch of the component tree, and then nest `ListView` under several layers of `NestingDoll`

```javascript
// pages/index.js
import Head from '../components/head';
import { InitializedProvider } from '../contexts/contextcontroller';
import Buttoneer from '../components/buttoneer';
import NestingDoll from '../components/nestingdoll';
import ListView from '../components/listview';

export default () => (
  <div>
    <Head title="Home" />
    <InitializedProvider>
      <Buttoneer />
      <NestingDoll>
        <NestingDoll>
          <NestingDoll>
            <ListView />
          </NestingDoll>
        </NestingDoll>
      </NestingDoll>
    </InitializedProvider>
  </div>
);
```

The result should look like it does in this demo: [controlled-context-demo.charlesdlandau.net](https://controlled-context-demo.charlesdlandau.net/)

And you can see the repo [here](https://github.com/CharlesDLandau/controlled_context_demo_react).

I think that this pattern improves the organization of projects because global app state is all in one place. I know that there are some drawbacks to the Contexts API (e.g. rerenders) but it works for me.

Thanks for reading! I'd be interested to hear your thoughts. Is this an anti-pattern? Do you dislike the Context API and think I should just use Redux? 