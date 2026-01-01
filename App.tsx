
import React, { useState, useEffect, useMemo } from 'react';
import { Record, GroupedRecords } from './types';
import BookingForm from './components/BookingForm';
import ExpenseList from './components/ExpenseList';
import SummaryFooter from './components/SummaryFooter';

const LOCAL_STORAGE_KEY = 'mom_ledger_data_v2';

const App: React.FC = () => {
  const [records, setRecords] = useState<Record[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedData) {
      try {
        setRecords(JSON.parse(savedData));
      } catch (e) {
        console.error("解析失敗", e);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(records));
    }
  }, [records, isLoaded]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  };

  const addRecord = (newRecord: Omit<Record, 'id' | 'createdAt'>) => {
    const recordWithId: Record = {
      ...newRecord,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
    };
    setRecords(prev => [recordWithId, ...prev]);
    showToast('✅ 記好囉！');
  };

  const deleteRecord = (id: string) => {
    if (window.confirm('確定要刪除這筆紀錄嗎？')) {
      setRecords(prev => prev.filter(r => r.id !== id));
      showToast('🗑️ 已刪除');
    }
  };

  const editRecord = (id: string) => {
    const record = records.find(r => r.id === id);
    if (!record) return;

    const newItem = window.prompt('修改項目：', record.item);
    if (newItem === null || newItem.trim() === '') return;
    
    const newAmountStr = window.prompt('修改金額：', record.amount.toString());
    if (newAmountStr === null) return;
    
    const newAmount = parseInt(newAmountStr);
    if (isNaN(newAmount)) return alert('請輸入數字喔！');

    setRecords(prev => prev.map(r => 
      r.id === id ? { ...r, item: newItem.trim(), amount: newAmount } : r
    ));
    showToast('✏️ 已修改完成');
  };

  const clearDate = (date: string) => {
    if (window.confirm(`要清除 ${date} 的所有紀錄嗎？`)) {
      setRecords(prev => prev.filter(r => r.date !== date));
    }
  };

  const clearAll = () => {
    if (window.confirm('警告：這會清除「所有」紀錄，確定嗎？')) {
      setRecords([]);
      showToast('🧹 全部清空了');
    }
  };

  const groupedRecords = useMemo(() => {
    const groups: GroupedRecords = {};
    const sorted = [...records].sort((a, b) => {
      if (b.date !== a.date) return b.date.localeCompare(a.date);
      return b.createdAt - a.createdAt;
    });

    sorted.forEach(r => {
      if (!groups[r.date]) groups[r.date] = [];
      groups[r.date].push(r);
    });
    return groups;
  }, [records]);

  const totalAmount = useMemo(() => {
    return records.reduce((sum, r) => sum + r.amount, 0);
  }, [records]);

  return (
    <div className="min-h-screen py-10 px-4 max-w-2xl mx-auto flex flex-col gap-8 relative">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 z-50 bg-[#8E9775] text-white px-8 py-3 rounded-full shadow-2xl text-2xl font-bold animate-bounce">
          {toast}
        </div>
      )}

      <header className="text-center space-y-3">
        <h1 className="text-6xl font-black text-[#5C634A] tracking-wider">
          小媽小帳本 <span className="text-5xl">🌿</span>
        </h1>
        <p className="text-2xl text-[#8E9775] font-bold">金魚腦今天花了什麼呢？</p>
      </header>

      <BookingForm onAdd={addRecord} />

      <main className="flex-grow">
        <ExpenseList 
          groupedRecords={groupedRecords} 
          onDelete={deleteRecord}
          onEdit={editRecord}
          onClearDate={clearDate}
        />
      </main>

      <SummaryFooter 
        total={totalAmount} 
        onClearAll={clearAll} 
        show={records.length > 0} 
      />
      
      <footer className="text-center text-[#D1CDC2] text-sm py-4">
        Made for Mom with Love ❤️
      </footer>
    </div>
  );
};

export default App;
