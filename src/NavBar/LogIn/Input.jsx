const Input = ({ id, onChange, value, label, type }) => {
  return (
    <div className="flex">
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={' ' + label}
        className="
          block
          rounded-md
          px-6
          pt-4
          pb-3
          w-full
          text-md
          text-white
          bg-black
          border-none
          outline-none
        "
        style={{fontFamily: 'Space Mono'}}
      />
    </div>
  );
};

export default Input;
