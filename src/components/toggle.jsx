import React, { useState } from 'react';

const Toggle = (props) => {
  return (
    <div className="flex items-center select-none">
      {/* Toggle Switch Button */}
      <button
        type="button"
        role="switch"
        aria-checked={props.enabled}
        onClick={() => props.onChange(!props.enabled)}
        className={`${
          props.enabled ? 'gradient-primary' : 'bg-gray-300'
        } relative inline-flex h-4 w-8 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
      >
        <span
          className={`${
            props.enabled ? 'translate-x-4' : 'translate-x-0'
          } pointer-events-none inline-block h-3 w-3 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
        />
      </button>

      {/* Label Text */}
      {props.label ? <span className="text-sm text-[#2C3E50] font-normal tracking-wide ml-2">{props.label}</span> : null}
    </div>
  );
};

export default Toggle;
