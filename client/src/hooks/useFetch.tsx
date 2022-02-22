import { useEffect, useState } from "react";

const APIKEY = import.meta.env.VITE_GIPHY_API;

interface fetchProps {
  keyword: string;
}

const useFetch = ({ keyword }: fetchProps) => {
  const [gifURL, setGifUrl] = useState<string>();
  const notFound: string =
    "https://media2.giphy.com/media/3o85xFXVQNndE6sy9a/giphy.gif?cid=ecf05e475opvu9x3diva5l6kxd2q2d9y17494evxixar0abl&rid=giphy.gif&ct=g";

  const fetchGifs = async () => {
    try {
      const query = keyword.split(" ").join("").split(" ").join("");
      const url: any = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&q=${query}&limit=1`;
      const response = await fetch(url);
      const { data } = await response.json();

      if (data.length === 0) return setGifUrl(notFound);

      setGifUrl(data[0]?.images?.downsized_medium?.url);
    } catch (error) {
      setGifUrl(notFound);
    }
  };

  useEffect(() => {
    if (keyword) fetchGifs();
  }, [keyword]);

  return gifURL;
};

export default useFetch;
