import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { Mail, Lock, User as UserIcon } from 'lucide-react';
import useAuth from '../../../hooks/useAuth';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { PATHS } from '../../../constants';

const registerSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    role: z.enum(['customer', 'expert']),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export const RegisterPage: React.FC = () => {
  const { register: signup, loading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: 'customer',
    },
  });

  const onSubmit = (data: RegisterFormValues) => {
    signup({
      name: data.name,
      email: data.email,
      role: data.role,
      password: data.password,
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h3 className="text-lg font-bold text-white">Create your Account</h3>
        <p className="text-xs text-zinc-400 mt-1">
          Scaffold your dashboard by signing up.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input
          {...register('name')}
          label="Full Name"
          type="text"
          placeholder="John Doe"
          leftIcon={<UserIcon className="w-4 h-4" />}
          error={errors.name?.message}
          className="bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500 focus:ring-brand-500/20"
        />

        <Input
          {...register('email')}
          label="Email Address"
          type="email"
          placeholder="john@example.com"
          leftIcon={<Mail className="w-4 h-4" />}
          error={errors.email?.message}
          className="bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500 focus:ring-brand-500/20"
        />

        {/* Custom role selector styling */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-zinc-300">Register As</label>
          <div className="grid grid-cols-2 gap-4">
            <label className="flex items-center justify-center p-3 rounded-lg border border-zinc-700 bg-zinc-850 hover:bg-zinc-800 text-white cursor-pointer select-none">
              <input
                {...register('role')}
                type="radio"
                value="customer"
                className="mr-2 accent-brand-500"
              />
              <span className="text-xs font-bold">Customer</span>
            </label>
            <label className="flex items-center justify-center p-3 rounded-lg border border-zinc-700 bg-zinc-850 hover:bg-zinc-800 text-white cursor-pointer select-none">
              <input
                {...register('role')}
                type="radio"
                value="expert"
                className="mr-2 accent-brand-500"
              />
              <span className="text-xs font-bold">Service Expert</span>
            </label>
          </div>
          {errors.role && <p className="text-[11px] text-red-500 font-medium">{errors.role.message}</p>}
        </div>

        <Input
          {...register('password')}
          label="Password"
          type="password"
          placeholder="••••••••"
          leftIcon={<Lock className="w-4 h-4" />}
          error={errors.password?.message}
          className="bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500 focus:ring-brand-500/20"
        />

        <Input
          {...register('confirmPassword')}
          label="Confirm Password"
          type="password"
          placeholder="••••••••"
          leftIcon={<Lock className="w-4 h-4" />}
          error={errors.confirmPassword?.message}
          className="bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500 focus:ring-brand-500/20"
        />

        <Button type="submit" isLoading={loading} className="w-full mt-2">
          Create Account
        </Button>
      </form>

      <div className="text-center text-xs text-zinc-450 mt-2">
        Already have an account?{' '}
        <Link to={PATHS.LOGIN} className="font-bold text-brand-400 hover:text-brand-350 underline">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
