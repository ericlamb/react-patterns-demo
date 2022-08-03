import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { expect } from '@storybook/jest';

import { ControlledCounter } from '../App';
import { within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

export default {
  title: 'Example/ControlledCounter',
  component: ControlledCounter,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ControlledCounter>;

const Template: ComponentStory<typeof ControlledCounter> = (args) => <ControlledCounter {...args} />;

export const Zero = Template.bind({});
Zero.args = {
  count: 0,
};
Zero.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);

  const incrementInput = canvas.getByText(/Increment/i);

  await userEvent.click(incrementInput);

  await expect(args.onIncrement).toHaveBeenCalled();
};

export const Thousand = Template.bind({});
Thousand.args = {
  count: 1000,
};

export const Titled = Template.bind({});
Titled.args = {
  ...Zero.args,
  title: 'Test Title',
};
