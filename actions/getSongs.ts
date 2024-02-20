import { Song } from "@/type"
import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

const getSongs = async (): Promise<Song[]> => {
    const supabase = createServerComponentClient({ 
        cookies
    });

    const { data, error } = await supabase
        .from('songs')
        .select('*')
        .order('created_at', { ascending: false }); //ascends 标识升序

    if (error) {
        // throw error;
        console.error(error);
    }
    return (data as any) ?? [];

}
export default getSongs;
