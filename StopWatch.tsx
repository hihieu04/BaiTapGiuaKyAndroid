import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import LapInfo from "./LapInfo";

function StopWatch(this: any): React.JSX.Element {
    const [initialTime, setInitialTime] = useState('00:00,00');
    const [timeLap, setTimeLap] = useState(['00:00,00']);
    const [timeNow, setTimeNow] = useState('00:00,00');
    const [isRunning, setIsRunning] = useState(false);
    const [lapButtonDisabled, setLapButtonDisabled] = useState(true);
    const [lapButtonTitle, setLapButtonTitle] = useState('Lap');

    useEffect(() => {
        let intervalId: any;

        if (isRunning) {
            intervalId = setInterval(() => {
                setTimeNow(prevTime => {
                    let milliseconds = parseInt(prevTime.slice(6, 8)) + 1;
                    let seconds = parseInt(prevTime.slice(3, 5));
                    let minutes = parseInt(prevTime.slice(0, 2));
                    if (milliseconds >= 100) {
                        milliseconds = 0;
                        seconds++;
                    }
                    if (seconds >= 60) {
                        seconds = 0;
                        minutes++;
                    }
                    var minutes_str =
                        minutes < 10 ? '0' + minutes.toString() : minutes.toString();
                    var seconds_str =
                        seconds < 10 ? '0' + seconds.toString() : seconds.toString();
                    var milliseconds_str =
                        milliseconds < 10
                            ? '0' + milliseconds.toString()
                            : milliseconds.toString();
                    var time = minutes_str + ':' + seconds_str + ':' + milliseconds_str;
                    return time;
                });
            }, 10);
        }

        return () => clearInterval(intervalId);
    }, [isRunning]);

    const getLap = () => {
        return timeLap.slice(1).map((lap, index) => (
            <LapInfo key={index} id={index + 1} time={lap} />
        ));
    };

    const resetTimer = () => {
        if (!isRunning) {
            setTimeNow(initialTime);
            setTimeLap(['00:00,00']);
        }
    };

    const handleLapOrReset = () => {
        if (isRunning) {
            setTimeLap([...timeLap, timeNow]);
        } else {
            resetTimer();
            setIsRunning(false);
            setLapButtonDisabled(true);
        }
    };

    const handleStartStop = () => {
        setIsRunning(!isRunning);
        setLapButtonDisabled(false);
        setLapButtonTitle(isRunning ? 'Reset' : 'Lap');
    };

    return (
        <View style={styles.Container}>
            <View style={styles.Header}>
                <View style={styles.TimerWapper}>
                    <Text style={styles.TextTime}>{timeNow}</Text>
                </View>
                <View style={styles.ButtonContainer}>
                    <TouchableOpacity
                        style={[styles.ButtonLap, lapButtonDisabled && styles.DisabledButton]}
                        onPress={handleLapOrReset}
                        disabled={lapButtonDisabled}
                    >
                        <Text style={styles.TitleLap}>{lapButtonTitle}</Text>
                        <View style={styles.Border}></View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={isRunning ? styles.ButtonStop : styles.ButtonStart}
                        onPress={handleStartStop}
                    >
                        <Text style={isRunning ? styles.TitleStop : styles.TitleStart}>
                            {isRunning ? 'Stop' : 'Start'}
                        </Text>
                        <View style={styles.Border}></View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.Footer}>
                <ScrollView style={styles.LapTime}>
                    {getLap()}
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: 'black'
    },
    Header: {
        flex: 1,
    },
    Footer: {
        flex: 1
    },
    ButtonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    MainTime: {
        fontSize: 30,
    },
    ButtonStart: {
        height: 100,
        width: 100,
        backgroundColor: '#162E1C',
        borderRadius: 50,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    ButtonStop: {
        height: 100,
        width: 100,
        backgroundColor: '#3F1515',
        borderRadius: 50,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    ButtonLap: {
        height: 100,
        width: 100,
        backgroundColor: '#3E3E3E',
        borderRadius: 50,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    DisabledButton: {
        opacity: 0.5
    },
    TitleStop: {
        fontSize: 20,
        color: '#FA3D38'
    },
    TitleStart: {
        fontSize: 20,
        color: '#4BD768'
    },
    TitleLap: {
        fontSize: 20,
        color: '#FEFEFE'
    },
    LapTime: {
        marginVertical: 60,
    },
    TextTime: {
        fontSize: 70,
        color: 'white'
    },
    TimerWapper: {
        flex: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    Border: {
        position: 'absolute',
        top: 3,
        left: 3,
        right: 3,
        bottom: 3,
        borderRadius: 999,
        borderWidth: 2, 
        borderColor: 'black', 
    }
});

export default StopWatch;
