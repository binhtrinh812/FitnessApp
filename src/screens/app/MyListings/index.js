import React, { useContext } from 'react';
import { FlatList, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FavoriteItem from '../../../components/FavoriteItem';
import Header from '../../../components/Header';
import { ProfileContext, ServicesContext } from '../../../../App';
import { deleteService } from '../../../utils/backendCalls';

const MyListings = ({ navigation }) => {
  const { services, setServices } = useContext(ServicesContext);
  const { profile } = useContext(ProfileContext);

  const myServices = Array.isArray(services)
    ? services?.filter(service => service?.userId === profile?.auth0Id)
    : [];

  const renderItem = ({ item }) => {
    const onProductPress = () => {
      navigation.navigate('ProductDetails', { product: item, isMyListing: true });
    };

    const onRemove = async () => {
      Alert.alert(
        'Xác nhận xóa',
        'Bạn có chắc chắn muốn xóa bài tập này không?',
        [
          { text: 'Hủy', style: 'cancel' },
          {
            text: 'Xóa',
            style: 'destructive',
            onPress: async () => {
              const updatedServices = await deleteService(item?._id);
              setServices(updatedServices);
            },
          },
        ]
      );
    };

    return (
      <FavoriteItem
        onIconPress={onRemove}
        icon={require('../../../assets/delete.png')}
        onPress={onProductPress}
        {...item}
      />
    );
  };

  const goBack = () => navigation.goBack();

  return (
    <SafeAreaView>
      <Header title="Bài tập của tôi" showBack onBackPress={goBack} />
      <FlatList
        data={myServices}
        renderItem={renderItem}
        keyExtractor={item => String(item?._id)}
      />
    </SafeAreaView>
  );
};

export default React.memo(MyListings);
