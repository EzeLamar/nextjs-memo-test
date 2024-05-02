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

const MemoTestCard = {
	image: "https://cdn-icons-png.freepik.com/256/1998/1998627.png?semt=ais_hybrid",
    found: false
}

export const Hidden: Story = {
	args: {
		memoTestCard: MemoTestCard,
		index: 1,
		indexFirstSelected: 2,
		handleSelectCard: () => {}
	},
}

export const Showed: Story = {
	args: {
		memoTestCard: MemoTestCard,
		index: 1,
		indexFirstSelected: 1,
		handleSelectCard: () => {}
	},
}

