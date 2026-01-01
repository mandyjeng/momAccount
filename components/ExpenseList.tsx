
import React from 'react';
import { GroupedRecords, Record } from '../types';

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
      <div className="text-center py-12 text-gray-400 space-y-4">
        <span className="text-6xl block">📭</span>
        <p className="text-2xl">目前還沒有紀錄喔，來記一筆吧！</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 sm:p-8 space-y-8 border-2 border-white">
      <div className="flex items-center gap-3 border-b-2 border-gray-50 pb-4">
        <span className="text-3xl">📋</span>
        <h2 className="text-3xl font-bold text-gray-700">花費清單</h2>
      </div>

      <div className="space-y-10">
        {dates.map((date) => {
          const dayRecords = groupedRecords[date];
          const dayTotal = dayRecords.reduce((sum, r) => sum + r.amount, 0);
          
          return (
            <section key={date} className="space-y-4">
              <div className="flex justify-between items-end border-b border-gray-100 pb-2">
                <div>
                  <h3 className="text-2xl font-bold text-gray-600">{formatDate(date)}</h3>
                  <p className="text-lg font-bold text-[#4DB6AC]">本日小計: ${dayTotal.toLocaleString()}</p>
                </div>
                <button
                  onClick={() => onClearDate(date)}
                  className="bg-[#FFCDD2] hover:bg-[#EF9A9A] text-[#C62828] text-sm font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
                >
                  🗑️ 清除本日
                </button>
              </div>

              <div className="space-y-3">
                {dayRecords.map((record) => (
                  <div 
                    key={record.id}
                    className="flex justify-between items-center p-4 bg-[#FFF5F5] rounded-2xl group transition-all"
                  >
                    <span className="text-2xl font-medium text-gray-700">{record.item}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-2xl font-bold text-[#4DB6AC]">${record.amount.toLocaleString()}</span>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => onEdit(record.id)}
                          className="p-2 hover:bg-white rounded-full transition-colors text-xl"
                          title="修改"
                        >
                          ✏️
                        </button>
                        <button 
                          onClick={() => onDelete(record.id)}
                          className="p-2 hover:bg-white rounded-full transition-colors text-xl text-gray-400 hover:text-red-400"
                          title="刪除"
                        >
                          ✕
                        </button>
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

// Helper to format date into "YYYY年M月D日"
function formatDate(dateStr: string) {
  const [year, month, day] = dateStr.split('-');
  return `${year}年${parseInt(month)}月${parseInt(day)}日`;
}

export default ExpenseList;
