import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShieldMinus, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";

import EmptyState from "../../../components/ui/EmptyState";
import Modal from "../../../components/ui/Modal";
import Button from "../../../components/ui/Button";
import Badge from "../../../components/ui/Badge";
import { Skeleton } from "../../../components/ui/Skeleton";

const RemoveAdmin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
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

  const openConfirm = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const closeConfirm = () => {
    setSelectedUser(null);
    setShowModal(false);
  };

  const handleRemoveAdmin = async () => {
    if (!selectedUser) return;
    setBusy(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACK_URL}/user/removeadmin/${selectedUser._id}`,
        {
          method: "PATCH",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to remove admin");
      }

      toast.success("Admin role removed successfully");
      closeConfirm();
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

  const admins = users.filter((u) => u.userRole === "admin");

  return (
    <div>
      <div className="mb-8">
        <span className="text-xs font-bold uppercase tracking-widest2 text-gold-400">
          User Management
        </span>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tightest text-white mt-2">
          Remove Admin
        </h1>
      </div>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-48 w-full" />
          ))}
        </div>
      ) : admins.length === 0 ? (
        <EmptyState icon={ShieldCheck} title="No admins found" subtitle="There are currently no admin accounts." />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {admins.map((user, i) => (
            <motion.div
              key={user._id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: Math.min(i, 8) * 0.04 }}
              className="rounded-2xl border border-white/10 bg-ink-900/50 p-6 flex flex-col"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-gold-500/15 border border-gold-400/30 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-gold-300" />
                </div>
                <Badge tone="gold">Admin</Badge>
              </div>

              <h3 className="font-bold text-white truncate">{user.email}</h3>

              <div className="text-sm text-ink-400 mt-3 space-y-1">
                <p>{user.name}</p>
                <p>{user.phone}</p>
              </div>

              <Button
                variant="danger"
                size="sm"
                icon={ShieldMinus}
                onClick={() => openConfirm(user)}
                className="mt-5 w-full"
              >
                Remove Admin
              </Button>
            </motion.div>
          ))}
        </div>
      )}

      <Modal open={showModal} onClose={closeConfirm} title="Remove Admin">
        <p className="text-sm text-ink-300 mb-6">
          Are you sure you want to remove admin role from{" "}
          <b className="text-white">{selectedUser?.email}</b>?
        </p>
        <div className="flex items-center gap-3">
          <Button variant="danger" className="flex-1" loading={busy} onClick={handleRemoveAdmin}>
            Confirm
          </Button>
          <Button variant="outline" className="flex-1" onClick={closeConfirm}>
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default RemoveAdmin;
