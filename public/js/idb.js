let db;

const request = indexedDB.open('pwa_budget_tracker', 1);

request.onupgradeneeded = function(event) {
    const db = event.target.result;
    db.createObjectStore('new_transaction', { autoIncrement: true });
  };
  
  request.onerror = function(event) {
    console.log(event.target.errorCode);
  };
  
  function saveRecord(transaction) {
    const expense = db.expense(['new_transaction'], 'readwrite');
    const transactionObjectStore = expense.objectStore('new_transaction');
    transactionObjectStore.add(transaction);
  }
