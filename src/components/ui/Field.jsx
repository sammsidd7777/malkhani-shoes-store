import React, { useState } from "react";

export const Field = ({ label, icon: Icon, className = "", children }) => (
  <div className={`flex flex-col gap-2 ${className}`}>
    {label && (
      <label className="text-xs font-semibold uppercase tracking-wider text-ink-300">
        {label}
      </label>
    )}
    <div className="relative">
      {Icon && (
        <Icon className="w-4 h-4 text-ink-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
      )}
      {children}
    </div>
  </div>
);

export const Input = React.forwardRef(({ icon: Icon, className = "", ...props }, ref) => (
  <input
    ref={ref}
    className={`w-full h-12 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder:text-ink-500
      px-4 ${Icon ? "pl-11" : ""} text-sm outline-none transition-colors duration-200
      focus:border-gold-400/60 focus:bg-white/[0.06] ${className}`}
    {...props}
  />
));
Input.displayName = "Input";

export const PasswordInput = React.forwardRef(({ className = "", ...props }, ref) => {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input
        ref={ref}
        type={show ? "text" : "password"}
        className={`w-full h-12 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder:text-ink-500
          pl-4 pr-11 text-sm outline-none transition-colors duration-200
          focus:border-gold-400/60 focus:bg-white/[0.06] ${className}`}
        {...props}
      />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-400 hover:text-white text-xs font-medium"
        tabIndex={-1}
      >
        {show ? "Hide" : "Show"}
      </button>
    </div>
  );
});
PasswordInput.displayName = "PasswordInput";

export const Textarea = React.forwardRef(({ className = "", ...props }, ref) => (
  <textarea
    ref={ref}
    className={`w-full rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder:text-ink-500
      px-4 py-3 text-sm outline-none transition-colors duration-200 resize-none
      focus:border-gold-400/60 focus:bg-white/[0.06] ${className}`}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export const Select = React.forwardRef(({ className = "", children, ...props }, ref) => (
  <select
    ref={ref}
    className={`w-full h-12 rounded-xl bg-white/[0.04] border border-white/10 text-white
      px-4 text-sm outline-none transition-colors duration-200 appearance-none
      focus:border-gold-400/60 focus:bg-white/[0.06] ${className}`}
    {...props}
  >
    {children}
  </select>
));
Select.displayName = "Select";
