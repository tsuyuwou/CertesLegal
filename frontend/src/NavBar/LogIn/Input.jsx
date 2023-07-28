const Input = ({ id, onChange, value, placeholder, type, pattern, maxLength, isRequired, autoFocus }) => {
  return (
    <div className="flex">
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        pattern={pattern}
        maxLength={maxLength}
        required={isRequired}
        autoFocus={autoFocus}
        className="
          block
          rounded-md
          px-6
          py-3
          w-full
          text-md
          text-white
          bg-black
          border-none
          outline-none
          placeholder:select-none
        "
        style={{fontFamily: 'Space Mono'}}
      />
    </div>
  );
};

export default Input;
