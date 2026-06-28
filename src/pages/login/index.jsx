import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { toast } from 'sonner';
import PrimaryButton from '../../components/button';
import Header from '../../components/header';
import TextField from '../../components/text-fields';
import { Toaster } from '../../components/toast';
import AppleIcon from '../../icons/apple';
import GoogleIcon from '../../icons/google';
import { checkIsLogin, setLoginStatus } from '../../utils/helper.util';

const LoginPage = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('alok@gmail.com');
  const [password, setPassword] = useState('password');
  const [errors, setErrors] = useState({});

  const submit = (e) => {
    e.preventDefault();
    const next = {};
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      next.email = 'Enter a valid email address.';
    }
    if (password.length < 6) {
      next.password = 'Password must be at least 6 characters.';
    }

    setErrors(next);
    if (Object.keys(next).length) {
      toast.error('Check the highlighted fields');
      return;
    }
    toast.success('Signed in', { description: 'Welcome back!' });
    setLoginStatus(true);
    setErrors({});
    navigate('/documents');
  };

  useEffect(() => {
    const isLoggedIn = checkIsLogin();
    if (isLoggedIn) {
      navigate('/');
    }
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto flex max-w-md flex-col items-center px-6 py-10 justify-center h-[calc(100vh-170px)]">
        <div className="glass-strong w-full rounded-3xl p-8">
          <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
          <p className="mt-1 text-sm text-muted-foreground">Sign in to continue building your resume.</p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <SocialButton provider="google" onClick={() => toast('Google sign-in (demo only)')} />
            <SocialButton provider="apple" onClick={() => toast('Apple sign-in (demo only)')} />
          </div>

          <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
            <div className="h-px flex-1 bg-white/60" />
            or continue with email
            <div className="h-px flex-1 bg-white/60" />
          </div>

          <form onSubmit={submit} className="space-y-4" noValidate>
            <TextField
              label="Email"
              icon={<Mail className="h-4 w-4" />}
              type="email"
              value={email}
              onChange={(value) => {
                setEmail(value);
                setErrors({ ...errors, email: false });
              }}
              error={errors.email}
              placeholder="you@company.com"
            />
            <TextField
              label="Password"
              icon={<Lock className="h-4 w-4" />}
              type={show ? 'text' : 'password'}
              value={password}
              onChange={(value) => {
                setPassword(value);
                setErrors({ ...errors, password: false });
              }}
              error={errors.password}
              placeholder="••••••••"
              trailing={
                <PrimaryButton type="button" onClick={() => setShow((s) => !s)} className="text-muted-foreground hover:text-foreground">
                  {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </PrimaryButton>
              }
            />
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-muted-foreground">
                <input type="checkbox" className="h-4 w-4 rounded border-white/60 bg-white/50" /> Remember me
              </label>
              <Link to="/forgot-password" className="font-medium text-indigo-600 hover:underline">
                Forgot password?
              </Link>
            </div>
            <PrimaryButton
              type="submit"
              className="w-full rounded-xl gradient-primary py-3 text-sm font-medium text-white shadow-lg shadow-indigo-500/30 transition hover:-translate-y-0.5"
            >
              Sign in
            </PrimaryButton>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link to="/login" className="font-medium text-indigo-600 hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </main>
      <Toaster />
    </div>
  );
};

const SocialButton = ({ provider, onClick }) => {
  return (
    <PrimaryButton type="button" onClick={onClick} className="glass flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-medium transition hover:bg-white/80">
      {provider === 'google' ? <GoogleIcon /> : <AppleIcon />}
      {provider === 'google' ? 'Google' : 'Apple'}
    </PrimaryButton>
  );
};

export default LoginPage;
