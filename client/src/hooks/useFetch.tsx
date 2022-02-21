import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_GIPHY_API;

interface fetchProps {
  keyword: string;
}

const useFetch = ({ keyword }: fetchProps) => {
  const [gifURL, setGifUrl] = useState<string>();

  const fetchGifs = async () => {
    try {
      const url: any = `https://api.gitphy.com/v1/gifs/search?api_key=${API_KEY}&q=${keyword
        .split(" ")
        .join("")}&limit=1`;
      const response = await fetch(url);
      const { data } = await response.json();

      setGifUrl(url[0]?.images?.downsized_medium?.url);
    } catch (error) {
      setGifUrl(
        "https://acegif.com/wp-content/uploads/gif-shaking-head-38.gif;"
      );
    }
  };

  useEffect(() => {
    if (keyword) fetchGifs();
  }, [keyword]);

  return gifURL;
};

export default useFetch;
