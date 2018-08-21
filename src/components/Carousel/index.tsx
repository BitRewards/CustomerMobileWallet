import * as React from 'react';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'column',
  },
  bannerContainer: {
    backgroundColor: '#ff764a',
    width: '100%',
    height: 136,
    borderRadius: 6,
  },
  indicatorsBox: {
    marginTop: 11,
    marginBottom: 11,
    flexDirection: 'row',
  },
  indicator: {
    width: 7,
    height: 7,
    borderRadius: 7,
    marginStart: 4.5,
    marginEnd: 4.5,
    backgroundColor: '#00000020',
  },
});

export interface Props { }
export interface State { }

class Carousel extends React.Component<Props, State> {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.bannerContainer} />
        <View style={styles.indicatorsBox}>
          <View style={styles.indicator} />
          <View style={styles.indicator} />
          <View style={styles.indicator} />
          <View style={styles.indicator} />
          <View style={styles.indicator} />
        </View>
      </View>
    );
  }
}

export default Carousel;
