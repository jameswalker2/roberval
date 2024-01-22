// AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/Config/SupabaseConfig.jsx';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const sessions = supabase.auth.getSession();

		setUser(sessions?.user ?? null);

		const { data: authListener } = supabase.auth.onAuthStateChange(async (_, session) => {
			setUser(session?.user ?? null);
		});

		return () => {
			authListener.subscription;
		};
	}, []);

	const login = async (email, password) => {
		const { user, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			throw error;
		}
		setUser(user);
	};
	
	return (
		<AuthContext.Provider value={{ user, login}}>
			{children}
		</AuthContext.Provider>
	);
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };