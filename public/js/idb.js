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

  function uploadTransaction() {
    const transaction = db.transaction(['new_transaction'], 'readwrite');
    const transactionObjectStore = transaction.objectStore('new_transaction');
    const getAll = transactionObjectStore.getAll();
    
    getAll.onsuccess = function() {
        if (getAll.result.length > 0) {
          fetch('/api/transaction', {
            method: 'POST',
            body: JSON.stringify(getAll.result),
            headers: {
              Accept: 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            }
          })
            .then(response => response.json())
            .then(serverResponse => {
              if (serverResponse.message) {
                throw new Error(serverResponse);
              }
              const transaction = db.transaction(['new_transaction'], 'readwrite');
              const transactionObjectStore = transaction.objectStore('new_transaction');
              transactionObjectStore.clear();
    
              alert('All saved transactions hasve been submitted!');
            })
            .catch(err => {
              console.log(err);
            });
        }
      };
 }

 window.addEventListener('online', uploadTransaction);
