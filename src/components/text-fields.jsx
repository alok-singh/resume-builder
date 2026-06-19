const TextField = ({ fullWidth, label, icon, type, value, onChange, error, placeholder, trailing }) => {
  return (
    <div className={fullWidth ? 'sm:col-span-2' : ''}>
      <label className="mb-1.5 block text-sm font-medium">{label}</label>
      <div className={`glass-input flex items-center gap-2 rounded-xl px-3 py-2.5 ${error ? 'ring-2 ring-red-400/60' : ''}`}>
        {icon && <span className="text-muted-foreground">{icon}</span>}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/70"
        />
        {trailing}
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default TextField;
