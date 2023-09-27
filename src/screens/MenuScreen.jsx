import React from "react";
import {
    TouchableOpacity,
    Text,
} from 'react-native'

import useAuth from "../utility/Auth";

import { auth } from "../utility/firebase";

const MenuScreen = () => {
    // const { SignOut } = useAuth()
    
    return (
        <TouchableOpacity
            onPress={() => {
                auth().signOut()
                // SignOut()
            }}
        >
            <Text>Çıkış Yap</Text>
        </TouchableOpacity>
    )
}

export default MenuScreen