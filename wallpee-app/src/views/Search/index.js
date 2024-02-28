import React from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import { colors } from '../../constants/colors';
import { getData, setData } from '../../utils/storage';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      searchHistory: []
    }
  };

  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('focus', async () => {
      this.refs.searchInput.focus()
      const searchHistory = JSON.parse(await getData('searchItems'))
      if (searchHistory !== null) this.setState({ searchHistory })
    })
  }

  componentWillUnmount() {
    this.focusListener();
  }

  handleTextChange = (text) => {
    this.setState({ searchText: text })
  }

  addToSearchHistory = async () => {
    let { searchText, searchHistory } = this.state
    if (searchHistory && searchHistory.length > 6) searchHistory.splice(searchHistory.length - 2, 1);
    const index = searchHistory.indexOf(searchText.trim())
    if ((searchHistory && searchHistory.length > 0) && index !== -1) {
      searchHistory.splice(index, 1);
      searchHistory.unshift(searchText.trim())
      await setData('searchItems', searchHistory)
    } else {
      searchHistory.unshift(searchText.trim())
      await setData('searchItems', searchHistory)
    }
  }

  renderSearchHistory = () => {
    const { searchHistory } = this.state
    if (searchHistory && searchHistory.length > 0) {
      return (
        <View style={styles.historyWrapper}>
          <Text style={styles.recentSearchText}>Recent Searches</Text>
          <ScrollView
            showsVerticalScrollIndicator={false}
            bounces={false}
            enableOnAndroid={false}
            style={{ flexGrow: 1 }}
            keyboardShouldPersistTaps={'always'}
          >
            {searchHistory.map((item, index) => (
              this.renderSearchText(item, index)
            ))}
          </ScrollView>
        </View>
      )
    }
    return null
  }

  renderSearchText = (item, index) => {
    if(index < 4) {
      return (
        <TouchableOpacity style={styles.searchHistoryView} key={index} onPress={() => this.handleSearch(item)} activeOpacity={1}>
          <MaterialIcon name={'history'} size={22} color={colors.white} />
          <View style={styles.historyTextWrapper}>
            <Text style={styles.historyText} numberOfLines={1} ellipsizeMode={'tail'}>{item}</Text>
          </View>
        </TouchableOpacity>
      )
      }
      return
  }

  handleSearch = async (text) => {
    if (text) await this.setState({ searchText: text })
    const { searchText } = this.state
    if (searchText && searchText.trim().length > 0) {
      await this.addToSearchHistory()
      this.props.navigation.navigate('Wallpaper', { searchText: searchText, from: 'search' })
    }
  }

  render() {
    const { searchText } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.headerView}>
          <TouchableOpacity
            style={styles.iconWrapper}
            activeOpacity={0.4}
            onPress={() => this.props.navigation.goBack()}
          >
            {searchText !== '' ?
              <MaterialIcon name={'arrow-back'} size={22} color={colors.white} />
              :
              <MaterialIcon name={'search'} size={22} color={colors.white} style={styles.searchIcon} />
            }
          </TouchableOpacity>
          <TextInput
            ref="searchInput"
            autoFocus={true}
            autoCorrect={false}
            autoCapitalize={'none'}
            placeholder={'Search'}
            placeholderTextColor={colors.white}
            style={styles.serchInputStyle}
            underlineColorAndroid={'transparent'}
            selectionColor={colors.white}
            onChangeText={text => this.handleTextChange(text)}
            value={searchText}
            returnKeyType={'search'}
            onSubmitEditing={() => this.handleSearch()}
          />
          {searchText !== '' && (
            <TouchableOpacity style={styles.iconWrapper} onPress={() => this.setState({ searchText: '' })}>
              <MaterialIcon name={'close'} size={20} color={colors.white} />
            </TouchableOpacity>
          )}
        </View>
        {this.renderSearchHistory()}
      </View>
    );
  }
}

export default Search;
