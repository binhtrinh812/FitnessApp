import React, {useState} from 'react';
import {Pressable, Text, View, Image} from 'react-native';
import Config from 'react-native-config';
import {styles} from './styles';

const ProductHomeItem = ({title, time, images, onPress}) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      {images?.length !== 0 && (
        <Image style={styles.image} source={{uri: images[0]}} />
      )}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.time}>Thời lượng: {time}</Text>
    </Pressable>

    // <Pressable onPress={onPress} style={styles.container}>
    //   <Image
    //     style={styles.image}
    //     source={{uri: `${Config.API_BASE_URL}/${image?.path}`}}
    //   />
    //   <Text style={styles.title}>{title}</Text>
    //   <Text style={styles.time}>$ {time}</Text>
    // </Pressable>
  );
};

export default React.memo(ProductHomeItem);
