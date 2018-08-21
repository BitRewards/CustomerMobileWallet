import {
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native';

const Touchable = Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback;

export default Touchable;
