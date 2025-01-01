import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


// 개발 환경에서는 localhost 대신 실제 IP 주소나 개발 서버 주소를 사용
const API_BASE_URL = __DEV__ 
  ? 'http://192.168.0.1:3000/api'  // 개발 서버 IP로 변경 필요
  : 'https://api.production.com';   // 프로덕션 서버 주소로 변경 필요

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 인터셉터 설정
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // 에러 처리 로직
    if (error.response) {
      // 서버 응답이 있는 경우
      console.error('API Error:', error.response.data);
      if (error.response.status === 401) {
        // 인증 에러 처리
        AsyncStorage.removeItem('token');
        // TODO: 로그인 화면으로 리다이렉트
      }
    } else if (error.request) {
      // 요청은 보냈지만 응답을 받지 못한 경우
      console.error('Network Error:', error.request);
    } else {
      // 요청 설정 중 에러 발생
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
); 