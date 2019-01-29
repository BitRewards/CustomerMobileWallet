import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';
import Touchable from '../Touchable';
import { FaqItem } from '../../services/responseTypes';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    flex: 1,
  },
  shadowContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    flex: 1,
    marginBottom: 10,
    elevation: 3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 3,
    shadowOpacity: 0.2,
  },
  questionText: {
    fontSize: 17,
    color: '#303645',
    fontFamily: 'ProximaNova-Semibold',
    marginTop: 12,
    marginBottom: 12,
  },
  answerText: {
    fontSize: 14,
    color: '#303645',
    fontFamily: 'ProximaNova-Regular',
    marginBottom: 28,
  },
  infoColumn: {
    flex: 1,
    flexDirection: 'row',
    flexGrow: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  faqTextWrapper: {
    flex: 1,
  },
  chevronDown: {
    marginEnd: 15,
  },
  chevronUp: {
    marginEnd: 15,
    alignSelf: 'flex-end',
    marginBottom: 31,
    transform: [
      { scaleY: -1 },
    ],
  },
  questionIconOpen: {
    marginTop: 15,
    marginBottom: 15,
    marginStart: 15,
    marginEnd: 10,
    alignSelf: 'flex-start',
  },
  questionIconClosed: {
    marginTop: 15,
    marginBottom: 15,
    marginStart: 15,
    marginEnd: 10,
    alignSelf: 'center',
  },
});

export interface FaqListItemProps {
  item: FaqItem;
}
export interface State {
  isOpen: boolean;
}

class FaqListItem extends React.Component<FaqListItemProps, State> {

  constructor(props: FaqListItemProps) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }

  handleClick = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const {
      item,
    } = this.props;
    const {
      isOpen,
    } = this.state;
    return (
      <View style={styles.shadowContainer}>
        <Touchable onPress={this.handleClick} style={styles.container}>
          <View style={styles.infoColumn}>
            <Image
              source={require('../../img/ic_faq.png')}
              style={[isOpen ? styles.questionIconOpen : styles.questionIconClosed]}
            />
            <View style={styles.faqTextWrapper}>
              <Text style={styles.questionText}>{item.question}</Text>
              { isOpen && (
                <Text style={styles.answerText}>{item.answer}</Text>
              )}
            </View>
            <Image
              source={require('../../img/chevron_arrow_down.png')}
              style={[isOpen ? styles.chevronUp : styles.chevronDown]}
            />
          </View>
        </Touchable>
      </View>
    );
  }
}

export default FaqListItem;
