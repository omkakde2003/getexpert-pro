import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useSearchParams } from 'react-router-dom';
import { Lock, CheckCircle2 } from 'lucide-react';
import authApi from '../../../services/auth.api';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { PATHS } from '../../../constants';
import { toast } from 'react-hot-toast';

const schema = z
  .object({
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type FormValues = z.infer<typeof schema>;

export const ResetPasswordPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || 'mock-token';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
      const response = await authApi.resetPassword(data.password, token);
      if (response.success) {
        setSubmitted(true);
        toast.success(response.message || 'Password reset successfully!');
      } else {
        toast.error(response.message || 'Error resetting password');
      }
    } catch (err) {
      toast.error('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-450 flex items-center justify-center">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-white">Password Updated</h3>
        <p className="text-xs text-zinc-400 leading-relaxed">
          Your credentials have been securely updated. You can now login.
        </p>
        <Link to={PATHS.LOGIN} className="w-full mt-2">
          <Button className="w-full">
            Proceed to Login
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h3 className="text-lg font-bold text-white">Reset Password</h3>
        <p className="text-xs text-zinc-400 mt-1">
          Create a new strong password below.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input
          {...register('password')}
          label="New Password"
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
          Save Password
        </Button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
