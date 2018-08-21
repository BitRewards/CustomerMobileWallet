import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';
import Touchable from '../Touchable';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    flex: 1,
  },
  optionText: {
    fontSize: 17,
    color: '#000000',
    fontFamily: 'ProximaNova-Regular',
    paddingTop: 16,
    paddingBottom: 15,
    paddingStart: 18,
    paddingEnd: 18,
  },
  infoColumn: {
    flex: 1,
    flexDirection: 'row',
    flexGrow: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionTextWrapper: {
    flex: 1,
  },
  chevron: {
    marginEnd: 15,
  },
});

export interface OtherOptionItemProps {
  onPress?: () => void;
  title?: string;
}
export interface State { }

class OtherOptionItem extends React.Component<OtherOptionItemProps, State> {
  handleClick = () => {
    const {
      onPress,
    } = this.props;
    if (typeof onPress === 'function') {
      onPress();
    }
  }

  render() {
    const {
      title,
    } = this.props;
    return (
      <View style={styles.container}>
        <Touchable onPress={this.handleClick} style={styles.container}>
          <View style={styles.infoColumn}>
            <View style={styles.optionTextWrapper}>
              <Text style={styles.optionText}>{title}</Text>
            </View>
            <Image source={require('../../img/chevron_arrow.png')} style={styles.chevron} />
          </View>
        </Touchable>
      </View>
    );
  }
}

export default OtherOptionItem;
