import { type Article } from '@/interfaces/article';
import axios, { AxiosResponse } from 'axios';
import apiClient from './apiClient';
import { auth } from  "@/auth";
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

interface Credentials {
  username: string;
  password: string;
}

export const login = async (credentials: Credentials): Promise<AxiosResponse>  => {
        try {
          const response = await axios.post(`${API_URL}/users/login/`, {
            user: {
                email: credentials?.username,
                password: credentials?.password,
            }
          });
          const user = response.data["user"];
          if (user) {
            // return { ...user, username: user?.name, accessToken: user?.token };
            return { ...user, name: user?.name, accessToken: user?.token };
          } else {
            return { data: null } as AxiosResponse;
          }
        } catch (error) {
          console.error('Authentication error:', error);
          return { data: null } as AxiosResponse;
        }
}

