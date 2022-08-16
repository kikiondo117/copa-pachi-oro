export function Switch() {
  return (
    <label
      htmlFor="check"
      className="bg-gray-100 w-20 h-10 rounded-full cursor-pointer"
    >
      <input type="checkbox" id="check" className=" sr-only peer" />
      <span className="w-20 h-10 bg-rose-300 absolute rounded-full left-1 top-1 peer-checked:bg-rose-600 peer-checked:left-11 transition-all duration-500"></span>
    </label>
  );
}
