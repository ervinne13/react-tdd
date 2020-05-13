import React from 'react';
import RestaurantForm from './RestaurantForm';

class RestaurantList extends React.Component {
    state = { isShowingForm: false, restaurants: [] };

    render() {
        const { isShowingForm, restaurants } = this.state;
        return (
            <div className="restaurant-list">
                <button onClick={this.toggleRestaurantFormVisibility} data-action="create">Add Restaurant</button>

                {isShowingForm ? <RestaurantForm onSave={this.onRestaurantSaveCommand} /> : null}

                <ul>
                    {restaurants.map(({ name }) => <RestaurantListItem key={name} name={name} />)}
                </ul>
            </div>
        );
    }

    toggleRestaurantFormVisibility = () => {
        const { isShowingForm } = this.state;
        this.setState({ isShowingForm: !isShowingForm });
    }

    onRestaurantSaveCommand = (restaurant) => {
        const restaurants = [...this.state.restaurants, restaurant];
        this.setState({ restaurants });
        this.toggleRestaurantFormVisibility();
    }
}

const RestaurantListItem = (props) => (
    <li>{props.name}</li>
);

export default RestaurantList;
