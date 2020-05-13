import React from 'react';

class App extends React.Component {
    state = { greeting: 'Hello, world!' };

    render() {
        const { greeting } = this.state;
        return (
            <div className="hello">{greeting}</div>
        );
    }
}

export default App;
