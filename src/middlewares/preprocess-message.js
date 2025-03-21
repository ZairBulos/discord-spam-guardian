const preprocessMessage = (content) => {
  if (!content || typeof content !== 'string') return '';

  return content
    .toLowerCase()
    .replace(/https?:\/\/\S+/g, '')         // Remove URLs
    .replace(/[\u{1F300}-\u{1F6FF}]/gu, '') // Remove emojis
    .replace(/[^a-zA-Z0-9\s]/g, '')         // Remove special characters
    .replace(/\s+/g, ' ')                   // Remove extra whitespaces
    .trim();
};

module.exports = preprocessMessage;
