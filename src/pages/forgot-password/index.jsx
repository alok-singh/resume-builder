import { Link } from 'react-router';
import { ArrowLeft, CheckCircle2, Mail } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import PrimaryButton from '../../components/button';
import Header from '../../components/header';
import TextField from '../../components/text-fields';
import { Toaster } from '../../components/toast';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState();
  const [sent, setSent] = useState(false);

  const submit = (event) => {
    event.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Enter a valid email address.');
      toast.error('Invalid email');
      return;
    }
    setError(undefined);
    setSent(true);
    toast.success('Reset link sent', { description: `Check ${email}` });
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto flex max-w-md flex-col items-center px-6 py-10 justify-center h-[calc(100vh-170px)]">
        <div className="glass-strong w-full rounded-3xl p-8">
          <Link to="/login" className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to sign in
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight">Reset your password</h1>
          <p className="mt-1 text-sm text-muted-foreground">Enter your email and we&apos;ll send you a link to set a new password.</p>

          {sent ? (
            <div className="mt-6 glass flex items-start gap-3 rounded-2xl p-4">
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600" />
              <div>
                <p className="font-medium">Check your inbox</p>
                <p className="text-sm text-muted-foreground">We sent a reset link to {email}.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} className="mt-6 space-y-4" noValidate>
              <TextField
                label="Email"
                icon={<Mail className="h-4 w-4 text-muted-foreground" />}
                type="text"
                value={email}
                onChange={(value) => {
                  setEmail(value);
                  setError(undefined);
                }}
                error={error}
                placeholder="you@company.com"
              />
              <PrimaryButton
                type="submit"
                className="w-full rounded-xl gradient-primary py-3 text-sm font-medium text-white shadow-lg shadow-indigo-500/30 transition hover:-translate-y-0.5"
              >
                Send reset link
              </PrimaryButton>
            </form>
          )}
        </div>
      </main>
      <Toaster />
    </div>
  );
};

export default ForgotPasswordPage;