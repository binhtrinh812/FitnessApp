import {
  ScrollView,
  Text,
  Image,
  View,
  Pressable,
  Modal,
  StyleSheet,
} from 'react-native';
import {styles} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import Button from '../../../components/Button';
import ImageCarousel from '../../../components/ImageCarousel';
import {saveService, deleteSavedService} from '../../../utils/backendCalls';
import {SavedServicesContext, ServicesContext} from '../../../../App';
import React, {useContext, useState} from 'react';

const ProductDetails = ({route, navigation}) => {
  const params = route?.params || {};
  const {services} = useContext(ServicesContext);
  const {savedServices, setSavedServices} = useContext(SavedServicesContext);
  const [alertVisible, setAlertVisible] = useState(false);
  const {isMyListing} = route.params || {};

  const product = services?.find(
    service => service?._id === params?.product?._id,
  );

  const isSaved =
    Array.isArray(savedServices) &&
    savedServices.some(item => item._id === product?._id);

  const onBackPress = () => {
    navigation.goBack();
  };

  const onContact = () => {
    setAlertVisible(true);
  };

  const onBookmark = async () => {
    if (!product) return;

    setSavedServices(prevSavedServices => {
      const savedList = Array.isArray(prevSavedServices)
        ? prevSavedServices
        : [];

      const isAlreadySaved = savedList.some(item => item._id === product._id);

      let updatedList;
      if (isAlreadySaved) {
        updatedList = savedList.filter(item => item._id !== product._id);
      } else {
        updatedList = [...savedList, {...product, liked: true}];
      }
      return updatedList;
    });

    try {
      if (isSaved) {
        await deleteSavedService(product._id);
      } else {
        await saveService(product._id);
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật bookmark:', error);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container}>
        {product?.images?.length ? (
          <ImageCarousel images={product?.images} />
        ) : (
          <Image style={styles.image} source={{uri: product?.image}} />
        )}
        <View style={styles.content}>
          <Text style={styles.title}>{product?.title}</Text>
          <Text style={styles.time}>Thời lượng: {product?.time}</Text>
          <Text style={styles.description}>{product?.description}</Text>
        </View>

        <Pressable onPress={onBackPress} style={styles.backContainer}>
          <Image
            style={styles.backIcon}
            source={require('../../../assets/back.png')}
          />
        </Pressable>
      </ScrollView>

      <View style={styles.footer}>
        {isMyListing ? (
          <Pressable
            onPress={() => navigation.navigate('UpdateListing', {product})}
            style={styles.bookmarkContainer}>
            <Image
              style={styles.bookmarkIcon}
              source={require('../../../assets/edit.png')}
            />
          </Pressable>
        ) : (
          <Pressable onPress={onBookmark} style={styles.bookmarkContainer}>
            <Image
              style={styles.bookmarkIcon}
              source={
                isSaved
                  ? require('../../../assets/bookmark_filled.png')
                  : require('../../../assets/bookmark_blue.png')
              }
            />
          </Pressable>
        )}
        <Button onPress={onContact} title="Liên hệ tác giả" />
      </View>

      <Modal transparent visible={alertVisible} animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.alertBox}>
            <Text style={styles.alertTitle}>Thông tin tác giả</Text>
            <Text style={styles.alertMessage}>
              Tên: No Name {'\n'}
              Email: support@mail.com{'\n'}
              Số điện thoại: 127282827
            </Text>
            <Pressable
              style={styles.alertButton}
              onPress={() => setAlertVisible(false)}>
              <Text style={styles.alertButtonText}>Đóng</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default React.memo(ProductDetails);
