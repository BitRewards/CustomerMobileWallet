import * as React from 'react';
import { Image, ImageSourcePropType, ImagePropsBase } from 'react-native';
import { NavigationScreenConfig } from 'react-navigation';

export function createBottomBarOptions(label: string, src: ImageSourcePropType): NavigationScreenConfig<any> {
  return {
    tabBarLabel: label,
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
