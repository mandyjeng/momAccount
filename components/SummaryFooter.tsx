
import React from 'react';

interface SummaryFooterProps {
  total: number;
  onClearAll: () => void;
  show: boolean;
}

const SummaryFooter: React.FC<SummaryFooterProps> = ({ total, onClearAll, show }) => {
  if (!show) return null;

  return (
    <div className="bg-[#5C634A] rounded-[2.5rem] shadow-2xl p-10 text-white transform hover:scale-[1.02] transition-transform">
      <div className="flex flex-col items-center gap-8">
        <div className="text-center space-y-2">
          <p className="text-3xl font-bold opacity-80">💰 累積花費總計 💰</p>
          <h2 className="text-7xl font-black tracking-tighter">
            ${total.toLocaleString()}
          </h2>
        </div>
        
        <button
          onClick={onClearAll}
          className="w-full bg-[#E28E8E] hover:bg-[#D47D7D] text-white font-black py-5 rounded-2xl text-2xl flex items-center justify-center gap-3 shadow-inner transition-all"
        >
          🧹 清除小本子 (重來)
        </button>
      </div>
    </div>
  );
};

export default SummaryFooter;
