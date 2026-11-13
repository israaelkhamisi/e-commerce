// Label + input used by the register form ("Name*" style from the design)
export default function RegisterField({
  label,
  name,
  type = "text",
  placeholder,
  children,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="font-medium text-gray-700 dark:text-gray-200">
        {label}
        <span className="text-gray-500">*</span>
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-md border border-gray-400/40 bg-transparent px-3.5 py-2.5 font-medium text-gray-700 outline-none placeholder:text-gray-700/50 focus:border-green-600 dark:text-gray-100"
      />
      {children}
    </div>
  );
}
