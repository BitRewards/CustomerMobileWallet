import * as React from 'react';
import {
  Text,
  Image,
  ImageSourcePropType,
  ImagePropsBase,
  StyleSheet,
} from 'react-native';
import { NavigationScreenConfig } from 'react-navigation';
import { FormattedMessage } from 'react-intl';

const styles = StyleSheet.create({
  bottomBarLabel: {
    fontSize: 10,
    textAlign: 'center',
  },
  bottomBarIcon: {
    height: 24,
    width: 24,
  },
});


export function createBottomBarOptions(labelMessageId: string, src: ImageSourcePropType): NavigationScreenConfig<any> {
  return {
    tabBarLabel: ({ tintColor }: any) => (
      <FormattedMessage
        id={labelMessageId}
      >
        {text => (
          <Text style={[styles.bottomBarLabel, { color: tintColor }]}>
            {text}
          </Text>
        )}
      </FormattedMessage>

    ),
    tabBarIcon: (props: ImagePropsBase) => <Image
      source={src}
      tintColor={props.tintColor}
    />,
    tabBarOptions : {
      inactiveTintColor: '#30364580',
      activeTintColor: '#ff764a',
      style: {
        backgroundColor: '#ffffff',
      },
    },
  };
}
