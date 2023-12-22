import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import {CharPage} from './CharPage.tsx';

export default {
    title: '???/CharPage',
    component: CharPage,
    argTypes: {
        backgroundColor: {control: 'color'},
    },
} as ComponentMeta<typeof CharPage>;

const Template: ComponentStory<typeof CharPage> = (args) => <CharPage {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
