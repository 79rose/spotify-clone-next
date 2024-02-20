"use client";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "./Modal";
import useUploadModal from '@/hooks/useUploadModal';
import { useState } from "react";
import Input from "./Input";

const UploadModal = () => {
    const uploadModal = useUploadModal();
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
    }
    return (
        <Modal
            title="Add a song"
            description="Upload a file with mp3"
            isOpen={uploadModal.isOpen}
            onChange={onChange}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    id="title"
                    disabled={isLoading}
                    {...register('title', { required: true })}
                    placeholder="Song title"
                >
                </Input>
            </form>
        </Modal>
    )
}

export default UploadModal;