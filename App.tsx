
import React, { useState, useEffect, useMemo } from 'react';
import { Record, GroupedRecords } from './types';
import BookingForm from './components/BookingForm';
import ExpenseList from './components/ExpenseList';
import SummaryFooter from './components/SummaryFooter';

const LOCAL_STORAGE_KEY = 'mom_ledger_data';

const App: React.FC = () => {
  const [records, setRecords] = useState<Record[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedData) {
      try {
        setRecords(JSON.parse(savedData));
      } catch (e) {
        console.error("Failed to parse stored data", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save data to localStorage whenever records change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(records));
    }
  }, [records, isLoaded]);

  const addRecord = (newRecord: Omit<Record, 'id' | 'createdAt'>) => {
    const recordWithId: Record = {
      ...newRecord,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
    };
    setRecords(prev => [recordWithId, ...prev]);
  };

  const deleteRecord = (id: string) => {
    if (window.confirm('確定要刪除這一筆嗎？')) {
      setRecords(prev => prev.filter(r => r.id !== id));
    }
  };

  const editRecord = (id: string) => {
    const record = records.find(r => r.id === id);
    if (!record) return;

    const newItem = window.prompt('修改項目名稱：', record.item);
    if (newItem === null) return;
    
    const newAmountStr = window.prompt('修改金額：', record.amount.toString());
    if (newAmountStr === null) return;
    
    const newAmount = parseInt(newAmountStr);
    if (isNaN(newAmount)) {
      alert('請輸入有效的數字');
      return;
    }

    setRecords(prev => prev.map(r => 
      r.id === id ? { ...r, item: newItem, amount: newAmount } : r
    ));
  };

  const clearDate = (date: string) => {
    if (window.confirm(`確定要清除 ${date} 的所有紀錄嗎？`)) {
      setRecords(prev => prev.filter(r => r.date !== date));
    }
  };

  const clearAll = () => {
    if (window.confirm('確定要清除「全部」的紀錄嗎？這無法還原喔！')) {
      setRecords([]);
    }
  };

  // Grouping logic
  const groupedRecords = useMemo(() => {
    const groups: GroupedRecords = {};
    const sortedRecords = [...records].sort((a, b) => {
      // Sort by date descending
      if (b.date !== a.date) return b.date.localeCompare(a.date);
      // If same date, sort by creation time descending
      return b.createdAt - a.createdAt;
    });

    sortedRecords.forEach(record => {
      if (!groups[record.date]) {
        groups[record.date] = [];
      }
      groups[record.date].push(record);
    });
    return groups;
  }, [records]);

  const totalAmount = useMemo(() => {
    return records.reduce((sum, r) => sum + r.amount, 0);
  }, [records]);

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto flex flex-col gap-8">
      {/* Header Section */}
      <header className="text-center space-y-2">
        <h1 className="text-5xl font-bold text-gray-700 flex items-center justify-center gap-4">
          小媽的小帳本 <span className="text-4xl">📓</span>
        </h1>
        <p className="text-xl text-gray-500 font-medium">金魚腦救星</p>
      </header>

      {/* Main Form Card */}
      <BookingForm onAdd={addRecord} />

      {/* List Section */}
      <main className="flex-grow">
        <ExpenseList 
          groupedRecords={groupedRecords} 
          onDelete={deleteRecord}
          onEdit={editRecord}
          onClearDate={clearDate}
        />
      </main>

      {/* Summary Footer */}
      <SummaryFooter 
        total={totalAmount} 
        onClearAll={clearAll} 
        show={records.length > 0} 
      />
    </div>
  );
};

export default App;
