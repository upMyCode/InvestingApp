import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Image } from 'react-native';
import { useAppSelector, useAppDispatch } from '@store/hooks';
import moment from 'moment';
import MsgComponent from '@components/MsgComponent';
import database from '@react-native-firebase/database';
import { SendLogoIMG } from '@helpers/imagesResolve';
import SimpleToast from 'react-native-simple-toast';
import Button from '@components/Button';
import ChatHeader from '@components/ChatHeader';
import { Input, MessagesWrapper, Wrapper } from './styled';

import type { SingleChatProps, Message } from './types';

const SingleChat = ({ receiverData, handleChatClose }: SingleChatProps) => {
	const userData = useAppSelector((store) => store.createUserSlice.user);
	const [msg, setMsg] = React.useState('');
	const [disabled, setdisabled] = useState(false);
	const [allChat, setallChat] = useState<Message[]>([]);

	useEffect(() => {
		console.log(receiverData.roomId);
		const onChildAdd = database()
			.ref('/messages/' + receiverData.roomId)
			.once('value')
			.then((snapshot) => {
				// console.log(Object.values(snapshot.val()), !!snapshot.val());
				const data: Message[] | null = Object.values(snapshot.val()) ? Object.values(snapshot.val()) : null;
				// console.log('A new node has been added', Object.values(snapshot.val()));

				if (data) {
					const resultData = data.sort(
						(b: Message, a: Message) => new Date(a.sendTime).getTime() - new Date(b.sendTime).getTime()
					);
					if (resultData) {
						setallChat(resultData);
					}
				}
			});
		// Stop listening for updates when no longer required
		// return () =>
		// 	database()
		// 		.ref('/messages' + receiverData.roomId)
		// 		.off('child_added', onChildAdd);
	}, [receiverData.roomId, disabled]);

	const msgvalid = (txt: string) => txt && txt.replace(/\s/g, '').length;

	const sendMsg = () => {
		if (msg == '' || msgvalid(msg) == 0) {
			// SimpleToast.show('Enter something....', 1000);
			return false;
		}
		setdisabled(true);
		let msgData = {
			roomId: receiverData.roomId,
			message: msg,
			from: userData?.id,
			to: receiverData.id,
			sendTime: moment().format(''),
			msgType: 'text',
		};
		const newReference = database()
			.ref('/messages/' + receiverData.roomId)
			.push();
		msgData.id = newReference.key;
		newReference.set(msgData).then(() => {
			let chatListupdate = {
				lastMsg: msg,
				sendTime: msgData.sendTime,
			};
			database()
				.ref('/chatlist/' + receiverData?.id + '/' + userData?.id)
				.update(chatListupdate)
				.then(() => console.log('Data updated.'));
			console.log("'/chatlist/' + userData?.id + '/' + data?.id", receiverData);
			database()
				.ref('/chatlist/' + userData?.id + '/' + receiverData?.id)
				.update(chatListupdate)
				.then(() => console.log('Data updated.'));

			setMsg('');
			setdisabled(false);
		});
	};

	return (
		<Wrapper>
			<ChatHeader receiverData={receiverData} handleChatClose={handleChatClose} />
			<MessagesWrapper>
				<FlatList
					data={allChat}
					showsVerticalScrollIndicator={false}
					keyExtractor={(item, index) => index}
					inverted
					renderItem={({ item }) => {
						return <MsgComponent sender={item.from !== userData.id} item={item} />;
					}}
				/>
			</MessagesWrapper>
			<View
				style={{
					backgroundColor: 'transparent',
					elevation: 5,
					// height: 60,
					flexDirection: 'row',
					alignItems: 'center',
					paddingVertical: 7,
					justifyContent: 'space-evenly',
				}}
			>
				<Input
					placeholder='Type your message...'
					placeholderTextColor='#FFFFFF'
					multiline={true}
					value={msg}
					onChangeText={(val) => setMsg(val)}
				/>

				<Button width={42} height={42} disabled={disabled} onPress={sendMsg} bRadius={42} bgColor='#363534'>
					<Image source={{ uri: SendLogoIMG }} width={24} height={20} />
				</Button>
			</View>
		</Wrapper>
	);
};

//make this component available to the app
export default SingleChat;
