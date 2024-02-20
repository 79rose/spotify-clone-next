import { Song } from "@/type"
import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

const getLikedSongs = async (): Promise<Song[]> => {
    const supabase = createServerComponentClient({ 
        cookies
    });
    const {
        data: {
            session
        }
    } = await supabase.auth.getSession();
    const { data, error } = await supabase
        .from('liked_songs')
        .select('*,songs(*)')
        .eq('user_id', session?.user.id)
        .order('created_at', { ascending: false }); //ascends 标识升序

    if (error) {
        // throw error;
        console.error(error);
        return [];
    }
    if (!data) {
        // console.log(data);
        return [];
    }
    console.log(data);
    return data.map((item) => ({...item.songs}));

}
export default getLikedSongs;
