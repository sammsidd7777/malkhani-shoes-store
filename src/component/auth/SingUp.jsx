import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Mail, Phone, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

import { Field, Input, PasswordInput } from "../../components/ui/Field";
import Button from "../../components/ui/Button";

const SingUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function signupHandler(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const name = e.target.name.value;
      const email = e.target.email.value;
      const phone = e.target.phone.value;
      const password = e.target.password.value;
      const userData = { name, email, phone, password };

      let response = await fetch(`${import.meta.env.VITE_BACK_URL}/user/signup`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message);
      }

      response = await response.json();
      toast.success("Account created — please log in");
      navigate("/login");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-ink-950 grid lg:grid-cols-2">
      <div className="hidden lg:block relative overflow-hidden">
        <img
          src="https://narawear.com/assets/LoginImage-lh_t_JZT.jpg"
          alt="signup"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent" />
        <div className="absolute bottom-10 left-10 right-10">
          <h2 className="text-3xl font-black text-white tracking-tightest">
            Join the movement.
          </h2>
          <p className="text-ink-200 mt-2 max-w-sm">
            Create an account to save your favorites and track your orders.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center px-6 py-16 sm:py-20">
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

          <form className="space-y-4" onSubmit={signupHandler}>
            <Field label="Your Name" icon={User}>
              <Input name="name" type="text" placeholder="Your name" required />
            </Field>

            <Field label="Phone Number" icon={Phone}>
              <Input name="phone" type="number" placeholder="Phone number" required />
            </Field>

            <Field label="Email Id" icon={Mail}>
              <Input type="email" name="email" placeholder="you@example.com" required />
            </Field>

            <Field label="Password">
              <PasswordInput name="password" placeholder="Create a password" required />
            </Field>

            <p className="text-xs text-ink-500 leading-relaxed pt-1">
              By signing up, I agree to the Terms and Conditions and Privacy Policy
            </p>

            <Button
              type="submit"
              variant="gold"
              size="lg"
              className="w-full"
              loading={loading}
              icon={ArrowRight}
              iconPosition="right"
            >
              Create Account
            </Button>
          </form>

          <p className="text-center text-sm text-ink-400 mt-8">
            Already have an account?{" "}
            <Link to="/login" className="text-white font-semibold hover:text-gold-300">
              Login
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default SingUp;
