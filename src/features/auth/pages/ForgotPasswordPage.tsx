import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { Mail, CheckCircle2 } from 'lucide-react';
import authApi from '../../../services/auth.api';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { PATHS } from '../../../constants';
import { toast } from 'react-hot-toast';

const schema = z.object({
  email: z.string().email('Invalid email address'),
});

type FormValues = z.infer<typeof schema>;

export const ForgotPasswordPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

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
      const response = await authApi.forgotPassword(data.email);
      if (response.success) {
        setSubmitted(true);
        toast.success(response.message || 'Recovery email sent!');
      } else {
        toast.error(response.message || 'Error occurred');
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
        <h3 className="text-lg font-bold text-white">Reset Link Sent</h3>
        <p className="text-xs text-zinc-400 leading-relaxed">
          Please check your inbox. We have sent a secure password reset link to your email.
        </p>
        <Link to={PATHS.LOGIN} className="w-full mt-2">
          <Button variant="outline" className="w-full text-zinc-350 border-zinc-750">
            Back to Login
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h3 className="text-lg font-bold text-white">Recover Password</h3>
        <p className="text-xs text-zinc-400 mt-1">
          Enter your email to receive recovery link details.
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

        <Button type="submit" isLoading={loading} className="w-full mt-2">
          Send Recovery Email
        </Button>
      </form>

      <div className="text-center text-xs text-zinc-450 mt-2">
        Remembered password?{' '}
        <Link to={PATHS.LOGIN} className="font-bold text-brand-400 hover:text-brand-350 underline">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
