import { mount } from 'enzyme';
import React from 'react';
import RestaurantForm from '../../src/Restaurant/RestaurantForm';

describe('RestaurantForm', () => {
    describe('clicking save button', () => {
        it('calls the onSave handler', () => {
            const onSaveHandler = jest.fn();

            const wrapper = mount(<RestaurantForm onSave={onSaveHandler} />);

            wrapper
                .find('[name="name"]')
                .simulate('change', { target: { value: 'Seafood Island' } });

            wrapper
                .find('[data-action="save"]')
                .simulate('click');

            expect(onSaveHandler)
                .toHaveBeenCalledWith({ name: 'Seafood Island' });
        });
    });
});
