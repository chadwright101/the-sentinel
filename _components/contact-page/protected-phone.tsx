import Link from "next/link";

interface ProtectedPhoneProps {
  phone: string;
  isVerified: boolean;
  isVerifying: boolean;
  formatPhoneNumber: (phone: string) => string;
}

const obfuscatePhone = (phone: string) => {
  const digits = phone.replace(/\D/g, "");
  const lastTwo = digits.slice(-2);
  const obfuscated = "•".repeat(Math.max(3, digits.length - 2)) + lastTwo;
  return obfuscated;
};

export default function ProtectedPhone({
  phone,
  isVerified,
  isVerifying,
  formatPhoneNumber,
}: ProtectedPhoneProps) {
  if (isVerifying || !isVerified) {
    return <span className="text-16px desktop:hover:opacity-80">{obfuscatePhone(phone)}</span>;
  }

  return (
    <Link
      href={`tel:${formatPhoneNumber(phone)}`}
      className="text-16px desktop:hover:opacity-80"
    >
      {phone}
    </Link>
  );
}
