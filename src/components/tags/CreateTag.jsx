import { useState } from "react";

export const CreateTag = () => {
  const [label, setLabel] = useState("");

  return (
    <>
      Create Tag
      <input
        className="input"
        type="text"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
      />
    </>
  );
};
