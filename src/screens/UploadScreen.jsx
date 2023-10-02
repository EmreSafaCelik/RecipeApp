import React, { useState } from "react";
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    Platform,
    Alert,
    TextInput,
} from 'react-native'

import {
    PERMISSIONS,
    RESULTS,
    request
} from 'react-native-permissions'

import ImageCropPicker from "react-native-image-crop-picker"

import { auth, firestore, storage } from '../utility/firebase'

const UploadScreen = () => {

    const [name, setName] = useState('')

    const add = async (imageURL) => {
        firestore().collection('tarifler').add({name: name, image: imageURL})
    }

    const fetchData = async () => {
        const data = await firestore().collection('kisiler').get()
        console.log(data.docs[0].data())
    }

    const uploadImage = async (image) => {
        console.log(image)

        const uploadUri = Platform.OS === "ios" ? image.sourceURL : image.path
        const filename = `${auth().currentUser.uid}_${Date.now()}.jpg`
        const storageRef = storage().ref(`tarifler/${filename}`)
        await storageRef.putFile(uploadUri)

        try {
            const url = await storageRef.getDownloadURL()
            return url
        } catch (error) {
            console.log(e)
            return null
        }
    }

    const choosePhoto = async () => {
        Alert.alert(
            "Bir seçim yapın",
            "Kamerayı mı açmak istersiniz Galeriyi mi?",
            [
                {
                    text: "Kamerayı",
                    onPress: async () => {
                        let result = false
                        if (Platform.OS == "android") {
                            result = await request(PERMISSIONS.ANDROID.CAMERA)
                            await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)
                            await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE)
                            await request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES)
                            await request(PERMISSIONS.ANDROID.ACCESS_MEDIA_LOCATION)
                            } else if (Platform.OS == 'ios') {
                            result = await request(PERMISSIONS.IOS.CAMERA)
                            await request(PERMISSIONS.IOS.PHOTO_LIBRARY)
                            await request(PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY)
                        }

                        if (result == RESULTS.GRANTED) {
                            const image = await ImageCropPicker.openCamera({
                                cropping: true,
                            })
                            add(uploadImage(image))
                        }
                    }
                },
                {
                    text: "Galeriyi",
                    onPress: async () => {
                        const image = await ImageCropPicker.openPicker({})
                        add(uploadImage(image))
                    }
                }
            ]
        )
    }

    return (
        <View>
            <TextInput
                value={name}
                onChangeText={setName}
                style={{borderWidth: 1}}
            />
            <TouchableOpacity
                onPress={add}
            >
                <Text>
                    Ekleme butonu
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={fetchData}
            >
                <Text>
                    Veri çek
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={choosePhoto}
            >
                <Text>
                    Fotoğraf çek veya seç ve tarifi yükle
                </Text>
            </TouchableOpacity>
        </View>

    )
}

export default UploadScreen