import { Subscription,UserDetails } from "@/type";
import { User, useUser as useSupaUser, useSessionContext } from "@supabase/auth-helpers-react";
import { createContext, useContext, useEffect, useState } from "react";

 
type UserContextType = {
    accessToken: string | null;
    user: User | null;
    userDetails: UserDetails | null;
    isLoading: boolean;
    subscription: Subscription | null;
}
 
export const UserContext = createContext<UserContextType | undefined>(undefined) 

export interface Props {
    [propName: string]: any;
}

export const MyUserContextProvider = (Props: Props) => {
    const {
        session, 
        isLoading: isLoadingUser,
        supabaseClient: supabase
    } = useSessionContext()
    const user = useSupaUser()
    const accessToken = session?.access_token ?? null
    const [isLoadingData, setIsLoadingData] = useState(false)
    const [subscription, setSubscription] = useState<Subscription | null>(null)
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null)
  
    const getUserDetails = () => supabase.from('users').select('*').single(); 
    const getSubscription = () => supabase.from('subscriptions').select('*, prices(* , products(*))').in('status', ['trialing', 'active']).single();

    useEffect(() => {
        if (user && !userDetails && !isLoadingData && !subscription) {
            // 如果用户已登录，但是没有用户详情，没有加载数据，没有订阅
            setIsLoadingData(true) // 设置加载数据为true
            Promise.allSettled([getUserDetails(), getSubscription()]).then((results) => { 
                const [userDetailsPromise, subscriptionPromise] = results

                if (userDetailsPromise.status === 'fulfilled') {
                    setUserDetails(userDetailsPromise.value.data) 
                }
                if (subscriptionPromise.status === 'fulfilled') {
                    setSubscription(subscriptionPromise.value.data)
                }
            })
        } else if (!user && !isLoadingUser && !isLoadingData) {
            // 如果用户没有登录，没有加载数据
            setUserDetails(null);
            setSubscription(null);
    }
  }, [user, isLoadingUser]);
    const value = {
        accessToken,
        user,
        userDetails,
        isLoading: isLoadingUser || isLoadingData,
        subscription
    }
       return <UserContext.Provider value={value} {...Props} />
}

export const useUser = () => {
    const context = useContext(UserContext)
    if (context === undefined) {
        throw new Error('useUser must be used within a UserContextProvider')
    }
    return context
}