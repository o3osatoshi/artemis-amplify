import React from "react";

export default function ButtonReload(props: IProps) {
  const refreshPage = () => window.location.reload();
  return (
    <div>
      <button onClick={refreshPage}>Reload</button>
    </div>
  );
}

interface IProps {}
