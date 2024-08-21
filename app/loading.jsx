import style from "../public/css/loading.module.css";

const loading = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <div className={`${style.loader}`}></div>
    </div>
  );
};

export default loading;
