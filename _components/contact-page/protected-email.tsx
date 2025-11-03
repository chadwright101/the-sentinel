import Link from "next/link";

interface ProtectedEmailProps {
  email: string;
  isVerified: boolean;
  isVerifying: boolean;
}

const obfuscateEmail = (email: string) => {
  const [localPart, domain] = email.split("@");
  const visibleChars = Math.max(1, Math.floor(localPart.length / 3));
  const obfuscated =
    localPart.slice(0, visibleChars) + "•".repeat(Math.max(3, localPart.length - visibleChars));
  return `${obfuscated}@${domain}`;
};

export default function ProtectedEmail({ email, isVerified, isVerifying }: ProtectedEmailProps) {
  if (isVerifying || !isVerified) {
    return <span className="font-light">{obfuscateEmail(email)}</span>;
  }

  return (
    <Link className="font-light desktop:hover:opacity-80" href={`mailto:${email}`}>
      {email}
    </Link>
  );
}
