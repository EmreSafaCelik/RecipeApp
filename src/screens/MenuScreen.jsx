import React from "react";
import {
    TouchableOpacity,
    Text,
    View,
} from 'react-native'

// import useAuth from "../utility/Auth";

import ImageCropPicker from "react-native-image-crop-picker";

import { auth } from "../utility/firebase";

const MenuScreen = () => {
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
                onPress={async () => {
                    const image = await ImageCropPicker.openPicker({})

                    console.log(image)
                }}
            >
                <Text>Galeriden resim seç</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={async () => {
                    const image = await ImageCropPicker.openCamera({})
                    console.log(image)
                }}
            >
                <Text>Kamera ile çek</Text>
            </TouchableOpacity>
        </View>
    )
}

export default MenuScreen