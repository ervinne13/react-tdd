import React from 'react';
import RestaurantForm from './RestaurantForm';

class RestaurantList extends React.Component {
    state = { restaurants: [] };

    render() {
        const { restaurants } = this.state;
        return (
            <div className="restaurant-list">
                <button data-action="create">Add Restaurant</button>
                <RestaurantForm onSave={this.onRestaurantSaveCommand} />
                <ul>
                    {restaurants.map(({ name }) => <RestaurantListItem key={name} name={name} />)}
                </ul>
            </div>
        );
    }

    onRestaurantSaveCommand = (restaurant) => {
        const restaurants = [...this.state.restaurants, restaurant];
        this.setState({ restaurants });
    }
}

const RestaurantListItem = (props) => (
    <li>{props.name}</li>
);

export default RestaurantList;
