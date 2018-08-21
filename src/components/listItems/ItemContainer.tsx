import * as React from 'react';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 4,
    marginTop: 2,
    marginBottom: 8,
    marginStart: 14,
    marginEnd: 14,
    elevation: 3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 3,
    shadowOpacity: 0.2,
  },
  itemContainer: {
  },
  highlightBorder: {
    height: 2,
    backgroundColor: '#ff764a',
  },
});

export interface ItemContainerProps {
  children: JSX.Element | JSX.Element[];
  highlight?: boolean;
}
export interface State { }

class ItemContainer extends React.Component<ItemContainerProps, State> {
  render() {
    const {
      children,
      highlight,
    } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.itemContainer}>
          {children}
        </View>
        {
          highlight && (
            <View style={styles.highlightBorder}/>
          )
        }
      </View>
    );
  }
}

export default ItemContainer;
