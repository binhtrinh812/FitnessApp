import React, {useState, useEffect, useContext} from 'react';
import {FlatList, View} from 'react-native';
import {styles} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../../components/Header';
import {categories} from '../../../data/categories';
import CategoryBox from '../../../components/CategoryBox';
import ProductHomeItem from '../../../components/ProductHomeItem';
import {
  getAllServices,
  getData,
  getSavedServices,
} from '../../../utils/backendCalls';
import {SavedServicesContext, ServicesContext} from '../../../../App';
import {useAuth0} from 'react-native-auth0';
import {addTokenToAxios} from '../../../utils/request';

const Home = ({navigation}) => {
  const [selectedCategory, setSelectedCategory] = useState();
  const [keyword, setKeyword] = useState();
  const [filteredProducts, setFilteredProducts] = useState(services);
  const {services, setServices} = useContext(ServicesContext);
  const {setSavedServices} = useContext(SavedServicesContext);
  const {user, getCredentials} = useAuth0();

  useEffect(() => {
    const fetchData = async () => {
      const token = await getCredentials();
      addTokenToAxios(token);
      const data = await getData();

      setServices(data.services);
      setSavedServices(data.savedServices);
    };

    fetchData();
  }, [user]);

  useEffect(() => {
    console.log('🚀 Dữ liệu trong services:', services);
  }, [services]);

  useEffect(() => {
    if (selectedCategory && !keyword) {
      const updatedProducts = services.filter(
        product => String(product?.category) === String(selectedCategory),
      );
      setFilteredProducts(updatedProducts);
    } else if (selectedCategory && keyword) {
      const updatedProducts = services.filter(
        product =>
          String(product?.category) === String(selectedCategory) &&
          product?.title?.toLowerCase().includes(keyword?.toLowerCase()),
      );
      setFilteredProducts(updatedProducts);
    } else if (!selectedCategory && keyword) {
      const updatedProducts = services.filter(product =>
        product?.title?.toLowerCase().includes(keyword?.toLowerCase()),
      );
      setFilteredProducts(updatedProducts);
    } else if (!keyword && !selectedCategory) {
      setFilteredProducts(services);
    }
  }, [selectedCategory, keyword, services]);

  const renderCategoryItem = ({item, index}) => {
    return (
      <CategoryBox
        onPress={() => setSelectedCategory(item?.id)}
        isSelected={item?.id === selectedCategory}
        isFirst={index === 0}
        title={item?.title}
        image={item?.image}
      />
    );
  };

  const renderProductItem = ({item}) => {
    const onProductPress = product => {
      navigation.navigate('ProductDetails', {product});
    };

    return <ProductHomeItem onPress={() => onProductPress(item)} {...item} />;
  };

  return (
    <SafeAreaView>
      <Header
        showSearch
        onSearch={setKeyword}
        keyword={keyword}
        title="Tìm kiếm"
      />

      <FlatList
        showsHorizontalScrollIndicator={false}
        style={styles.list}
        horizontal
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item, index) => String(index)}
      />

      <FlatList
        style={styles.productsList}
        numColumns={2}
        data={filteredProducts}
        renderItem={renderProductItem}
        keyExtractor={item => String(item.id)}
        ListFooterComponent={<View style={{height: 200}} />}
      />
    </SafeAreaView>
  );
};

export default React.memo(Home);
