import type { Meta, StoryObj } from '@storybook/react'
import MemoTest from './MemoTest'

const meta = {
	title: 'MemoTest/MemoTest',
	component: MemoTest,
	parameters: {},
	tags: ['autodocs'],
	argTypes: {},
// eslint-disable-next-line prettier/prettier
} satisfies Meta<typeof MemoTest>

export default meta

type Story = StoryObj<typeof meta>;

const almostCompleteCards = [
	{
		image: "https://icons.iconarchive.com/icons/iconarchive/cute-animal/256/Cute-Cat-icon.png",
		found: true
	},
	{
		image: "https://cdn-icons-png.freepik.com/256/1998/1998627.png?semt=ais_hybrid",
		found: false
	},
	{
		image: "https://icons.iconarchive.com/icons/iconarchive/cute-animal/256/Cute-Cat-icon.png",
		found: true
	},
	{
		image: "https://cdn-icons-png.freepik.com/256/1998/1998627.png?semt=ais_hybrid",
		found: false
	}
]

const StartCards = [
	{
		image: "https://icons.iconarchive.com/icons/iconarchive/cute-animal/256/Cute-Cat-icon.png",
		found: false
	},
	{
		image: "https://cdn-icons-png.freepik.com/256/1998/1998627.png?semt=ais_hybrid",
		found: false
	},
	{
		image: "https://icons.iconarchive.com/icons/iconarchive/cute-animal/256/Cute-Cat-icon.png",
		found: false
	},
	{
		image: "https://cdn-icons-png.freepik.com/256/1998/1998627.png?semt=ais_hybrid",
		found: false
	}
]

const handleUpdateSession = () => {
	alert("You Win!")
}


export const Start: Story = {
	args: {
		name: "Level 1",
		memoTestCards: StartCards,
		sessionId: "1",
		handleUpdateSession
	},
}

export const AlmostComplete: Story = {
	args: {
		name: "Level 1",
		memoTestCards: almostCompleteCards,
		sessionId: "2",
		handleUpdateSession
	},
}

