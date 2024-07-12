export const truncateId = (id: string | undefined) => {
  if (!id) return 'N/A';
  return id.length > 28 ? `${id.slice(0, 11)}...${id.slice(-11)}` : id;
};
