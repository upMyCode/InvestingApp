import { KeyCups } from './types';

const KEY_CUPS_BLOCK_1: KeyCups = [
	{
		title: '±',
		id: '#±',
	},
	{
		title: '(',
		id: '#(',
	},
	{
		title: ')',
		id: '#)',
	},
	{
		title: '%',
		id: '#%',
	},
];
const KEY_CUPS_BLOCK_2: KeyCups = [
	{
		title: 'Ac',
		id: '#Ac',
	},
];
const KEY_CUPS_BLOCK_3: KeyCups = [
	{
		title: '⌫',
		id: '#⌫',
	},
];
const KEY_CUPS_BLOCK_4: KeyCups = [
	{
		title: '/',
		id: '#/',
	},
];
const KEY_CUPS_BLOCK_5: KeyCups = [
	{
		title: '7',
		id: '#7',
	},
	{
		title: '8',
		id: '#8',
	},
	{
		title: '9',
		id: '#9',
	},
	{
		title: '4',
		id: '#4',
	},
	{
		title: '5',
		id: '#5',
	},
	{
		title: '6',
		id: '#6',
	},
	{
		title: '1',
		id: '#1',
	},
	{
		title: '2',
		id: '#2',
	},
	{
		title: '3',
		id: '#3',
	},
];
const KEY_CUPS_BLOCK_6: KeyCups = [
	{
		title: '*',
		id: '#*',
	},
	{
		title: '-',
		id: '#-',
	},
];
const KEY_CUPS_BLOCK_7: KeyCups = [
	{
		title: '+',
		id: '#+',
	},
];
const KEY_CUPS_BLOCK_8: KeyCups = [
	{
		title: '=',
		id: '#=',
	},
];
const KEY_CUPS_BLOCK_9: KeyCups = [
	{
		title: '0',
		id: '#0',
	},
];
const KEY_CUPS_BLOCK_10: KeyCups = [
	{
		title: '.',
		id: '#.',
	},
];
const DISPLAYED_KEY_CUPS: string[] = ['7', '1', '0', '2', '3', '%', '8', '*', '9', '4', '/', '(', '5', '.', '6', ')', '+', '-'];

const UN_DISPLAYED_KEY_CUPS: string[] = ['Ac', '⌫', '±', '='];

export {
	DISPLAYED_KEY_CUPS,
	KEY_CUPS_BLOCK_1,
	KEY_CUPS_BLOCK_2,
	KEY_CUPS_BLOCK_3,
	KEY_CUPS_BLOCK_4,
	KEY_CUPS_BLOCK_5,
	KEY_CUPS_BLOCK_6,
	KEY_CUPS_BLOCK_7,
	KEY_CUPS_BLOCK_8,
	KEY_CUPS_BLOCK_9,
	KEY_CUPS_BLOCK_10,
	UN_DISPLAYED_KEY_CUPS,
};
