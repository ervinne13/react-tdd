import React from 'react';

class App extends React.Component {
    render() {
        return (
            <div>
                <RestaurantList />
            </div>
        );
    }
}

class RestaurantList extends React.Component {
    render() {
        return (
            <div>
                <button data-action="create-restaurant">Add Restaurant</button>
                <RestaurantForm />
            </div>
        );
    }
}

class RestaurantForm extends React.Component {
    render() {
        return (
            <div>
                <input name="name" type="text" />
                <button data-action="store-restaurant">Create Restaurant</button>
            </div>
        );
    }
}

export default App;
