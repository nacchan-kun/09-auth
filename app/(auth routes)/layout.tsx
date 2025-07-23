// app/(auth routes)/layout.tsx

type Props = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: Props) {
  return <>{children}</>;
}