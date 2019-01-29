import * as React from 'react';
import {
  StyleSheet,
  View,
  Image,
} from 'react-native';
import ItemContainer from './ItemContainer';
import Touchable from '../Touchable';
import BitImage from '../BitImage';

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  iconColumn: {
    paddingStart: 12,
    paddingEnd: 12,
    paddingTop: 16,
    paddingBottom: 16,
  },
  arrowColumn: {
    paddingStart: 12,
    paddingEnd: 12,
    paddingTop: 30,
    paddingBottom: 30,
  },
  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ff764a',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chevronBox: {
    height: 20,
    justifyContent: 'center',
  },
  chevron: {
    width: 8,
    height: 13,
  },
  itemContainer: {
    flex: 1,
  },
});

export interface ClickableItemContainerProps {
  children: JSX.Element | JSX.Element[];
  onPress?: () => void;
  image?: string;
  highlight?: boolean;
}
export interface State { }

class ClickableItemContainer extends React.Component<ClickableItemContainerProps, State> {
  render() {
    const {
      children,
      onPress,
      highlight,
      image,
    } = this.props;
    return (
      <ItemContainer highlight={highlight}>
        <Touchable onPress={onPress}>
          <View style={styles.container}>
            <View style={styles.iconColumn}>
              <View style={styles.iconBox}>
                { (typeof image === 'string') && (
                    // @ts-ignore
                    <BitImage
                      width={50}
                      height={50}
                      uri={image}
                    />
                  )
                }
              </View>
            </View>
            <View style={styles.itemContainer}>
              {children}
            </View>
            <View style={styles.arrowColumn}>
              <View style={styles.chevronBox}>
                <Image source={require('../../img/chevron_arrow.png')} style={styles.chevron} />
              </View>
            </View>
          </View>
        </Touchable>
      </ItemContainer>
    );
  }
}

export default ClickableItemContainer;
