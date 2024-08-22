export const success = (data?: any) => {
  if (data) {
    return { success: true, data, total: data?.length ?? 0 };
  }
  return { success: true };
};
