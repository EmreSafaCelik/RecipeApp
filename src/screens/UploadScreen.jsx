import React, { useState, useEffect } from "react";
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    Platform,
    Alert,
    TextInput,
    FlatList,
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
    const [data, setData] = useState([])
    const [yuklenmeyiGoster, setYuklenmeyiGoster] = useState(false)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        setYuklenmeyiGoster(true)
        const data = await firestore().collection('tarifler').get()
        console.log(data.docs)
        setData(data.docs)
        setYuklenmeyiGoster(false)
    }

    const add = async (image, name) => {
        const imageURL = await uploadImage(image)
        console.log('add içerisindeki imageURL: ', imageURL)

        if (imageURL) {
            await firestore().collection('tarifler').add({image: imageURL, name: name})
            fetchData()
        } else {
            console.log('imageURL boş')
        }
    }

    const uploadImage = async (image) => {
        console.log('uploadImage içerisindeki image:', image)
        if (!image) return

        const uploadUri = Platform.OS === 'ios' ? image.sourceURL : image.path
        const filename = `${auth().currentUser.uid}_${Date.now()}.jpg`
        const storageRef = storage().ref(`recipes/${filename}`)

        await storageRef.putFile(uploadUri)

        try {
            const url = await storageRef.getDownloadURL()
            return url
        } catch (error) {
            console.log(error)
            return null
        }
    }

    const choosePhotoAndAdd = async () => {
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
                            add(image, name)
                        }
                    }
                },
                {
                    text: "Galeriyi",
                    onPress: async () => {
                        const image = await ImageCropPicker.openPicker({})
                        add(image, name)
                    }
                }
            ]
        )
    }

    const Header = () => {

        return (
            <View>
                <TextInput
                    value={name}
                    onChangeText={setName}
                    style={{borderWidth: 1}}
                />
                <TouchableOpacity
                    onPress={choosePhotoAndAdd}
                >
                    <Text>
                        Fotoğraf çek veya seç
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View>
            <FlatList
                data={data}
                ListHeaderComponent={Header}
                onRefresh={fetchData}
                refreshing={yuklenmeyiGoster}
                renderItem={element => {
                    console.log('element:', element)

                    return (
                        <View>
                            <Text>{element?.item?.data()?.name}</Text>
                            <Image
                                source={{uri: element?.item?.data()?.image}}
                                style={{width: '100%', height: 200}}
                            />
                        </View>
                    )
                }}
            />
        </View>

    )
}

export default UploadScreen