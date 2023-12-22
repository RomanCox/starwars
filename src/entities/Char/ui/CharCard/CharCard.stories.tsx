import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import avatar from 'shared/assets/tests/storybook.jpg';
import { CharCard } from './CharCard.tsx';

export default {
    title: 'entities/CharCard',
    component: CharCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof CharCard>;

const Template: ComponentStory<typeof CharCard> = (args) => <CharCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    data: {
        username: 'roman_cox',
        age: 22,
        country: Country.Spain,
        lastName: 'Cox',
        firstName: 'Rom',
        city: 'Barcelona',
        currency: Currency.BTC,
        avatar,
    },
};

export const withError = Template.bind({});
withError.args = {
    error: 'Some error',
};

export const Loading = Template.bind({});
Loading.args = {
    isLoading: true,
};
