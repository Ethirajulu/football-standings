import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardProps } from './Card';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    title: { control: 'text' },
    imageSrc: { control: 'text' },
    children: { control: 'text' },
    footer: { control: false },
  },
};

export default meta;
type Story = StoryObj<CardProps>;

export const Basic: Story = {
  name: 'Basic',
  args: {
    title: 'Card Title',
    children: 'This is a simple card with just a title and body text.',
  },
};

export const WithImage: Story = {
  name: 'With Image',
  args: {
    title: 'Card with Image',
    imageSrc: 'https://via.placeholder.com/400x200',
    children: 'An image above gives this card more context.',
  },
};

export const WithFooter: Story = {
  name: 'With Footer',
  args: {
    title: 'Card with Actions',
    children: 'You can add buttons or links in the footer section.',
    footer: (
      <div className="flex justify-end space-x-2">
        <button className="px-3 py-1 text-sm font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700">
          Confirm
        </button>
        <button className="px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200">
          Cancel
        </button>
      </div>
    ),
  },
};

export const EmptyContent: Story = {
  name: 'Empty (Children Only)',
  args: {
    children: (
      <div className="p-4 text-center text-gray-500">
        No title, no image, just custom content here.
      </div>
    ),
  },
};

export const Interactive: Story = {
  name: 'Interactive Play',
  args: {
    title: 'Interactive Card',
    children: 'Verify that title and body are rendered.',
  },
  play: async ({ canvasElement }) => {
    const { getByText } = within(canvasElement);
    expect(getByText('Interactive Card')).toBeTruthy();
    expect(getByText(/Verify that title and body/i)).toBeTruthy();
  },
};
