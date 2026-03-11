export function exportToCSV<T extends Record<string, any>>(data: T[], filename = "export.csv") {
  if (!data.length) return;
  const csv = [
    Object.keys(data[0]).join(","),
    ...data.map(row => Object.values(row).map(String).map(v => `"${v.replace(/"/g, '""')}"`).join(","))
  ].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
// Why: Data export is essential for user trust and data portability.
