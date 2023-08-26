const Input = ({ name, type, value, onChange, placeholder, pattern, maxLength, isRequired, autoFocus }) => {
  return (
    <div className="flex flex-grow">
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        pattern={pattern}
        maxLength={maxLength}
        required={isRequired}
        autoFocus={autoFocus}
        style={{fontFamily: 'Space Mono'}}
        className="
          block
          rounded-md
          px-3
          py-3
          w-full
          text-md
          text-white
          bg-black
          border-none
          outline-none
          placeholder:select-none
        "
      />
    </div>
  );
};

export default Input;
