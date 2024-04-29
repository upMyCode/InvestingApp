import styled from 'styled-components/native';
import type { KeyCupTextProps } from './types';

const KeyCupListItem = styled.View`
	margin-left: 20px;
`;

const KeyCupListItemNumbers = styled.View`
	margin-left: 20px;
	margin-bottom: 22px;
`;

const KeyCupListItemRightSideFirstGroup = styled.View`
	margin-bottom: 22px;
	margin-left: 20px;
`;

const KeyCupListItemRightSideSecondGroup = styled.View`
	margin-bottom: 26px;
	margin-left: 22px;
`;

export const KeyCupText = styled.Text<KeyCupTextProps>`
	color: ${({ color }) => color};
	font-family: 'Inter-Medium';
	font-size: 18px;
	line-height: 21px;
`;

export { KeyCupListItem, KeyCupListItemNumbers, KeyCupListItemRightSideFirstGroup, KeyCupListItemRightSideSecondGroup };
