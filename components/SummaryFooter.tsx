
import React from 'react';

interface SummaryFooterProps {
  total: number;
  onClearAll: () => void;
  show: boolean;
}

const SummaryFooter: React.FC<SummaryFooterProps> = ({ total, onClearAll, show }) => {
  if (!show) return null;

  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 border-t-4 border-[#FBCFE8]">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4">
          <span className="text-4xl">🧮</span>
          <h2 className="text-3xl font-bold text-gray-700">
            所有總計：
            <span className="text-5xl text-[#E57373] ml-2">${total.toLocaleString()}</span>
          </h2>
        </div>
        
        <button
          onClick={onClearAll}
          className="bg-[#79716E] hover:bg-[#5D5755] active:scale-95 text-white font-bold px-8 py-4 rounded-2xl text-xl flex items-center gap-3 transition-all shadow-md"
        >
          🗑️ 全部清除
        </button>
      </div>
    </div>
  );
};

export default SummaryFooter;
