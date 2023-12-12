import React, { useState } from 'react'
import {
    View,
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    Image,
    Alert,
    StyleSheet
} from 'react-native';
import colors from "../colors"
import { auth } from '../config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
const backImage = require("../assets/background.jpg");
//그림자는 react-native-shadow-2
const Signup = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onPress = () => {
        if (email !== '' && password !== '') {
            createUserWithEmailAndPassword(auth, email, password)
                .then(() => console.log('회원가입 완료'))
                .catch((err) => Alert.alert("SignUp Error", err.message));
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Image source={backImage} style={styles.backImage} />
                <SafeAreaView style={styles.bgColorSheet}>
                    <Text style={styles.title}>회원 가입</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="이메일"
                        autoCapitalize="none"
                        keyboardType="email-address"
                        textContentType="emailAddress"
                        autoFocus={true}
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                    <TextInput style={styles.input}
                        placeholder="비밀번호"
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry={true}
                        textContentType="password"
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                    />
                    <TouchableOpacity style={styles.button} onPress={onPress}>
                        <Text style={styles.buttonText}>회원가입</Text>
                    </TouchableOpacity>
                    <View style={styles.joinView}>
                        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                            <Text style={styles.joinText}>회원로그인</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </View>
        </TouchableWithoutFeedback>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bGround
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        alignSelf: "center",
        paddingBottom: 24,
        paddingTop: 20
    },
    backImage: {
        width: "100%",
        height: 340,
        position: "absolute",
        top: 0,
        resizeMode: "cover"
    },
    bgColorSheet: {
        width: '100%',
        height: '75%',
        position: 'absolute',
        bottom: 0,
        backgroundColor: colors.bGround,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        ...Platform.select({
            ios: {
                shadowColor: "rgb(50,50,50)",
                shadowOpacity: 0.5,
                shadowRadius: 5,
                shadowOffset: {
                    height: -1,
                    width: 0
                }
            },
            android: {
                elevation: 4
            }
        })
    },
    input: {
        backgroundColor: colors.lightGray,
        height: 58,
        marginBottom: 20,
        fontSize: 16,
        borderRadius: 10,
        padding: 12,
        marginHorizontal: 60
    },
    buttonText: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 18
    },
    button: {
        backgroundColor: '#f57c00',
        height: 58,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginHorizontal: 60
    },
    joinView: {
        marginTop: 20,
        alignItems: 'flex-end',
        marginRight: 60
    },
    joinText: {
        color: "#f57c00",
        fontWeight: '600',
        fontSize: 16
    }
});
export default Signup