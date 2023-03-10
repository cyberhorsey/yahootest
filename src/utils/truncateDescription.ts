const MAX_DESCRIPTION_LENGTH = 60;
function truncateDescription(description: string): string {
  if (!description) return "";

  if (description.length > MAX_DESCRIPTION_LENGTH) {
    return description.slice(0, MAX_DESCRIPTION_LENGTH) + "...";
  }

  return description;
}

export { truncateDescription, MAX_DESCRIPTION_LENGTH };
