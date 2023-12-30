export const issueNameCreator = (
  projectName: string,
  issueId: string
): string => {
  const parts = issueId.split("-");
  const combined = projectName + "-" + parts[1];
  return combined;
};
