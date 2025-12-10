import decodeHtmlEntities from "./decode-html-entities";

const truncateText = (text: string, maxLength: number) => {
  const cleanText = text.replace(/<[^>]*>/g, "");
  const decodedText = decodeHtmlEntities(cleanText);
  return decodedText.length > maxLength
    ? decodedText.substring(0, maxLength) + "..."
    : decodedText;
};

export default truncateText;
