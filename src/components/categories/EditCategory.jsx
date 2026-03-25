import { useEffect, useState } from "react";

export const EditCategory = () => {
  const [getCategory, setCategory] = useState({
    label: "",
  });

  useEffect(() => {
    getCategory.then(setCategory)
  }, [getCategory])
  

  return (
    <>edit post</>
  );
};
