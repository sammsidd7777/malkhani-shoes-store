import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

import { Field, Input, PasswordInput } from "../../components/ui/Field";
import Button from "../../components/ui/Button";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function loginhandler(e) {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BACK_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      console.log("Login success:", data);
      toast.success("Welcome back!");
      navigate("/");
    } catch (error) {
      console.error("Login error:", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-ink-950 grid lg:grid-cols-2">
      {/* LEFT IMAGE */}
      <div className="hidden lg:block relative overflow-hidden">
        <img
          src="https://narawear.com/assets/LoginImage-lh_t_JZT.jpg"
          alt="login"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent" />
        <div className="absolute bottom-10 left-10 right-10">
          <h2 className="text-3xl font-black text-white tracking-tightest">
            Step into confidence.
          </h2>
          <p className="text-ink-200 mt-2 max-w-sm">
            You shape it. You style it. Be the best version of yourself.
          </p>
        </div>
      </div>

      {/* RIGHT FORM */}
      <div className="flex items-center justify-center px-6 py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm"
        >
          <span className="text-xs font-bold uppercase tracking-widest2 text-gold-400">
            Welcome to
          </span>
          <h1 className="text-3xl font-black tracking-tightest text-white mt-2 mb-8">
            Malkhani Store
          </h1>

          <form className="space-y-5" onSubmit={loginhandler}>
            <Field label="Email" icon={Mail}>
              <Input type="email" name="email" placeholder="you@example.com" required />
            </Field>

            <Field label="Password">
              <PasswordInput name="password" placeholder="••••••••" required />
            </Field>

            <div className="flex justify-end">
              <span className="text-xs text-ink-400 hover:text-gold-300 cursor-pointer transition-colors">
                Forgot password?
              </span>
            </div>

            <Button
              type="submit"
              variant="gold"
              size="lg"
              className="w-full"
              loading={loading}
              icon={ArrowRight}
              iconPosition="right"
            >
              Login
            </Button>
          </form>

          <p className="text-center text-sm text-ink-400 mt-8">
            Don't have an account?{" "}
            <Link to="/signup" className="text-white font-semibold hover:text-gold-300">
              Sign up
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
