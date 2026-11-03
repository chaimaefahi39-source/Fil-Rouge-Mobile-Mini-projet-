import React from 'react';
import { Redirect } from 'expo-router';
import { useAuthStore } from '../store/authStore';

export default function IndexRoute() {
  const token = useAuthStore((state) => state.token);

  return <Redirect href={token ? '/home' : '/login'} />;
}
