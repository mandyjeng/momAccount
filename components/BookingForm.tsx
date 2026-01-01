
import React, { useState } from 'react';
import { Record } from '../types';

interface BookingFormProps {
  onAdd: (record: Omit<Record, 'id' | 'createdAt'>) => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ onAdd }) => {
  const [item, setItem] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!item.trim() || !amount) {
      alert('請填寫完整項目與金額唷！');
      return;
    }

    const numAmount = parseInt(amount);
    if (isNaN(numAmount)) {
      alert('金額請填數字唷！');
      return;
    }

    onAdd({
      item: item.trim(),
      amount: numAmount,
      date,
    });

    // Reset fields
    setItem('');
    setAmount('');
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 sm:p-8 border-2 border-white">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Item Input */}
        <div className="space-y-2">
          <label className="text-2xl font-bold text-gray-600 flex items-center gap-2">
            <span>📝</span> 項目
          </label>
          <input
            type="text"
            placeholder="例如：買菜、午餐..."
            className="w-full p-4 rounded-xl border-2 border-gray-100 bg-gray-50 focus:bg-white text-2xl transition-all"
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Amount Input */}
          <div className="space-y-2">
            <label className="text-2xl font-bold text-gray-600 flex items-center gap-2">
              <span>💰</span> 金額
            </label>
            <input
              type="number"
              inputMode="numeric"
              placeholder="金額"
              className="w-full p-4 rounded-xl border-2 border-gray-100 bg-gray-50 focus:bg-white text-2xl transition-all"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          {/* Date Input */}
          <div className="space-y-2">
            <label className="text-2xl font-bold text-gray-600 flex items-center gap-2">
              <span>📅</span> 日期
            </label>
            <input
              type="date"
              className="w-full p-4 rounded-xl border-2 border-gray-100 bg-gray-50 focus:bg-white text-2xl transition-all"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#4DB6AC] hover:bg-[#3FA096] active:scale-95 text-white font-bold py-5 rounded-2xl text-3xl shadow-md transition-all mt-4"
        >
          + 新增一筆
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
