import React from "react";
import {
    TouchableOpacity,
    Text,
    View,
} from 'react-native'

// import useAuth from "../utility/Auth";

import ImageCropPicker from "react-native-image-crop-picker";

import { auth } from "../utility/firebase";

const MenuScreen = ({navigation}) => {
    // const { SignOut } = useAuth()
    
    return (
        <View>
            <TouchableOpacity
                onPress={() => {
                    auth().signOut()
                    // SignOut()
                }}
            >
                <Text>Çıkış Yap</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('ProfileScreen')
                }}
            >
                <Text>Profili gör</Text>
            </TouchableOpacity>

        </View>
    )
}

export default MenuScreen