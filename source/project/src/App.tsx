import React, { useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { Dashboard } from './components/Dashboard';
import { Login } from './components/Login';
import { supabase } from './lib/supabase';

function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return session ? <Dashboard /> : <Login />;
}

export default App;