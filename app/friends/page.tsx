'use client'

import dynamic from 'next/dynamic'
// import { useState, useEffect } from 'react'
import { useUser } from '../UserContext'

const ReferralSystem = dynamic(() => import('./ReferralSystem'), { ssr: false })

export default function FriendsPage() {
  const { user, setUser } = useUser();
    // const [userData, setUserData] = useState<UserData | null>(null);
    // const [initData, setInitData] = useState('')
    // const [userId, setUserId] = useState('')
    // const [startParam, setStartParam] = useState('')

    // interface UserData {
    //     id: number;
    //     first_name: string;
    //     last_name?: string;
    //     username?: string;
    //     language_code: string;
    //     is_premium?: boolean;
    //   }

    //   useEffect(() => {
    //     const initWebApp = async () => {
    //       if (typeof window !== 'undefined') {
    //         const WebApp = (await import('@twa-dev/sdk')).default;
    //         WebApp.ready();
    //         setInitData(WebApp.initData);
    //         setUserId(WebApp.initDataUnsafe.user?.id.toString() || '');
    //         setStartParam(WebApp.initDataUnsafe.start_param || '');
    //         if (WebApp.initDataUnsafe.user) {
    //           setUserData(WebApp.initDataUnsafe.user as UserData);
    //         }
    //       }
    //     };

    //     initWebApp();
    //   }, []);


  return (
    <main className="bg-dark-blue text-white h-screen flex flex-col">
      <h1 className="text-4xl text-center font-bold mb-8">Friends</h1>
      <h1 className="text-xl text-center font-bold mb-8">Hello, {user?.firstName}!</h1>
      <ReferralSystem userId={user?.telegramId.toString() || ''} />
      {/* <Navigation /> */}
    </main>
  );
}
