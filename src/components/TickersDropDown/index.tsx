import SelectDropdown from 'react-native-select-dropdown';
import { View, Text, Image } from 'react-native';
import { TickersDropDownView, styles, ButtonContainer, TickersDropDownViewContainer } from './styles';
import { SearchLogoIMG, BlackSearchLogoIMG } from '@helpers/imagesResolve';
import { stockSectorsList as emojisWithIcons } from '@constants/stocks/stocks';
import React from 'react';

import type { TickersDropDownProps } from './types';

const TickersDropDown = ({ handleSetSearchCategory, tickersListSearchButtonPosition }: TickersDropDownProps) => {
	return (
		<ButtonContainer>
			<SelectDropdown
				data={emojisWithIcons}
				onSelect={(selectedItem, _index) => {
					handleSetSearchCategory(selectedItem.title);
				}}
				renderButton={(selectedItem) => {
					return (
						<View>
							{(!selectedItem || selectedItem) && (
								<TickersDropDownViewContainer tickersListSearchButtonPosition={tickersListSearchButtonPosition}>
									<TickersDropDownView>
										<Image source={{ uri: SearchLogoIMG }} width={14.5} height={14.5} />
									</TickersDropDownView>
								</TickersDropDownViewContainer>
							)}
						</View>
					);
				}}
				renderItem={(item, _index, isSelected) => {
					return (
						<View style={{ ...styles.dropdownItem, ...(isSelected && { backgroundColor: '#EBC67E' }) }}>
							<Text style={{ ...styles.dropdownItemText, ...(isSelected && { color: '#FFFFFF' }) }}>{item.title}</Text>
						</View>
					);
				}}
				search
				searchPlaceHolder={'Search here'}
				showsVerticalScrollIndicator={false}
				dropdownStyle={styles.dropdownMenuStyle}
				searchInputStyle={styles.dropdownSearchInputStyle}
				renderSearchInputLeftIcon={() => {
					return <Image source={{ uri: BlackSearchLogoIMG }} width={13.5} height={13.5} />;
				}}
			/>
		</ButtonContainer>
	);
};

export default TickersDropDown;
