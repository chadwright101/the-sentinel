const truncateText = (text: string, maxLength: number) => {
  const cleanText = text.replace(/<[^>]*>/g, "");
  return cleanText.length > maxLength
    ? cleanText.substring(0, maxLength) + "..."
    : cleanText;
};

export default truncateText;
