import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, FlatList, StyleSheet, TextInput, Image } from 'react-native';

import { MMKVLoader, useMMKVStorage } from 'react-native-mmkv-storage'

import useAuth from '../utility/Auth';

import PlusIcon from '../assets/icons/PlusIcon';
import MenuIcon from '../assets/icons/MenuIcon';
import FilterIcon from '../assets/icons/FilterIcon';
import SearchIcon from '../assets/icons/SearchIcon';
import FavoriteIcon from '../assets/icons/FavoriteIcon';
import NotFavoriteIcon from '../assets/icons/NotFavoriteIcon';
import TimeIcon from '../assets/icons/TimeIcon';

import { auth } from '../utility/firebase';

const MMKV = new MMKVLoader().initialize()

const getImageResources = (imageName) => {
  const staticImages = {
    'toast_with_berries': require('../assets/images/toast_with_berries.png'),
    'chicken_burger': require('../assets/images/chicken_burger.png'),
    'chocalate_cake': require('../assets/images/chocalate_cake.png'),
    'cup_cake': require('../assets/images/cup_cake.png'),
  }

  if (staticImages[imageName]) {
    return staticImages[imageName]
  }

  return { uri: imageName }
}

const HomeScreen = ({ navigation }) => {
  const [recipes, setRecipes] = useMMKVStorage('testRecipes', MMKV, [])

  // const { getUser } = useAuth();

  const email = auth().currentUser.email 
  
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity>
          <PlusIcon/>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('MenuScreen')
          }}
        >
          <MenuIcon/>
        </TouchableOpacity>
      )
    })

    if (recipes.length == 0) {
      setRecipes([
        {
          favorite: true,
          image: 'toast_with_berries',
          category: 'breakfast',
          name: 'Toast with Berries',
          time: '10:00',
          rating: '4.5',
        },
        {
          favorite: false,
          image: 'chicken_burger',
          category: 'dinner',
          name: 'Chicken Burger',
          time: '20:00',
          rating: '4.3',
        },
        {
          favorite: false,
          image: 'chocalate_cake',
          category: 'desert',
          name: 'Chocolate Cake',
          time: '30:00',
          rating: '3.8',
        },
        {
          favorite: false,
          image: 'cup_cake',
          category: 'desert',
          name: 'Cup Cake',
          time: '10:00',
          rating: '4.7',
        },
      ])
    }
  }, [])

  const ListHeaderComponent = () => {
    return (
      <View style={styles.container}>
        <View style={styles.rowFlexMarginEight}>
          <Text style={styles.welcomeText}>Welcome</Text>
          <Text style={styles.usernameText}>
            {' ' + email.charAt(0).toUpperCase() + email.slice(1, email.indexOf('@'))}
            {
              // Capitalized first character of the name.
            }
          </Text> 
        </View>
        <Text style={{...styles.usernameText, fontSize: 40, marginTop: 8,}}>
          What would you like to cook today?
        </Text>
        <View style={styles.rowFlexMarginEight}>
          <View style={styles.searchWrapper}>
            <TextInput 
              style={styles.search}
              placeholder='Search Recipe'
              placeholderTextColor={'white'}
            />
            <SearchIcon/>
          </View>
          <TouchableOpacity
            style={styles.filterWrapper}
          >
            <FilterIcon/>
          </TouchableOpacity>
        </View>
        <View>
          <View style={{...styles.rowFlexMarginEight, justifyContent: 'space-between'}}>
            <Text style={styles.lineText}>Today's Fresh Recipe</Text>
            <TouchableOpacity
              onPress={() => {
                console.log(auth().currentUser);
              }}
            >
              <Text style={styles.linePressableText}>See All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            style={styles.todaysFlatList}
            horizontal
            data={recipes}
            removeClippedSubviews={false}
            renderItem={recipe => {
              return (
                <View style={styles.horizontalCard}>
                  <View style={styles.upperCardContainer}>
                    <TouchableOpacity
                      onPress={() => {
                        setRecipes([
                          ...recipes.slice(0, recipe.index), 
                          {
                            favorite: !recipe.item.favorite,
                            image: recipe.item.image,
                            category: recipe.item.category,
                            name: recipe.item.name,
                            time: recipe.item.time,
                            rating: recipe.item.rating,
                          },
                          ...recipes.slice(recipe.index + 1)
                        ])
                      }}
                    >
                      {recipe.item.favorite ? <FavoriteIcon/> : <NotFavoriteIcon/>}
                    </TouchableOpacity>
                    <Image style={styles.horizontalCardImage} source={getImageResources(recipe.item.image)}/>
                  </View>
                  <Text style={styles.categoryText}>{recipe.item.category.charAt(0).toUpperCase() + recipe.item.category.slice(1)}</Text>
                  <Text style={styles.nameText}>{recipe.item.name}</Text>
                  <View style={styles.rowFlexMarginEight}>
                    <TimeIcon/>
                    <Text style={styles.timeText}>{recipe.item.time}</Text>
                  </View>
                  <Text style={styles.nameText}>{recipe.item.rating}/5</Text>
                </View>
              )
            }}
          />
        </View>
        <View>
          <View style={{...styles.rowFlexMarginEight, justifyContent: 'space-between'}}>
            <Text style={styles.lineText}>Recommended</Text>
            <TouchableOpacity>
              <Text style={styles.linePressableText}>See All</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  return (
    <FlatList
      data={recipes}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      renderItem={recipe => {
        return (
          <View style={styles.verticalCard}>
            <Image style={styles.verticalCardImage} source={getImageResources(recipe.item.image)} resizeMethod='resize' resizeMode='cover' />
            <View style={styles.verticalCardTextContainer}>
              <Text style={styles.verticalCardName} >{recipe.item.name}</Text>
              <Text style={styles.verticalCardRating} >{recipe.item.rating}/5</Text>
            </View>
            <View style={styles.verticalCardRightContainer}>
              <TouchableOpacity
                onPress={() => {
                  setRecipes([
                    ...recipes.slice(0, recipe.index), 
                    {
                      favorite: !recipe.item.favorite,
                      image: recipe.item.image,
                      category: recipe.item.category,
                      name: recipe.item.name,
                      time: recipe.item.time,
                      rating: recipe.item.rating,
                    },
                    ...recipes.slice(recipe.index + 1)
                  ])
                }}
              >
                {recipe.item.favorite ? <FavoriteIcon/> : <NotFavoriteIcon/>}
              </TouchableOpacity>
              <View style={styles.verticalCardTimeContainer}>
                <TimeIcon/>
                <Text style={styles.verticalCardTimeText}>{recipe.item.time}</Text>
              </View>
            </View>
          </View>
        )
      }}
      ListHeaderComponent={ListHeaderComponent}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1E1E1E',
  },
  contentContainer: {
    paddingHorizontal: 24,
  },
  rowFlexMarginEight: {
    flexDirection: 'row',
    marginVertical: 4,
    alignItems: 'center'
  },
  welcomeText: {
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
  },
  usernameText: {
    color: '#FF6B00',
    fontSize: 24,
    fontWeight: '600',
  },
  searchWrapper: {
    flex: 1,
    borderColor: 'white', 
    borderWidth: 1, 
    borderRadius: 8, 
    height: 40,
    marginRight: 32,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  search: {
    flex: 1,
    height: 40,
    color: 'white',
  },
  filterWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    width: 40,
    height: 40,
  },
  lineText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '400',
  },
  linePressableText: {
    color: '#FF6B00',
    fontSize: 16,
    fontWeight: '400',
  },
  todaysFlatList: {
    marginTop: 8,
    overflow: 'visible'
  },
  horizontalCard: {
    width: 168,
    height: 224,
    backgroundColor: '#373737',
    borderRadius: 20,
    paddingLeft: 16,
    paddingTop: 16,
    marginRight: 8,
  },
  upperCardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 112,
  },
  horizontalCardImage: {
    width: 96,
    height: 96,
  },
  categoryText: {
    color: 'aqua',
    fontSize: 12,
  },
  nameText: {
    color: 'white',
    fontSize: 16,
  },
  timeText: {
    color: '#FF6B00',
    marginLeft: 8,
  },
  verticalCard: {
    width: 344,
    height: 64,
    backgroundColor: '#373737',
    borderRadius: 10,
    marginBottom: 8,
    flexDirection: 'row',
    paddingHorizontal: 8,
  },
  verticalCardImage: {
    width: 64,
    height: 64,
  },
  verticalCardTextContainer: {
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  verticalCardName: {
    color: 'white',
    fontSize: 20,
  },
  verticalCardRating: {
    color: 'white',
  },
  verticalCardRightContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'space-around',
  },
  verticalCardTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verticalCardTimeText: {
    marginLeft: 8,
    color: '#FF6B00'
  },

})

export default HomeScreen;
