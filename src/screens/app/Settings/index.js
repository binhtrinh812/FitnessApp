import React, {useContext, useState} from 'react';
import {
  Image,
  Linking,
  Pressable,
  ScrollView,
  Text,
  View,
  Alert,
} from 'react-native';
import {styles} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../../components/Header';
import ListItem from '../../../components/ListItem';
import EditableBox from '../../../components/EditableBox';
import Button from '../../../components/Button';
import {ProfileContext} from '../../../../App';
import {updateProfile} from '../../../utils/backendCalls';

const Settings = ({navigation}) => {
  const [editing, setEditing] = useState(false);
  const {profile, setProfile} = useContext(ProfileContext);
  const [values, setValues] = useState({
    nickname: profile?.nickname,
    email: profile?.email,
  });

  const onEditPress = () => {
    setEditing(true);
  };

  const onConfirmSave = () => {
    Alert.alert(
      'Xác nhận lưu',
      'Bạn có chắc chắn muốn lưu thông tin đã chỉnh sửa không?',
      [
        {text: 'Hủy', style: 'cancel'},
        {
          text: 'Lưu',
          onPress: async () => {
            try {
              const updatedProfile = await updateProfile(values);
              setProfile(updatedProfile);
              setEditing(false);
              setTimeout(() => {
                Alert.alert('Thành công', 'Thông tin đã được cập nhật.', [
                  {text: 'OK', onPress: () => navigation.replace('Profile')},
                ]);
              }, 100);
            } catch (error) {
              console.error('Lỗi khi cập nhật thông tin:', error);
              Alert.alert(
                'Lỗi',
                'Không thể cập nhật thông tin. Vui lòng thử lại.',
              );
            }
          },
        },
      ],
    );
  };

  const onChange = (key, value) => {
    setValues(v => ({...v, [key]: value}));
  };

  const onItemPress = () => {
    Linking.openURL('https://google.com');
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView>
      <Header showBack onBackPress={goBack} title="Cài đặt" />
      <ScrollView style={styles.container}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Thông tin cá nhân</Text>
          <Pressable onPress={onEditPress}>
            <Image
              style={styles.icon}
              source={require('../../../assets/edit.png')}
            />
          </Pressable>
        </View>
        <EditableBox
          label="Tên"
          onChangeText={v => onChange('nickname', v)}
          value={values.nickname}
          editable={editing}
        />
        <EditableBox
          label="Email"
          onChangeText={v => onChange('email', v)}
          value={values.email}
          editable={false}
        />
        {editing ? (
          <Button
            style={styles.button}
            onPress={onConfirmSave}
            title="Lưu thông tin"
          />
        ) : null}

        <Text style={[styles.sectionTitle, {marginTop: 40}]}>
          Trung tâm hỗ trợ
        </Text>
        <ListItem onPress={onItemPress} style={styles.item} title="FAQ" />
        <ListItem
          onPress={onItemPress}
          style={styles.item}
          title="Liên hệ với chúng tôi"
        />
        <ListItem
          onPress={onItemPress}
          style={styles.item}
          title="Điều khoản và quyền riêng tư"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default React.memo(Settings);
