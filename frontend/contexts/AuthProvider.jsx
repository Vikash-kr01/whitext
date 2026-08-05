import { useContext, createContext, useState, useEffect } from 'react'


// I have kept UserContext and AuthProvider in same file

const UserContext = createContext({})
// you should name above AuthContext instead UserContext --> see below

export const AuthProvider = ({ children }) => {
	// I could name it as UserProvider instead AuthProvider  --> see below
	// what is the use of AuthProvider --> see main.jsx

	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		(async function () {
			try {
				const res = await fetch("/app/api/v1/user/current-user", {
					method: "get",
					credentials: "include"
				})
				if (!res.ok) {
					throw new Error("cannot able to fetch current user")
				}
				const result = await res.json()
				// console.log(result) //see below
				setUser(result.data)
			} catch (error) {
				console.error("Error while fetching current user: ", error.message);
				setUser(null)
			} finally {
				setLoading(false)
			}
		})()
	}, [])


	return (
		<UserContext.Provider value={{ user, setUser, loading }} >
			{children}
		</UserContext.Provider>
	)
}

export const useUser = () => useContext(UserContext);







/* form line - 7 & 10 
	=> “Auth” is more meaningful than “User” 
	(because it includes login state, not just user data),
	"Auth" means not only user but only one who is logged in 
*/



/* from line 27 --> console.log(result) from above

// here result is coming from req.user(from backend/middlewares/authMiddleware.js)
// that is why it doesn't contain refreshToken and accessToken like login.jsx does
{
	statusCode: 200,
	data: {
			createdAt: "2026-07-15T16:30:22.824Z"
			email: "test@mail.com"
			fullName: "test"
			gender: "Undefined"
			updatedAt: "2026-07-28T05:59:31.402Z"
			username: "test"
			__v: 0
			_id: "6a57b59eb0d52edbbca9d8c8"
		},
	message: "current user fetched successfully",
	success: true
}
*/