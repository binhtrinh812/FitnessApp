import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';

const Checkbox = ({checked, onCheck}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => onCheck(!checked)}
      style={styles.container}>
      <View style={styles.innerContainer}>
        {checked ? (
          <Image
            style={styles.checkIcon}
            source={require('../../assets/check.png')}
          />
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(Checkbox);
