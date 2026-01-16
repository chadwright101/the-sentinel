import decodeHtmlEntities from "./decode-html-entities";

const truncateText = (text: string, maxLength: number) => {
  const textWithSpaces = text.replace(/<\/(p|div|h[1-6]|li|blockquote)>|<br\s*\/?>/gi, " ");
  const cleanText = textWithSpaces.replace(/<[^>]*>/g, "");
  const textWithoutUrls = cleanText.replace(/https?:\/\/[^\s]+|www\.[^\s]+/gi, "");
  const normalizedText = textWithoutUrls.replace(/\s+/g, " ").trim();
  const decodedText = decodeHtmlEntities(normalizedText);
  return decodedText.length > maxLength
    ? decodedText.substring(0, maxLength) + "..."
    : decodedText;
};

export default truncateText;
