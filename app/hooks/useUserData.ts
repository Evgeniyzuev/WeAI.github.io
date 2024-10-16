import { useState, useEffect } from 'react';
import WebApp from '@twa-dev/sdk';

let cachedUser: any = null;

export function useUserData() {
  const [user, setUser] = useState(cachedUser);
  const [error, setError] = useState<string | null>(null);
  const [startParam, setStartParam] = useState('');

  useEffect(() => {
    if (cachedUser) return;

    if (typeof window !== 'undefined') {
      const tg = WebApp;
      tg.ready();

      const initDataUnsafe = tg.initDataUnsafe || {};
      setStartParam(WebApp.initDataUnsafe.start_param || '');

      if (initDataUnsafe.user) {
        fetch('/api/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: initDataUnsafe.user,
            start_param: initDataUnsafe.start_param
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.error) {
              setError(data.error);
            } else {
              cachedUser = data;
              setUser(data);
            }
          })
          .catch((err) => {
            console.error(err);
            setError('Failed to fetch user data');
          });
      } else {
        setError('No user data available');
      }
    } else {
      setError('This app should be opened in Telegram');
    }
  }, []);

  const handleIncreaseAicoreBalance = async (amount: number) => {
    if (!user) return;

    try {
      const res = await fetch('/api/increase-aicore-balance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ telegramId: user.telegramId, amount }),
      });
      const data = await res.json();
      if (data.success) {
        setUser({ ...user, aicoreBalance: data.aicoreBalance });
        return { success: true, message: 'Aicore balance increased successfully!' };
      } else {
        return { success: false, message: 'Failed to increase Aicore balance' };
      }
    } catch (err) {
      console.error(err);
      return { success: false, message: 'An error occurred while increasing Aicore balance' };
    }
  };

  const handleIncreaseWalletBalance = async (amount: number) => {
    if (!user) return;

    try {
      const res = await fetch('/api/increase-wallet-balance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ telegramId: user.telegramId, amount }),
      });
      const data = await res.json();
      if (data.success) {
        setUser({ ...user, walletBalance: data.walletBalance });
        return { success: true, message: 'Wallet balance increased successfully!' };
      } else {
        return { success: false, message: 'Failed to increase wallet balance' };
      }
    } catch (err) {
      console.error(err);
      return { success: false, message: 'An error occurred while increasing wallet balance' };
    }
  };

  return {
    user,
    setUser: (newUser: any) => {
      cachedUser = newUser;
      setUser(newUser);
    },
    error,
    setError,
    handleIncreaseAicoreBalance,
    handleIncreaseWalletBalance,
  };
}
