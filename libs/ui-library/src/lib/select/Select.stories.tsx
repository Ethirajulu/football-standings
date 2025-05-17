import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onChange: { action: 'changed' },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Basic: Story = {
  name: 'Basic',
  args: {
    label: '',
    options: [
      { id: '1', name: 'Option 1' },
      { id: '2', name: 'Option 2' },
      { id: '3', name: 'Option 3' },
    ],
    value: '',
    showEmpty: false,
  },
};

export const WithEmpty: Story = {
  name: 'With Empty Option',
  args: {
    ...Basic.args,
    showEmpty: true,
  },
};

export const WithLabel: Story = {
  name: 'With Label',
  args: {
    ...Basic.args,
    label: 'Select an item',
  },
};

export const Preselected: Story = {
  name: 'Preselected Value',
  args: {
    ...Basic.args,
    label: 'Choose one',
    value: '2',
  },
};
