import * as React from 'react';
import { View, Text, Animated, StyleSheet, Image, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  completeTransferContainer: {
    width,
    height: 90,
    position: 'absolute',
    backgroundColor: '#ffffff',
    shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowColor: 'rgba(255, 118, 74, 0.56)',
    shadowOffset: { height: 10, width: 0 },
    paddingBottom: 19,
    paddingTop: 23,
    paddingLeft: 14,
    flexDirection: 'row',
  },
  image: {
    width: 24,
    height: 24,
    marginRight: 7,
  },
  baseText: {
    color: '#303645',
    fontFamily: 'ProximaNova-Regular',
    fontSize: 15,
  },
  boldText: {
    fontFamily: 'ProximaNova-Semibold',
  },
});

export interface NotificationProps {
  address: string;
  amount: number;
}

export interface State { }

class Notification extends React.Component<NotificationProps, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      completePayPosition: new Animated.Value(-110),
    };
  }

  showCompletePayNotification = () => {
    const { address, amount } = this.props;
    const { completePayPosition } = this.state;
    const showAnimation = address && amount ? true : false;
    if (showAnimation) {
      Animated.sequence([
        Animated.timing(
          completePayPosition,
          {
            toValue: 0,
            duration: 500,
          },
        ),
        Animated.timing(
          completePayPosition,
          {
            toValue: -110,
            duration: 500,
            delay: 3000,
          },
        ),
      ]).start();
    }
  }

  render() {
    const { address, amount } = this.props;
    const { completePayPosition } = this.state;
    this.showCompletePayNotification();
    return (
      <Animated.View style={[styles.completeTransferContainer, { top: completePayPosition }]}>
        <Image resizeMode='contain' style={styles.image} source={require('../../img/Ok.png')} />
        <View>
          <Text style={styles.baseText}>You have sent <Text style={styles.boldText}>{amount} BIT</Text> to </Text>
          <Text style={styles.baseText}>Ethereum-address: </Text>
          <Text style={styles.boldText}>{address}</Text>
        </View>
      </Animated.View>
    );
  }
}

export default Notification;