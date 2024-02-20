"use client";
import { FieldValues, SubmitHandler, set, useForm } from "react-hook-form";
import Modal from "./Modal";
import useUploadModal from '@/hooks/useUploadModal';
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import toast from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import uniqid from "uniqid";
import { useRouter } from "next/navigation";

const UploadModal = () => {
    const uploadModal = useUploadModal();
    const { user } = useUser();
    const supabaseClient = useSupabaseClient();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const { register,handleSubmit,reset} = useForm<FieldValues>({
        defaultValues: {
            author: '',
            title: '',
            song: null,
            image: null
        }
    })
    const onChange = (open: boolean): void => {
        if (!open) {
            reset();
            uploadModal.onClose();
        }
    }
    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        // TODO： 上传文件到supabase
        try {
            setIsLoading(true);
            const songFile = values.song?.[0];
            const imageFile  = values.image?.[0];
            if (!imageFile || !songFile || !user) {
                console.log(values)
                toast.error('Please fill all the fields');
                return
            }
            const uniqueId = uniqid();
           // Upload song
      const { 
        data: songData, 
        error: songError 
      } = await supabaseClient
        .storage
        .from('songs')
        .upload(`song-${values.title}-${uniqueId}`, songFile, {
          cacheControl: '3600',
          upsert: false
        });

      if (songError) {
        setIsLoading(false);
        return toast.error('Failed song upload');
      }

            // 上传图片
            const {
                data: imageData,
                error: imageError
            } = await supabaseClient.storage.from('images').upload(`images-${values.title}-${uniqueId}`, imageFile , {
                cacheControl: '3600',
                upsert: false
            });
            if (imageError) {
                setIsLoading(false);
                return toast.error('Failed to upload the image');
            }
            //  上传数据库
            const {
                error: dbError
            } = await supabaseClient.from('songs').insert({
                user_id: user.id,
                title: values.title,
                author: values.author,
                image_path: imageData.path,
                song_path: songData.path
            })
            if (dbError) {
                setIsLoading(false);
                return toast.error(dbError.message);
            }
            router.refresh();
            setIsLoading(false);
            toast.success('Song uploaded successfully');
            reset();
            uploadModal.onClose();
        }
        catch (error) {
            toast.error('Failed to upload the song');
        }
        finally {
            setIsLoading(false);
        }
    }
    return (
        <Modal
            title="Add a song"
            description="Upload a file with mp3"
            isOpen={uploadModal.isOpen}
            onChange={onChange}
        >
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
                <Input
                    id="title"
                    disabled={isLoading}
                    {...register('title', { required: true })}
                    placeholder="Song title"
                >
                </Input>
                <Input
                    id="author"
                    disabled={isLoading}
                    {...register('author', { required: true })}
                    placeholder="Song author"
                >
                </Input>
                <div>
                    <div className="pb-1">
                        select a song file
                    </div>
                    <Input
            disabled={isLoading}
            type="file"
            accept=".mp3"
            id="song"
            {...register('song', { required: true })}
                     />
                </div>
                 <div>
                    <div className="pb-1">
                        select an image 
                    </div>
                     <Input
                        id="image"
                        type="file"
                        accept="image/*"
                        disabled={isLoading}
                    {...register('image', { required: true })}
                   >
                    </Input>
                </div>
                <Button disabled={isLoading} type="submit">
                    Create
                </Button>
            </form>
        </Modal>
    )
}

export default UploadModal;