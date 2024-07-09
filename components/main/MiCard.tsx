import React from 'react'
import { Dimensions, StyleSheet, View, Text, Pressable } from 'react-native'
import { Avatar } from 'react-native-paper'

const MiCard = (props, {userId}) => {

    return (
        <Pressable onPress={props.onPress}>
            <View style={cardStyle.main}>
                <View style={{ padding: 10 }}>
                    <Avatar.Text size={60} label={props.name} />
                </View>
                <View style={cardStyle.textBasis}>
                    <Text style={cardStyle.usernameTitle}>{props.usernameTitle}</Text>
                    <Text style={cardStyle.lastMessage}>Hello</Text>
                </View>
            </View>
        </Pressable>

    )
}

const cardStyle = StyleSheet.create({
    main: {
        width: Dimensions.get('screen').width,
        height: 100,
        backgroundColor: 'white',
        flexDirection: "row",
        alignItems: 'center'
    },
    textBasis: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column'
    },
    usernameTitle: {
        fontSize: 24,
        textAlign: 'center'
    },
    lastMessage: {
        fontSize: 16
    }
})

export default MiCard