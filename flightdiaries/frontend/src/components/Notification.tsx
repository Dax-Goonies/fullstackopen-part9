
interface NotifyProps {
  message: string | null;
}

const Notify = ({ message }: NotifyProps) => {
  if (!message) return null;
  return <div style={{ color: "red" }}>Error: {message}</div>
};

export default Notify