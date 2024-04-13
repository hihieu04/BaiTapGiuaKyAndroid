import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface LapInfoPros{
    id: number,
    time: string,
}

const LapInfo: React.FC<LapInfoPros> = ({id, time}) => {
  return (
    <View style={styles.LapContainer}>
        <Text style={styles.LapText}>Lap {id}</Text>
        <Text style={styles.TimeText}>{time}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    LapContainer: {
        backgroundColor: 'black',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        marginTop: 10
    },
    LapText:{
        color: 'white',
        fontSize: 20,
    },
    TimeText:{
        color: 'white',
        fontSize: 20,
    },
})

export default LapInfo