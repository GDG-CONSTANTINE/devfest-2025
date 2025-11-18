interface FormFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  type?: 'text' | 'email' | 'tel' | 'url' | 'select' | 'textarea';
  readOnly: boolean;
  options?: { value: string; label: string }[];
  placeholder?: string;
  multiline?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  value,
  onChange,
  type = 'text',
  readOnly = false,
  options,
  placeholder,
  multiline = false,
}) => {
  const baseClasses = 'flex-1 bg-gray-900 border-2 border-dashed border-gray-200/50 text-white px-3 py-1 ';
  const selectClasses = `${baseClasses}`;
  const inputClasses = multiline ? `${baseClasses} min-h-24 resize-none` : baseClasses;

  const labelElement = (
    <label className={`text-white w-48 ${multiline ? 'pt-1' : ''}`}>
      {label}:
    </label>
  );

  const inputElement = type === 'select' ? (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className={selectClasses}
    >
      {options?.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label || option.value}
        </option>
      ))}
    </select>
  ) : multiline ? (
    <textarea
      name={name}
      value={value}
      readOnly={readOnly}
      onChange={onChange}
      className={inputClasses}
      placeholder={placeholder}
    />
  ) : (
    <input
      type={type}
      name={name}
      value={value}
      readOnly={readOnly}
      onChange={onChange}
      className={inputClasses}
      placeholder={placeholder}
    />
  );

  return (
    <div className={`flex flex-col md:flex-row ${multiline ? 'md:items-start' : 'md:items-center'} gap-8 items-start`}>
      {labelElement}
      {inputElement}
    </div>
  );
};

export default FormField