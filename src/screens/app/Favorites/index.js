import React, {useContext, useEffect, useState} from 'react';
import {Alert, FlatList, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import FavoriteItem from '../../../components/FavoriteItem';
import Header from '../../../components/Header';
import {
  deleteSavedService,
  getSavedServices,
} from '../../../utils/backendCalls';
import {SavedServicesContext} from '../../../../App';

const Favorites = ({navigation}) => {
  const {savedServices, setSavedServices} = useContext(SavedServicesContext);

  useEffect(() => {
    const fetchSavedServices = async () => {
      const data = await getSavedServices();
      setSavedServices(data);
    };

    fetchSavedServices();
  }, []);

  const renderItem = ({item}) => {
    const onProductPress = () => {
      navigation.navigate('ProductDetails', {product: item});
    };

    const onRemove = async () => {
      const updatedServices = await deleteSavedService(item?._id);
      if (Array.isArray(updatedServices)) {
        setSavedServices(updatedServices);
      }
    };

    const onIconPress = () => {
      Alert.alert('Bạn muốn xóa bài tập khỏi mục ưa thích?', '', [
        {text: 'Đúng', onPress: onRemove},
        {text: 'Hủy'},
      ]);
    };

    return (
      <FavoriteItem
        onPress={onProductPress}
        onIconPress={onIconPress}
        {...item}
      />
    );
  };

  return (
    <SafeAreaView>
      <Header title="Ưu thích" />

      <FlatList
        ListEmptyComponent={
          <Text style={{textAlign: 'center', marginTop: 40}}>
            Bạn chưa có bất kỳ mục ưa thích nào!
          </Text>
        }
        data={savedServices}
        renderItem={renderItem}
        keyExtractor={item => String(item._id)}
        extraData={savedServices}
      />
    </SafeAreaView>
  );
};

export default React.memo(Favorites);
