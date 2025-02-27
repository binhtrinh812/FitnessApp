import React, {useContext} from 'react';
import {FlatList, Alert, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import FavoriteItem from '../../../components/FavoriteItem';
import Header from '../../../components/Header';
import {ProfileContext, ServicesContext} from '../../../../App';
import {deleteService} from '../../../utils/backendCalls';

const MyListings = ({navigation}) => {
  const {services, setServices} = useContext(ServicesContext);
  const {profile} = useContext(ProfileContext);

  const myServices = Array.isArray(services)
    ? services.filter(service => service?.userId === profile?.auth0Id)
    : [];

  const renderItem = ({item}) => {
    const onProductPress = () => {
      navigation.navigate('ProductDetails', {product: item, isMyListing: true});
    };

    const onRemove = async () => {
      Alert.alert(
        'Xác nhận xóa',
        'Bạn có chắc chắn muốn xóa bài tập này không?',
        [
          {text: 'Hủy', style: 'cancel'},
          {
            text: 'Xóa',
            style: 'destructive',
            onPress: async () => {
              try {
                await deleteService(item?._id);
                setServices(prev => prev.filter(s => s._id !== item._id));

                // Hiển thị thông báo sau khi xóa thành công
                Alert.alert('Thành công', 'Bài tập đã được xóa.');
              } catch (error) {
                console.error('Lỗi khi xóa:', error);
                Alert.alert('Lỗi', 'Không thể xóa bài tập. Vui lòng thử lại.');
              }
            },
          },
        ],
      );
    };

    console.log('Services:', services);
    console.log('Profile ID:', profile?.auth0Id);
    console.log('My Services:', myServices);

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
        keyExtractor={(item, index) => item?._id?.toString() || `item-${index}`}
        ListEmptyComponent={
          <Text style={{textAlign: 'center', marginTop: 20, fontSize: 16}}>
            Bạn chưa có bài tập nào!
          </Text>
        }
      />
    </SafeAreaView>
  );
};

export default React.memo(MyListings);
