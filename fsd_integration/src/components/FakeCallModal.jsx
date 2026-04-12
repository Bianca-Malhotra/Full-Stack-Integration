import React, { useEffect } from "react";

const FakeCallModal = ({ open, onClose, playAudio }) => {
  useEffect(() => {
    if (!open || !playAudio) return;
    const utterance = new SpeechSynthesisUtterance("Hey, I am outside. Please come now.");
    window.speechSynthesis.speak(utterance);
    return () => window.speechSynthesis.cancel();
  }, [open, playAudio]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-xl">
        <p className="text-sm text-slate-500">Incoming Call</p>
        <h3 className="mt-1 text-xl font-bold">Mom Calling...</h3>
        <p className="mt-3 text-sm text-slate-600">Use this to exit uncomfortable situations quickly.</p>
        <div className="mt-5 flex gap-3">
          <button className="flex-1 rounded-xl bg-green-600 py-2 text-white">Answer</button>
          <button onClick={onClose} className="flex-1 rounded-xl bg-red-600 py-2 text-white">
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

export default FakeCallModal;
