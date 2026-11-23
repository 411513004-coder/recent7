// recent7.js：照規則寫的版本。
// 函式名稱叫 recent7，輸入、輸出的格式見 README.md。

function recent7(records, today) {
  if (!records || !Array.isArray(records) || records.length === 0) {
    return { minutes: 0, count: 0, days: 0 };
  }

  const todayDate = new Date(today + 'T00:00:00Z');
  const pastDate = new Date(todayDate);
  pastDate.setUTCDate(todayDate.getUTCDate() - 6);

  const minDateStr = pastDate.toISOString().slice(0, 10);
  const maxDateStr = today;

  let totalMinutes = 0;
  let totalCount = 0;
  const recordedDays = new Set();

  for (const record of records) {
    if (!record || !record.log_date) continue;
    const d = record.log_date;

    // 規則 2：未來的日期（比 today 晚）一律不計入
    if (d > maxDateStr) continue;

    // 規則 1：範圍包含今天往前推 6 天至今天共 7 天，太早的不算
    if (d < minDateStr) continue;

    // 規則 3：沒有填分鐘數（minutes 為 null 或未填）的紀錄，算 1 筆，0 分鐘
    if (record.minutes === null || record.minutes === undefined) {
      totalCount++;
      recordedDays.add(d);
      continue;
    }

    // 規則 5：有填寫分鐘數但少於 10 分鐘（0 < minutes < 10）的紀錄太短了，完全不計入
    if (record.minutes > 0 && record.minutes < 10) {
      continue;
    }

    // 正常計入
    totalCount++;
    totalMinutes += record.minutes;
    recordedDays.add(d);
  }

  return { minutes: totalMinutes, count: totalCount, days: recordedDays.size };
}
