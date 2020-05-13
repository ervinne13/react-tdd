import React from 'react';

class RestaurantForm extends React.Component {
    state = { name: '' }

    render() {
        const { name } = this.state;

        return (
            <div className="restaurant-form">
                <input
                    value={name}
                    onChange={this.syncState}
                    name="name"
                    type="text" />

                <button
                    onClick={this.triggerOnSave}
                    data-action="save">
                    Create Restaurant
                </button>
            </div>
        );
    }

    syncState = (event) => {
        const { value } = event.target;
        this.setState({ name: value });
    }

    triggerOnSave = () => {
        const { onSave } = this.props;
        onSave && onSave(this.getRestaurant());
    }

    getRestaurant() {
        const { name } = this.state;
        return {
            name,
        };
    }
}

export default RestaurantForm;
