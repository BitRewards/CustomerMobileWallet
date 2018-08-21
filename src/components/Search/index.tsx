import * as React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Image,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#00000010',
    borderRadius: 10,
    height: 36,
    padding: 7,
    flexDirection: 'row',
  },
  searchIconBox: {
    width: 16,
    height: 16,
    marginEnd: 7,
  },
  centerText: {
    flex: 1,
    padding: 0,
    fontSize: 17,
    color: '#000000',
    fontFamily: 'ProximaNova-Regular',
    borderWidth: 0,
  },
});

export interface Props { }
export interface State { }

class Search extends React.Component<Props, State> {
  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../../img/ic_search.png')} style={styles.searchIconBox} />
        <TextInput
          style={styles.centerText}
          placeholder='Search'
          placeholderTextColor='#00000040'
          underlineColorAndroid='transparent'
        />
      </View>
    );
  }
}

export default Search;
