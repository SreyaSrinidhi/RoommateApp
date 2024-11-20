import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

const ChatBubble = ({item}) => {
    console.log(item);

    return (
        <View style={[styles.messageRow, item.isSender && styles.messageRowSender]}>
            {!item.isSender && (
                <Image
                    style={styles.avatar}
                    source={{ uri: item.avatar }}
                />
            )}
            <View style={[styles.messageBubble, item.isSender ? styles.senderBubble : styles.receiverBubble]}>
                <Text style={item.isSender ? styles.senderText : styles.receiverText}>
                    {item.text}
                </Text>
                <Text style={[styles.timestamp, item.isSender ? styles.senderTimestamp : styles.receiverTimestamp]}>
                    {item.timestamp}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    messageRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginBottom: 16,
    },
    messageRowSender: {
        flexDirection: 'row-reverse',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 8,
    },
    messageBubble: {
        maxWidth: '70%',
        padding: 8,
        borderRadius: 8,
    },
    senderBubble: {
        backgroundColor: '#EDEFF7',
    },
    receiverBubble: {
        backgroundColor: '#2BAC76',
    },
    senderText: {
        color: '#4A154B',
    },
    receiverText: {
        color: '#4A154B',
    },
    timestamp: {
        fontSize: 12,
        marginTop: 4,
    },
    senderTimestamp: {
        alignSelf: 'flex-end',
    },
    receiverTimestamp: {
        alignSelf: 'flex-start',
    },
});

export default ChatBubble;
