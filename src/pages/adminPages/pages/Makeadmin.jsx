import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShieldPlus, Users } from "lucide-react";
import toast from "react-hot-toast";

import EmptyState from "../../../components/ui/EmptyState";
import Modal from "../../../components/ui/Modal";
import Button from "../../../components/ui/Button";
import { Skeleton } from "../../../components/ui/Skeleton";

const MakeAdmin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [busy, setBusy] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_BACK_URL}/user/all`, {
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch users");
      }

      setUsers(data.users || []);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const openPopup = (user) => {
    setSelectedUser(user);
    setShowPopup(true);
  };

  const closePopup = () => {
    setSelectedUser(null);
    setShowPopup(false);
  };

  const handleMakeAdmin = async () => {
    if (!selectedUser) return;
    setBusy(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACK_URL}/user/makeadmin/${selectedUser._id}`,
        {
          method: "PATCH",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to make admin");
      }

      toast.success("User promoted to admin");
      closePopup();
      fetchData();
    } catch (error) {
      toast.error(error.message);
      console.error(error.message);
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const eligible = users.filter((u) => u.userRole === "user" || !u.userRole);

  return (
    <div>
      <div className="mb-8">
        <span className="text-xs font-bold uppercase tracking-widest2 text-gold-400">
          User Management
        </span>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tightest text-white mt-2">
          Appoint Admin
        </h1>
      </div>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-48 w-full" />
          ))}
        </div>
      ) : eligible.length === 0 ? (
        <EmptyState icon={Users} title="No eligible users" subtitle="All users are already admins." />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {eligible.map((user, i) => (
            <motion.div
              key={user._id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: Math.min(i, 8) * 0.04 }}
              className="rounded-2xl border border-white/10 bg-ink-900/50 p-6 flex flex-col"
            >
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                <Users className="w-5 h-5 text-ink-300" />
              </div>
              <h3 className="font-bold text-white truncate">{user.email}</h3>
              <span className="text-xs uppercase tracking-wider text-ink-500 mt-1">
                {user.userRole || "user"}
              </span>

              <div className="text-sm text-ink-400 mt-3 space-y-1">
                <p>{user.name}</p>
                <p>{user.phone}</p>
              </div>

              <Button
                variant="gold"
                size="sm"
                icon={ShieldPlus}
                onClick={() => openPopup(user)}
                className="mt-5 w-full"
              >
                Make Admin
              </Button>
            </motion.div>
          ))}
        </div>
      )}

      <Modal open={showPopup} onClose={closePopup} title="Confirm Action">
        <p className="text-sm text-ink-300 mb-6">
          Make <b className="text-white">{selectedUser?.email}</b> an admin?
        </p>
        <div className="flex items-center gap-3">
          <Button variant="gold" className="flex-1" loading={busy} onClick={handleMakeAdmin}>
            Confirm
          </Button>
          <Button variant="outline" className="flex-1" onClick={closePopup}>
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default MakeAdmin;
