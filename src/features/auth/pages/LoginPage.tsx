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

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginPage: React.FC = () => {
  const { login, loading } = useAuth();
  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormValues) => {
    login(data);
  };

  // Helper to speed up developer review / role testing
  const fillCredentials = (role: 'customer' | 'expert' | 'admin') => {
    if (role === 'admin') {
      setValue('email', 'admin@getexpert.pro');
      setValue('password', 'admin123');
    } else if (role === 'expert') {
      setValue('email', 'expert@getexpert.pro');
      setValue('password', 'expert123');
    } else {
      setValue('email', 'sarah@getexpert.pro');
      setValue('password', 'customer123');
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h3 className="text-lg font-bold text-white">Sign In to Account</h3>
        <p className="text-xs text-zinc-400 mt-1">
          Welcome back! Access your workspace below.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input
          {...register('email')}
          label="Email Address"
          type="email"
          placeholder="name@example.com"
          leftIcon={<Mail className="w-4 h-4" />}
          error={errors.email?.message}
          className="bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500 focus:ring-brand-500/20"
        />

        <Input
          {...register('password')}
          label="Password"
          type="password"
          placeholder="••••••••"
          leftIcon={<Lock className="w-4 h-4" />}
          error={errors.password?.message}
          className="bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500 focus:ring-brand-500/20"
        />

        <div className="flex justify-end">
          <Link
            to={PATHS.FORGOT_PASSWORD}
            className="text-[11px] font-semibold text-brand-400 hover:text-brand-350 transition"
          >
            Forgot Password?
          </Link>
        </div>

        <Button type="submit" isLoading={loading} className="w-full mt-2">
          Sign In
        </Button>
      </form>

      {/* Demo helper logins */}
      <div className="border-t border-zinc-800 pt-4 flex flex-col gap-2">
        <span className="text-[10px] font-bold text-zinc-550 text-center uppercase tracking-wider block">
          Quick Demo Portals (Developer Sandbox)
        </span>
        <div className="grid grid-cols-3 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => fillCredentials('customer')}
            className="text-xs py-1 px-2 border-zinc-750 text-zinc-300 hover:bg-zinc-800 hover:text-white"
          >
            Customer
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => fillCredentials('expert')}
            className="text-xs py-1 px-2 border-zinc-750 text-zinc-300 hover:bg-zinc-800 hover:text-white"
          >
            Expert
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => fillCredentials('admin')}
            className="text-xs py-1 px-2 border-zinc-750 text-zinc-300 hover:bg-zinc-800 hover:text-white"
          >
            Admin
          </Button>
        </div>
      </div>

      <div className="text-center text-xs text-zinc-450 mt-2">
        Don't have an account?{' '}
        <Link to={PATHS.REGISTER} className="font-bold text-brand-400 hover:text-brand-350 underline">
          Register Here
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
