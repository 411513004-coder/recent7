// tests.js：測試都寫在這個檔。一條測試呼叫一次 addCase，格式見 README.md。

addCase({
  name: '規則 1：包含今天與第 7 天（11/17~11/23），第 8 天（11/16）不計入',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-23', minutes: 30 },
    { log_date: '2026-11-17', minutes: 20 },
    { log_date: '2026-11-16', minutes: 99 }
  ],
  expect: { minutes: 50, count: 2 }
});

addCase({
  name: '規則 2：比 today 晚的未來日期（11/24）一律不計入',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-24', minutes: 50 }
  ],
  expect: { minutes: 0, count: 0 }
});

addCase({
  name: '規則 3：minutes 為 null 沒填分鐘時，筆數算 1 筆且分鐘算 0',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-23', minutes: null }
  ],
  expect: { minutes: 0, count: 1 }
});

addCase({
  name: '規則 4：空陣列完全沒有紀錄時，回傳 0 分鐘 0 筆',
  today: '2026-11-23',
  records: [],
  expect: { minutes: 0, count: 0 }
});

addCase({
  name: '規則 5：少於 10 分鐘（如 5 分鐘）太短不計入筆數與分鐘',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-23', minutes: 5 }
  ],
  expect: { minutes: 0, count: 0 }
});

addCase({
  name: '規則 5：剛好 10 分鐘算入（1 筆 10 分鐘）',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-23', minutes: 10 }
  ],
  expect: { minutes: 10, count: 1 }
});

addCase({
  name: '綜合驗證：課堂第 1 步的五筆紀錄測試',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-23', minutes: 30 },
    { log_date: '2026-11-17', minutes: 20 },
    { log_date: '2026-11-23', minutes: null },
    { log_date: '2026-11-16', minutes: 99 },
    { log_date: '2026-11-24', minutes: 50 }
  ],
  expect: { minutes: 50, count: 3 }
});

addCase({
  name: '規則 6：同一天多筆只算 1 天，不同天累加天數',
  today: '2026-11-23',
  records: [
    { log_date: '2026-11-23', minutes: 30 },
    { log_date: '2026-11-23', minutes: 40 },
    { log_date: '2026-11-20', minutes: 20 }
  ],
  expect: { minutes: 90, count: 3, days: 2 }
});

addCase({
  name: '規則 6：空紀錄時 days 回傳 0',
  today: '2026-11-23',
  records: [],
  expect: { minutes: 0, count: 0, days: 0 }
});
