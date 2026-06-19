const Textarea = ({ label, className = '', placeholder, rows = 4, value, onChange }) => {
  return (
    <div className={className}>
      <label className="mb-1.5 block text-sm font-medium">{label}</label>
      <textarea
        rows={rows}
        value={value}
        onChange={({ target }) => onChange(target.value)}
        placeholder={placeholder}
        className="glass-input w-full resize-none rounded-xl px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground/70"
      />
    </div>
  );
};

export default Textarea;
