import {request} from './request';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = async values => {
  try {
    const response = await request({
      url: '/user/login',
      method: 'post',
      data: values,
    });

    if (response?.data?.token) {
      await AsyncStorage.setItem('auth_token', response?.data?.token);

      return response?.data?.token;
    }
  } catch (e) {
    // console.log('e login :>> ', e);
  }
};

export const signup = async values => {
  try {
    const response = await request({
      url: '/user/register',
      method: 'post',
      data: values,
    });

    if (response) {
      const {email, password} = values;
      const loginResponse = await login({email, password});

      return loginResponse;
    }
  } catch (e) {
    // console.log('e signup :>> ', e);
  }
};

export const getProfile = async () => {
  try {
    const response = await request({
      url: `/getCurrentUser`,
      method: 'get',
    });

    if (response) {
      return response?.data;
    }
  } catch (e) {
    console.log('e profile :>> ', e);
  }
};

export const createNewUser = async idToken => {
  try {
    const response = await request({
      url: `/createNewUser`,
      method: 'post',
      data: {
        idToken,
      },
    });

    if (response) {
      return response?.data;
    }
  } catch (e) {
    console.log('e profile :>> ', e);
  }
};

export const updateProfile = async data => {
  try {
    const response = await request({
      url: '/user/profile',
      method: 'patch',
      data,
    });

    if (response) {
      const profile = await getProfile();
      return profile;
    }
  } catch (e) {
    // console.log('e profile :>> ', e);
  }
};

export const getAllServices = async () => {
  try {
    const response = await request({
      url: '/services/all',
      method: 'get',
    });

    if (response) {
      return response?.data;
    }
  } catch (e) {
    console.log('e services :>> ', e.response);
  }
};

export const updateService = async (id, data) => {
  try {
    const response = await request({
      url: `/services/${id}`,
      method: 'put',
      data: {
        ...data,
      },
    });

    if (response) {
      const services = await getAllServices();
      return services;
    }
  } catch (e) {
    // console.log('e services :>> ', e.response);
  }
};

export const deleteService = async id => {
  try {
    const response = await request({
      url: `/services/${id}`,
      method: 'delete',
    });

    if (response) {
      const services = await getAllServices();
      return services;
    }
  } catch (e) {
    // console.log('e services :>> ', e.response);
  }
};

export const addService = async data => {
  try {
    const formData = new FormData();
    const objKeys = Object.keys(data);

    objKeys.forEach(key => {
      if (key === 'images' && Array.isArray(data[key])) {
        // Nếu có nhiều ảnh, thêm từng ảnh vào FormData
        data[key].forEach(img => {
          formData.append('images', img);
        });
      } else {
        formData.append(key, data[key]);
      }
    });

    const response = await request({
      url: '/services',
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    });

    if (response) {
      const services = await getAllServices();
      return services;
    }
  } catch (e) {
    console.log('e add services :>> ', e.response);
  }
};

export const saveService = async serviceId => {
  try {
    const response = await request({
      url: '/service-saved',
      method: 'post',
      data: {
        serviceId,
      },
    });

    if (response) {
      const savedServices = await getSavedServices();
      return savedServices;
    }
  } catch (e) {
    console.log('e save service :>> ', e.response);
  }
};

export const getSavedServices = async () => {
  try {
    const response = await request({
      url: '/service-saved',
      method: 'get',
    });

    if (response) {
      return response?.data;
    }
  } catch (e) {
    console.log('e saved services :>> ', e.response);
  }
};

export const deleteSavedService = async serviceId => {
  try {
    const response = await request({
      url: `/service-saved/${serviceId}`,
      method: 'delete',
    });

    if (response) {
      const savedServices = await getSavedServices();
      return savedServices;
    }
  } catch (e) {
    console.log('e delete saved service :>> ', e.response);
  }
};
