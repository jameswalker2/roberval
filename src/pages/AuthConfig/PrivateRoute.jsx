import {Route, Navigate} from 'react-router-dom'
// import {useAuth} from
export function AuthGuard({element}) {
	const {user} = useAuth
	return (
		user ? element : <Navigate to={"/login"}/>
	)
}