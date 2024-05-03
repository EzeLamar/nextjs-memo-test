import type { Meta, StoryObj } from '@storybook/react'
import Card from './Card'

const meta = {
	title: 'MemoTest/Card',
	component: Card,
	parameters: {},
	tags: ['autodocs'],
	argTypes: {},
// eslint-disable-next-line prettier/prettier
} satisfies Meta<typeof Card>

export default meta

type Story = StoryObj<typeof meta>;

const image= "https://cdn-icons-png.freepik.com/256/1998/1998627.png?semt=ais_hybrid"

export const Hidden: Story = {
	args: {
		image: image,
		index: 0,
		disabled: false,
		selected: true,
		handleSelectCard: () => {}
	},
}

export const Showed: Story = {
	args: {
		image: image,
		index: 0,
		disabled: false,
		selected: false,
		handleSelectCard: () => {}
	},
}

