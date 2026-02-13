type Toast = {
  id: number;
  type: "success" | "error";
  message: string;
};

interface Props {
  toasts: Toast[];
}

const BlogNotiication = ({ toasts }: Props) => {
  return (
    <div className="fixed bottom-5 right-5 flex flex-col gap-2 z-50">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`px-4 py-2 rounded shadow-lg text-white ${
            toast.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
};

export default BlogNotiication;
