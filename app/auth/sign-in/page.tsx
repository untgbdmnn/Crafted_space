"use client";

import { ToggleLanguage } from '@/components/toggle-language';
import { ButtonTheme } from '@/components/toggle-theme';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useAuthStore from '@/lib/auth';
import requestData from '@/servers/request';
import { redirect, useRouter } from 'next/navigation';
import * as React from 'react'
import { toast } from 'sonner';
import Cookies from 'js-cookie';

export default function SignInPage() {
  const { token, setAuth, clearAuth } = useAuthStore()
  const router = useRouter()
  const [state, setState] = React.useState({
    username: '',
    email: '',
    password: '',
    confirm_password: '',
  })

  function handleChange(event: any) {
    const { name, value } = event.target;
    setState(prevState => ({
      ...prevState, [name]: value
    }))
  }

  async function handleLogin() {
    const { password, confirm_password, email, username } = state;
    if (password !== confirm_password) {
      toast.warning("Password Tidak sesuai!");
      return;
    }

    const request = {
      email, password, username
    }

    const response = await requestData.POST('auth/login', request);
    if (response.success) {
      toast.success(response.message);
      setAuth(response.token, response.data);

      setState(prevState => ({
        ...prevState, email: '', username: '', confirm_password: '', password: ''
      }))

      redirect('/registered');
    } else {
      toast.error(response.message);
    }
  }

  if (token) {
    return (
      <div className='w-full h-full'>
        <div className='py-3'>
          <h1 className='text-lg text-center font-bold uppercase'>Crafted Space</h1>
          <p className='text-sm font-normal text-center'>Untung Budiman's Personal Portofolio Website</p>
        </div>
        <div className='w-full flex items-center justify-center space-x-4 py-3'>
          <Button className='cursor-pointer uppercase font-bold text-xs' onClick={() => router.push('/registered')}>Registered</Button>
          <Button className='cursor-pointer uppercase font-bold text-xs' onClick={() => {
            clearAuth()
            Cookies.remove('auth');
            redirect('/')
          }}>Log out</Button>
        </div>
      </div>
    )
  }

  return (
    <div className='w-full h-full flex flex-col items-center justify-center '>
      <div className='flex gap-2 text-sm space-x-2'>
        <ButtonTheme />
        <ToggleLanguage />
      </div>
      <div className='w-full h-full mt-3'>
        <h1 className='text-lg text-center font-bold uppercase'>Crafted Space</h1>
        <p className='text-sm font-normal text-center'>Untung Budiman's Personal Portofolio Website</p>
      </div>
      <div className='mt-5 w-full'>
        <h1 className='text-xl font-bold text-center'>Login</h1>
      </div>

      <div className='w-full mt-5 space-y-2'>
        <div className='w-full space-y-1.5'>
          <Label htmlFor='username' className='text-sm font-normal'>Username</Label>
          <Input id='username' name='username' placeholder='Masukan username' value={state.username} onChange={handleChange} className='w-full' autoComplete='off' />
        </div>
        <div className='w-full space-y-1.5'>
          <Label htmlFor='email' className='text-sm font-normal'>Email</Label>
          <Input id='email' name='email' placeholder='Masukan email' value={state.email} onChange={handleChange} className='w-full' autoComplete='off' />
        </div>
        <div className='w-full space-y-1.5'>
          <Label htmlFor='password' className='text-sm font-normal'>Password</Label>
          <Input id='password' type='password' name='password' placeholder='Masukan password' value={state.password} onChange={handleChange} className='w-full' autoComplete='off' />
        </div>
        <div className='w-full space-y-1.5'>
          <Label htmlFor='confirm_password' className='text-sm font-normal'>Konfirmasi Password</Label>
          <Input id='confirm_password' type='password' name='confirm_password' placeholder='Masukan Konfirmasi Password' value={state.confirm_password} onChange={handleChange} className='w-full' autoComplete='off' />
        </div>
      </div>

      <div className='mt-4 w-full'>
        <Button onClick={handleLogin} className='w-full cursor-pointer font-semibold' variant="default">Login</Button>
      </div>

    </div>
  )
}
