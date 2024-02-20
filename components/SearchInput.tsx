"use client";

import useDebounce from "@/hooks/useDebounnce";
import { useRouter } from "next/navigation";
import { title } from "process";
import qs from "query-string"
import { useEffect, useState } from "react";
import Input from "./Input";

const SearchInput = () => {

    const router = useRouter();
    const [search, setSearch] = useState<string>('');
    const debounceddValu = useDebounce(search, 500);

    useEffect(() => {
        const query = {
            title: debounceddValu
        }
        const url = qs.stringifyUrl({
            url: '/search',
            query
        });
        router.push(url);
    }, [debounceddValu, router]);
    
    return (
      <Input
            placeholder="type to search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
    )
}

export default SearchInput;