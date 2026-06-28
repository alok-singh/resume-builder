import { X } from "lucide-react";
import { useState } from "react";

const Modal = (props) => {
  return props.isModalOpen ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in" onClick={() => props.setIsModalOpen(false)}>
      <div
        className="relative max-w-2xl w-full max-h-[80vh] rounded-2xl overflow-hidden bg-white shadow-2xl p-2"
        onClick={(e) => e.stopPropagation()} // Stop modal closure when clicking inside the content box
      >
        {/* Close Button */}
        <X onClick={() => props.setIsModalOpen(false)} className="w-5 h-5 cursor-pointer" />
        {props.children}
      </div>
    </div>
  ) : null;
};

export default Modal;
