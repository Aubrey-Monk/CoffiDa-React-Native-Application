import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { Text, Searchbar, Menu, Divider, Button, Checkbox, useTheme } from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome';
import Slider from '@react-native-community/slider'
import PropTypes from 'prop-types'
import FindLocations from '../components/find_locations'
import styles from '../styles/stylesheet'

const HomeScreen = (props) => {

  const { colors } = useTheme()

  const [listData, setListData] = useState([])

  const [searchQuery, setSearchQuery] = useState('')
  const [overallRating, setOverallRating] = useState(0)
  const [priceRating, setPriceRating] = useState(0)
  const [qualityRating, setQualityRating] = useState(0)
  const [clenlinessRating, setClenlinessRating] = useState(0)
  const [searchIn, setSearchIn] = useState('')


  // for the preference menu
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);


  // check box
  const [checked, setChecked] = useState(false);



  const onChangeSearch = async (query) => {
    setSearchQuery(query)
    const data = await FindLocations(query, overallRating, priceRating, qualityRating, clenlinessRating, searchIn)
    setListData(data)
  };

  const onCheck = () => {
    if (searchIn === '') {
      setSearchIn('favourite')
    } else {
      setSearchIn('')
    }
    setChecked(!checked)
  }

  const submitPreferences = async () => {
    const data = await FindLocations(searchQuery, overallRating, priceRating, qualityRating, clenlinessRating, searchIn)
    setListData(data)
    closeMenu()
  }


  useEffect(() => {
    async function getLocations() {
      const data = await FindLocations('')
      setListData(data)
    }
    getLocations();
  }, []);

  return (
    <View style={styles.flexContainer}>

      <View style={styles.homeSearchView}>
        <View style={styles.homeSearchBarView}>
          <Searchbar
            style={styles.homeSearchBar}
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
          />
        </View>
        <View style={styles.homePrefMenuView}>
          <Menu
            style={styles.homePrefMenu}
            visible={visible}
            onDismiss={closeMenu}
            anchor={<Button mode="contained" onPress={openMenu} contentStyle={styles.homePrefMenuButtonContent}><Icon name="cog" size={24} color="#fff" /></Button>} >
            <Menu.Item onPress={() => { }} title={`Overall Rating: ${overallRating}`} />
            <Slider
              minimumValue={0}
              maximumValue={5}
              step={1}
              onSlidingComplete={setOverallRating}
              value={overallRating}
              minimumTrackTintColor={colors.background}
              thumbTintColor={colors.background}
            />
            <Divider />
            <Menu.Item onPress={() => { }} title={`Price Rating: ${priceRating}`} />
            <Slider
              minimumValue={0}
              maximumValue={5}
              step={1}
              onSlidingComplete={setPriceRating}
              value={priceRating}
              minimumTrackTintColor={colors.background}
              thumbTintColor={colors.background}
            />
            <Divider />
            <Menu.Item onPress={() => { }} title={`Quality Rating: ${qualityRating}`} />
            <Slider
              minimumValue={0}
              maximumValue={5}
              step={1}
              onSlidingComplete={setQualityRating}
              value={qualityRating}
              minimumTrackTintColor={colors.background}
              thumbTintColor={colors.background}
            />
            <Divider />
            <Menu.Item onPress={() => { }} title={`Clenliness Rating: ${clenlinessRating}`} />
            <Slider
              minimumValue={0}
              maximumValue={5}
              step={1}
              onSlidingComplete={setClenlinessRating}
              value={clenlinessRating}
              minimumTrackTintColor={colors.background}
              thumbTintColor={colors.background}
            />
            <Divider />
            <View style={styles.homeCheckBoxView}>
              <Menu.Item onPress={() => { }} title="Favourites" />
              <View style={styles.homeCheckBox}>
                <Checkbox
                  color={colors.background}
                  status={checked ? 'checked' : 'unchecked'}
                  onPress={() => {
                    onCheck();
                  }}
                />
              </View>
            </View>
            <Divider />
            <Button mode="contained" onPress={submitPreferences}><Text>Save</Text></Button>
          </Menu>
        </View>
      </View>

      <View style={styles.homeFlatListView}>
        <FlatList
          data={listData}
          renderItem={({ item }) => (
            <View>
              <TouchableOpacity
                style={[{ backgroundColor: colors.primary, borderColor: colors.accent }, styles.homeTouchableOpacity]}
                onPress={() => props.navigation.navigate('Location Info', {id: item.location_id})}
              >
                <Text>{item.location_name}</Text>
                <Text>{item.avg_overall_rating}</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.location_id.toString()}
        />
      </View>
    </View>
  )
}

HomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
}

export default HomeScreen