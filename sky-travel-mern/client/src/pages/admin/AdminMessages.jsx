import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../api/axios.js";
import Loader from "../../components/Loader.jsx";

const STATUS_STYLES = {
  new: "bg-blue-100 text-blue-700",
  read: "bg-gray-100 text-gray-600",
  responded: "bg-green-100 text-green-700",
};

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    api.get("/contact").then(({ data }) => setMessages(data.data)).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/contact/${id}`, { status });
      toast.success("Message updated");
      load();
    } catch (err) {
      toast.error("Failed to update message");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="py-12">
      <div className="mx-auto max-w-5xl px-6">
        <h1 className="text-2xl font-bold text-primary mb-6">Contact Messages</h1>
        {messages.length === 0 ? (
          <p className="text-gray-500">No messages yet.</p>
        ) : (
          <div className="space-y-4">
            {messages.map((m) => (
              <div key={m._id} className="card p-5">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-semibold text-primary">{m.name} &middot; {m.email}</p>
                    {m.subject && <p className="text-sm text-gray-500">{m.subject}</p>}
                  </div>
                  <span className={`status-badge ${STATUS_STYLES[m.status]}`}>{m.status}</span>
                </div>
                <p className="text-gray-600 text-sm mb-3">{m.message}</p>
                <div className="flex gap-2 text-xs">
                  {["new", "read", "responded"].map((s) => (
                    <button
                      key={s}
                      onClick={() => updateStatus(m._id, s)}
                      className={`rounded-full px-3 py-1 border ${m.status === s ? "bg-primary text-white border-primary" : "border-gray-300 text-gray-500"}`}
                    >
                      Mark {s}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMessages;
