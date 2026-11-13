// Label + input pair used by the auth, checkout and account forms
export default function FormField({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="font-medium">{label}</span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className="h-10 rounded-md border border-input bg-transparent px-3 outline-none focus:border-ring"
      />
    </label>
  );
}
