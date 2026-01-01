
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
    if (!item.trim() || !amount) return;
    const numAmount = parseInt(amount);
    if (isNaN(numAmount)) return;

    onAdd({ item: item.trim(), amount: numAmount, date });
    setItem('');
    setAmount('');
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-xl p-8 border-4 border-[#E9E4D9]">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-3xl font-bold text-[#5C634A] block mb-2">✏️ 買了什麼</label>
          <input
            type="text"
            placeholder="例如：全聯買菜..."
            className="w-full p-5 rounded-2xl border-4 border-[#F3F0E9] bg-[#F9F8F6] text-3xl focus:border-[#8E9775] outline-none transition-all placeholder:text-gray-300"
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-3xl font-bold text-[#5C634A] block mb-2">💰 多少錢</label>
            <input
              type="number"
              inputMode="numeric"
              placeholder="0"
              className="w-full p-5 rounded-2xl border-4 border-[#F3F0E9] bg-[#F9F8F6] text-3xl focus:border-[#8E9775] outline-none transition-all"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-3xl font-bold text-[#5C634A] block mb-2">📅 哪一天</label>
            <input
              type="date"
              className="w-full p-5 rounded-2xl border-4 border-[#F3F0E9] bg-[#F9F8F6] text-3xl focus:border-[#8E9775] outline-none transition-all"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={!item || !amount}
          className="w-full bg-[#8E9775] hover:bg-[#7A8363] disabled:bg-gray-200 text-white font-black py-6 rounded-3xl text-4xl shadow-lg transition-all active:scale-95 mt-4"
        >
          ＋ 記下來
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
