const keys = (value: any) => {
  const r = [];
  for (const i in value) {
    const k: any = i;
    if (!isNaN(k)) {
      r.push(Number(i));
    } else r.push(i);
  }
  return r;
};
export { keys };
