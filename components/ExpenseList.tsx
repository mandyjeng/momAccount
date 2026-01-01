
import React from 'react';
import { GroupedRecords } from '../types';

interface ExpenseListProps {
  groupedRecords: GroupedRecords;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onClearDate: (date: string) => void;
}

const ExpenseList: React.FC<ExpenseListProps> = ({ 
  groupedRecords, 
  onDelete, 
  onEdit, 
  onClearDate 
}) => {
  const dates = Object.keys(groupedRecords);

  if (dates.length === 0) {
    return (
      <div className="text-center py-20 text-[#D1CDC2] space-y-6">
        <span className="text-9xl block opacity-50">🍵</span>
        <p className="text-3xl font-bold">目前空空的，休息一下吧</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[2rem] shadow-xl p-8 border-4 border-[#E9E4D9]">
      <div className="flex items-center gap-4 mb-10 border-b-4 border-[#F7F2E9] pb-6">
        <span className="text-4xl">📜</span>
        <h2 className="text-4xl font-black text-[#5C634A]">花費小本子</h2>
      </div>

      <div className="space-y-12">
        {dates.map((date) => {
          const dayRecords = groupedRecords[date];
          const dayTotal = dayRecords.reduce((sum, r) => sum + r.amount, 0);
          
          return (
            <section key={date} className="relative">
              <div className="flex justify-between items-center mb-6 bg-[#F7F2E9] p-4 rounded-2xl">
                <div>
                  <h3 className="text-3xl font-black text-[#5C634A]">{formatDate(date)}</h3>
                  <p className="text-2xl font-bold text-[#8E9775]">這天共花：${dayTotal.toLocaleString()}</p>
                </div>
                <button
                  onClick={() => onClearDate(date)}
                  className="bg-white hover:bg-red-50 text-red-400 text-xl font-bold px-4 py-2 rounded-xl shadow-sm border border-red-100 transition-colors"
                >
                  🗑️
                </button>
              </div>

              <div className="space-y-4">
                {dayRecords.map((record) => (
                  <div 
                    key={record.id}
                    className="flex justify-between items-center p-6 border-b-2 border-[#F9F8F6] last:border-0 hover:bg-[#FFFAF4] rounded-2xl transition-all"
                  >
                    <div className="flex flex-col">
                      <span className="text-3xl font-bold text-[#4A4A4A]">{record.item}</span>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="text-4xl font-black text-[#E28E8E]">${record.amount.toLocaleString()}</span>
                      <div className="flex gap-3">
                        <button onClick={() => onEdit(record.id)} className="text-3xl p-2 hover:bg-white rounded-lg">✏️</button>
                        <button onClick={() => onDelete(record.id)} className="text-3xl p-2 hover:bg-white rounded-lg opacity-30 hover:opacity-100">✕</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

function formatDate(dateStr: string) {
  const [year, month, day] = dateStr.split('-');
  const d = new Date(dateStr);
  const weekDay = ['日', '一', '二', '三', '四', '五', '六'][d.getDay()];
  return `${parseInt(month)}月${parseInt(day)}日 (週${weekDay})`;
}

export default ExpenseList;
