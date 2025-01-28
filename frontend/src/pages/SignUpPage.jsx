import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { UserPlus, Mail, Lock, ArrowRight, Loader, User } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";

const SignUpPage = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const { signup, loading, guestLogin } = useUserStore();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		signup(formData);
	};

	const handleGuestLogin = (e) => {
		e.preventDefault();
		guestLogin();
	};

	return (
		<div className='flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
			<motion.div
				className='sm:mx-auto sm:w-full sm:max-w-md'
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
			>
				<h2 className='mt-6 text-center text-3xl font-extrabold text-emerald-400'>Create your account</h2>
			</motion.div>

			<motion.div
				className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 0.2 }}
			>
				<div className='bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10'>
					<form onSubmit={handleSubmit} className='space-y-6'>
						<div>
							<label htmlFor='name' className='block text-sm font-medium text-gray-300'>
								Full Name
							</label>
							<div className='mt-1'>
								<input
									id='name'
									name='name'
									type='text'
									required
									value={formData.name}
									onChange={handleChange}
									className='block w-full px-3 py-2 bg-gray-700 border border-gray-600 
									rounded-md shadow-sm placeholder-gray-400 focus:outline-none 
									focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm'
									placeholder='John Doe'
								/>
							</div>
						</div>

						<div>
							<label htmlFor='email' className='block text-sm font-medium text-gray-300'>
								Email address
							</label>
							<div className='mt-1 relative rounded-md shadow-sm'>
								<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
									<Mail className='h-5 w-5 text-gray-400' aria-hidden='true' />
								</div>
								<input
									id='email'
									name='email'
									type='email'
									required
									value={formData.email}
									onChange={handleChange}
									className='block w-full pl-10 px-3 py-2 bg-gray-700 border border-gray-600 
									rounded-md shadow-sm placeholder-gray-400 focus:outline-none 
									focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm'
									placeholder='you@example.com'
								/>
							</div>
						</div>

						<div>
							<label htmlFor='password' className='block text-sm font-medium text-gray-300'>
								Password
							</label>
							<div className='mt-1 relative rounded-md shadow-sm'>
								<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
									<Lock className='h-5 w-5 text-gray-400' aria-hidden='true' />
								</div>
								<input
									id='password'
									name='password'
									type='password'
									required
									value={formData.password}
									onChange={handleChange}
									className='block w-full pl-10 px-3 py-2 bg-gray-700 border border-gray-600 
									rounded-md shadow-sm placeholder-gray-400 focus:outline-none 
									focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm'
									placeholder='••••••••'
								/>
							</div>
						</div>

						<div>
							<label htmlFor='confirmPassword' className='block text-sm font-medium text-gray-300'>
								Confirm Password
							</label>
							<div className='mt-1 relative rounded-md shadow-sm'>
								<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
									<Lock className='h-5 w-5 text-gray-400' aria-hidden='true' />
								</div>
								<input
									id='confirmPassword'
									name='confirmPassword'
									type='password'
									required
									value={formData.confirmPassword}
									onChange={handleChange}
									className='block w-full pl-10 px-3 py-2 bg-gray-700 border border-gray-600 
									rounded-md shadow-sm placeholder-gray-400 focus:outline-none 
									focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm'
									placeholder='••••••••'
								/>
							</div>
						</div>

						<div className="space-y-4">
							<button
								type='submit'
								className='w-full flex justify-center py-2 px-4 border border-transparent 
								rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 
								hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
								focus:ring-emerald-500 transition duration-150 ease-in-out disabled:opacity-50'
								disabled={loading}
							>
								{loading ? (
									<>
										<Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
										Loading...
									</>
								) : (
									<>
										<UserPlus className='mr-2 h-5 w-5' aria-hidden='true' />
										Sign Up
									</>
								)}
							</button>

							<button
								onClick={handleGuestLogin}
								className='w-full flex justify-center py-2 px-4 border border-gray-500
								rounded-md shadow-sm text-sm font-medium text-gray-300 bg-transparent
								hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2
								focus:ring-gray-500 transition duration-150 ease-in-out disabled:opacity-50'
								disabled={loading}
							>
								<User className='mr-2 h-5 w-5' aria-hidden='true' />
								Continue as Guest
							</button>
						</div>
					</form>

					<div className='mt-6'>
						<div className='relative'>
							<div className='relative flex justify-center text-sm'>
								<span className='px-2 text-gray-400 bg-gray-800'>Already have an account?</span>
							</div>
						</div>

						<div className='mt-6 text-center'>
							<Link
								to='/login'
								className='font-medium text-emerald-400 hover:text-emerald-300 flex items-center justify-center'
							>
								Login to your account
								<ArrowRight className='ml-2 h-4 w-4' />
							</Link>
						</div>
					</div>
				</div>
			</motion.div>
		</div>
	);
};

export default SignUpPage;
