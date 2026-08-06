import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, Mail, Phone } from "lucide-react";

import EmptyState from "../../../components/ui/EmptyState";
import Badge from "../../../components/ui/Badge";
import { Skeleton } from "../../../components/ui/Skeleton";

const UserCardSkeleton = () => (
  <div className="rounded-2xl border border-white/10 bg-ink-900/50 p-6 space-y-4">
    <Skeleton className="w-14 h-14 rounded-full" />
    <Skeleton className="h-4 w-2/3" />
    <Skeleton className="h-3 w-1/3" />
  </div>
);

const CheckUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

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

      setUsers(data.users);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <span className="text-xs font-bold uppercase tracking-widest2 text-gold-400">
          User Management
        </span>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tightest text-white mt-2">
          All Users
        </h1>
      </div>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <UserCardSkeleton key={i} />
          ))}
        </div>
      ) : !users || users.length === 0 ? (
        <EmptyState icon={Users} title="No users found" subtitle="Registered users will appear here." />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {users.map((user, i) => (
            <motion.div
              key={user._id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: Math.min(i, 8) * 0.04 }}
              className="rounded-2xl border border-white/10 bg-ink-900/50 p-6 hover:border-gold-400/30 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-ink-300" />
                </div>
                <Badge tone={user.userRole === "admin" ? "gold" : "white"}>
                  {user.userRole || "user"}
                </Badge>
              </div>

              <h3 className="font-bold text-white truncate">{user.name}</h3>

              <div className="mt-3 space-y-1.5 text-sm text-ink-400">
                <p className="flex items-center gap-2 truncate">
                  <Mail className="w-3.5 h-3.5 shrink-0" /> {user.email}
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 shrink-0" /> {user.phone}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CheckUser;
