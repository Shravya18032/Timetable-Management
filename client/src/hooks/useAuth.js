// src/hooks/useAuth.js
const useAuth = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  return { user, token };
};

export default useAuth;
