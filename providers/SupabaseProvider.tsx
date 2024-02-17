"use client";
import { useState } from "react";
import { Database } from "@/type_db";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

interface SupabaseProviderProps {
    children: React.ReactNode;
};

const SupabaseProvider: React.FC<SupabaseProviderProps> = ({ children }) => {
    const [SupabaseClient] = useState(() => {
        return createClientComponentClient<Database>()
    });
    return (
        <SessionContextProvider supabaseClient={SupabaseClient}>
         {children}
        </SessionContextProvider>

    )
};

export default SupabaseProvider;