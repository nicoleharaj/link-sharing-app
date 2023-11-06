import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Database } from '@/lib/types/supabase';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const supabase = createClientComponentClient<Database>();

function useUserProfile() {
  const router = useRouter();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      const { data: sessionData, error } = await supabase.auth.getSession();

      if (error || !sessionData.session) {
        router.replace('/login');
        return;
      }

      let { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select()
        .eq('id', sessionData.session.user.id)
        .single();

      if (profileError) {
        console.error('Failed to get profile:', profileError);
        setLoading(false);
        return;
      }

      setEmail(sessionData.session.user.email ?? '');
      setFirstName(profile?.first_name ?? '');
      setLastName(profile?.last_name ?? '');
      setAvatar(profile?.avatar ?? '');
      setLoading(false);
    }

    getData();
  }, [router]);

  return { firstName, lastName, email, avatar, loading };
}

export default useUserProfile;
