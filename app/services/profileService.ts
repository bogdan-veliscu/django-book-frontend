import { type Article } from '@/interfaces/article';
import axios, { AxiosResponse } from 'axios';
import apiClient from './apiClient';
import { auth } from  "@/auth";
import { getSession } from 'next-auth/react';

// Use environment variable or fallback to relative path
const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

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

export const getCurrentUser = async () => {
  try {
    const session = await getSession();
    if (!session?.accessToken) {
      throw new Error('No access token available');
    }

    const response = await axios.get(`${API_URL}/user`, {
      headers: {
        Authorization: `Token ${session.accessToken}`
      }
    });
    return response.data.user;
  } catch (error) {
    console.error('Get current user error:', error);
    throw error;
  }
};

export const updateProfile = async (userData: any) => {
  try {
    const session = await getSession();
    if (!session?.accessToken) {
      throw new Error('No access token available');
    }

    const response = await axios.put(`${API_URL}/user`, {
      user: userData
    }, {
      headers: {
        Authorization: `Token ${session.accessToken}`
      }
    });
    return response.data.user;
  } catch (error) {
    console.error('Update profile error:', error);
    throw error;
  }
};

