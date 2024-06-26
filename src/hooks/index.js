import { useNavigate } from 'react-router-dom';

/** When we need to change our website page, we use this custom hook. */
export const useCustomNavigate = () => {
  const navigate = useNavigate();

  const handleChangeUrl = (url) => {
    navigate(url);
  };

  return {
    handleChangeUrl,
  };
};
