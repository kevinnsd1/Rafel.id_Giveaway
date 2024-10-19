export const padWithZero = (number) => {
  return number.toString().padStart(2, "0");
};

// Function to get expiry date 3 days later from the given date
export const getExpiryDate = (createdAt) => {
  const createdDate = new Date(createdAt);
  const expiryDate = new Date(createdDate);
  expiryDate.setDate(createdDate.getDate() + 3);
  return expiryDate;
};

// Function to calculate countdown from the given date
export const getCountdown = (createdAt) => {
  const createdDate = new Date(createdAt);
  const now = new Date();
  const difference = createdDate - now;

  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return {
    hours: padWithZero(hours),
    minutes: padWithZero(minutes),
    seconds: padWithZero(seconds),
  };
};
