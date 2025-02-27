import React, {useContext, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import {styles} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../../components/Header';
import {launchImageLibrary} from 'react-native-image-picker';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import {categories} from '../../../data/categories';
import {addService} from '../../../utils/backendCalls';
import {SavedServicesContext, ServicesContext} from '../../../../App';

const CreateListing = ({navigation}) => {
  const [images, setImages] = useState([]);
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(false);
  const {setServices} = useContext(ServicesContext);
  const {setSavedServices} = useContext(SavedServicesContext);
  const [errors, setErrors] = useState({});

  const goBack = () => {
    navigation.goBack();
  };

  const uploadNewImage = async () => {
    setLoading(true);
    const result = await launchImageLibrary();

    if (result?.assets?.length) {
      setImages(list => [...list, ...result?.assets]);
      setLoading(false);
    }
  };

  const onDeleteImage = image => {
    setImages(list => {
      const filteredImages = list.filter(
        img => img?.fileName !== image?.fileName,
      );
      return filteredImages;
    });
  };

  const onChange = (value, key) => {
    setValues(val => ({...val, [key]: value}));
    if (errors[key]) {
      setErrors(prev => ({...prev, [key]: ''}));
    }
  };

  const validate = () => {
    let newErrors = {};

    if (!values.title || values.title.trim() === '') {
      newErrors.title = 'Vui lòng nhập tiêu đề!';
    }
    if (!values.category) {
      newErrors.category = 'Vui lòng chọn danh mục!';
    }
    if (!values.time || isNaN(values.time) || values.time <= 0) {
      newErrors.time = 'Thời lượng phải là số và lớn hơn 0!';
    }
    if (!values.description || values.description.trim() === '') {
      newErrors.description = 'Vui lòng nhập chi tiết bài tập!';
    }
    if (images.length === 0) {
      newErrors.images = 'Vui lòng thêm ít nhất một ảnh!';
    }

    setErrors(newErrors);
    console.log('Errors:', newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async () => {
    if (!validate()) {
      console.log('Validation failed', errors);
      return;
    }

    try {
      const img = images?.length ? images[0] : null;
      const data = {
        ...values,
        category: values.category?.id,
      };

      if (img) {
        data['images'] = images.map((img, index) => ({
          uri: img.uri,
          name: img.fileName || `image_${index}.jpg`,
          type: img.type || 'image/jpeg',
        }));
      }

      const result = await addService(data);
      setServices(result.services);
      setSavedServices(result.savedServices);

      Alert.alert('Thành công', 'Bài tập đã được thêm mới!', [
        {text: 'OK', onPress: () => navigation.navigate('MyListings')},
      ]);
    } catch (error) {
      console.error('Lỗi khi thêm bài tập:', error);
      Alert.alert('Lỗi', 'Có lỗi xảy ra khi thêm bài tập, vui lòng thử lại!');
    }
  };

  return (
    <SafeAreaView>
      <Header showBack={true} onBackPress={goBack} title="Thêm bài tập mới" />

      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior="position">
          <Text style={styles.sectionTitle}>Thêm ảnh</Text>

          <View style={styles.imageRow}>
            <TouchableOpacity
              disabled={loading}
              style={styles.uploadContainer}
              onPress={uploadNewImage}>
              <View style={styles.uploadCircle}>
                <Text style={styles.uploadPlus}>+</Text>
              </View>
            </TouchableOpacity>

            {images?.map(image => (
              <View style={styles.imageCont} key={image?.fileName}>
                <Image style={styles.image} source={{uri: image?.uri}} />
                <Pressable hitSlop={20} onPress={() => onDeleteImage(image)}>
                  <Image
                    style={styles.delete}
                    source={require('../../../assets/close.png')}
                  />
                </Pressable>
              </View>
            ))}

            {loading ? <ActivityIndicator /> : null}
            {errors.images && (
              <Text style={styles.errorText}>({errors.images})</Text>
            )}
          </View>

          <Text style={styles.label}>
            Tiêu đề{' '}
            {errors.title && (
              <Text style={styles.errorText}>({errors.title})</Text>
            )}
          </Text>
          <Input
            placeholder="Tiêu đề ..."
            value={values.title}
            onChangeText={v => onChange(v, 'title')}
          />

          <Text style={styles.label}>
            Danh mục{' '}
            {errors.category && (
              <Text style={styles.errorText}>({errors.category})</Text>
            )}
          </Text>
          <Input
            placeholder="Danh mục bài tập"
            value={values.category}
            onChangeText={v => onChange(v, 'category')}
            type="picker"
            options={categories}
          />

          <Text style={styles.label}>
            Thời lượng{' '}
            {errors.time && (
              <Text style={styles.errorText}>({errors.time})</Text>
            )}
          </Text>

          <Input
            placeholder="Nhập thời lượng ..."
            value={values.time}
            onChangeText={v => onChange(v, 'time')}
            keyboardType="numeric"
          />

          <Text style={styles.label}>
            Chi tiết bài tập{' '}
            {errors.description && (
              <Text style={styles.errorText}>({errors.description})</Text>
            )}
          </Text>
          <Input
            style={styles.textarea}
            placeholder="Chi tiết ..."
            value={values.description}
            onChangeText={v => onChange(v, 'description')}
            multiline
          />
        </KeyboardAvoidingView>

        <Button onPress={onSubmit} title="Thêm mới" style={styles.button} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default React.memo(CreateListing);
