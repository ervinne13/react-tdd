import React from 'react';
import RestaurantForm from './RestaurantForm';

class RestaurantList extends React.Component {
    render() {
        return (
            <div className="restaurant-list">
                <button data-action="create">Add Restaurant</button>
                <RestaurantForm />
            </div>
        );
    }
}

export default RestaurantList;
